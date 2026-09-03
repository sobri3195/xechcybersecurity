# Audit Modul Xech Cyber Security — P0 sampai Polish

Tanggal audit: **3 September 2026**

Branch: `work`

Ruang lingkup: entry point dan routing, halaman publik, publikasi, Cyber Tools,
Daily Cyber Quiz, formulir kontak, PEGASUS CTF (frontend dan PHP API), SEO,
aksesibilitas, konfigurasi deployment, dependency, serta quality gate.

## Kesimpulan eksekutif

Repository **dapat di-build**, tetapi **belum siap dirilis sesuai fitur yang
didokumentasikan**. Build hijau saat ini tidak membuktikan semua modul berfungsi:
entry point `src/main.jsx` menjalankan shell lama dan tidak pernah me-render
`src/App.jsx`. Akibatnya route Berita, Informasi, Pejabat, dan Quiz yang dijanjikan
README tidak tersedia, sementara seluruh dependency yang dibutuhkan shell baru juga
tidak ada di manifest.

Temuan paling mendesak adalah:

1. **P0 — empat modul utama adalah dead code/404** meskipun README menyatakannya
   tersedia.
2. **P0 — tidak ada quality gate yang dapat dijalankan secara reproducible**:
   script lint, dependency ESLint, lockfile, test frontend, dan CI tidak tersedia.
3. **P0 — integritas first-blood PEGASUS belum aman terhadap concurrency**;
   transaksi mengunci progress milik pengguna, bukan satu resource global per
   challenge, sehingga dua solve serentak dapat sama-sama menerima bonus.
4. **P1 — kontak belum dapat menerima lead tanpa endpoint eksternal**, konten
   pejabat/informasi masih placeholder, dan klaim statistik PEGASUS di landing page
   adalah angka statis yang tampak operasional.
5. **P1 — state Quiz belum tervalidasi**, sehingga data `localStorage` valid-JSON
   dengan bentuk yang salah dapat menyebabkan crash atau hasil statistik salah.

Keputusan rilis yang disarankan: **NO-GO** sampai seluruh P0 selesai dan P1 yang
menyangkut data publik, keamanan, serta lead-generation memiliki owner dan
acceptance test.

## Metode audit dan bukti eksekusi

Pemeriksaan dilakukan terhadap source yang dilacak Git, dependency terpasang,
jalur import yang benar-benar reachable, kontrak API, dan hasil command berikut:

```bash
npm run lint
npm run build
npm ls --depth=0
for f in backend/pegasus/tests/*Test.php; do php "$f"; done
find backend -name '*.php' -print0 | xargs -0 -n1 php -l
rg -n "TODO|FIXME|placeholder|example.com|your-domain" src public index.html
```

Hasil aktual:

- `npm run lint` **gagal** karena script `lint` tidak ada.
- `npm run build` **lulus** (70 modul), tetapi hanya membangun graph import dari
  shell lama; ini bukan smoke test route yang mati.
- Ketiga PHP contract/unit test **lulus** dan seluruh file PHP lolos syntax lint.
- `npm ls --depth=0` hanya memuat tujuh package dari `package.json`; dependency
  shell baru dan ESLint memang tidak terpasang.
- Tidak ada test runner frontend, browser/E2E test, accessibility test, schema
  validator, link checker, atau workflow CI.

### Matriks status modul

| Modul | Reachable dari aplikasi aktif | Kondisi utama | Prioritas |
| --- | --- | --- | --- |
| Home, About, Services | Ya | Render; klaim bisnis masih perlu review | P2 |
| Articles + detail | Ya | Render; belum ada test/schema gate | P1/P2 |
| Journal | Ya | Render; navigasi/filter perlu E2E | P2 |
| Cyber Tools | Ya | Banyak alat client-only; beberapa fallback/feedback kurang | P1/P2 |
| Contact | Ya | Validasi ada, pengiriman bergantung endpoint | P1 |
| PEGASUS landing/challenge/leaderboard | Ya | API/fallback ada; runtime sandbox belum ada | P0/P1 |
| PEGASUS dashboard/profile/admin | Ya | Sebagian besar prototipe presentasional | P1 |
| News | **Tidak** | Route hanya ada di `src/App.jsx` yang mati | **P0** |
| Information | **Tidak** | Route dan link internal menjadi 404 | **P0** |
| Officials | **Tidak** | Route mati dan seluruh data placeholder | **P0/P1** |
| Daily Quiz | **Tidak** | Route mati; logic storage juga rapuh | **P0/P1** |

## P0 — blocker rilis

### P0.1 — Dua application shell; shell yang lengkap tidak pernah di-mount

`index.html` memuat `src/main.jsx`. File itu mendefinisikan `Shell` dan daftar route
sendiri. Ia tidak mengimpor default export dari `src/App.jsx`. Route `/news`,
`/information`, `/officials`, dan `/quiz` hanya berada di `App.jsx`, sehingga direct
navigation dan link dari komponen mati berakhir pada route `*` shell lama.

**Dampak:** dokumentasi menampilkan fitur yang tidak tersedia; build memberi false
positive; dua navbar/footer/scroll/title system akan terus drift.

**Acceptance criteria:** satu bootstrap tipis; satu application shell; smoke test
menavigasi seluruh route, refresh direct URL, dan memastikan halaman bukan 404.
Sebelum memilih shell baru, lakukan parity review karena shell lama juga memiliki
`/cyber-tools`, sementara `App.jsx` tidak mendaftarkannya.

### P0.2 — Dependency graph dan lint tidak reproducible

Shell baru mengimpor `framer-motion`, `lucide-react`, `react-helmet-async`, dan
`react-hook-form`, tetapi semuanya tidak ada di `package.json`. `eslint.config.js`
mengimpor `@eslint/js`, `globals`, `eslint-plugin-react-hooks`, dan
`eslint-plugin-react-refresh`, namun `eslint` beserta plugin tersebut juga tidak ada.
Tidak ada script `lint` maupun lockfile repository.

**Dampak:** mengaktifkan `App.jsx` langsung mematahkan build bersih; `npm ci` tidak
dapat dipakai; hook regression dan unused variable tidak diperiksa.

**Acceptance criteria:** pin dependency kompatibel, commit lockfile, tambah
`lint`, `test`, dan `check` scripts, lalu buktikan `npm ci && npm run check` di CI.

### P0.3 — First-blood PEGASUS dapat diberikan lebih dari sekali

Pada submit benar, transaksi melakukan `SELECT ... FOR UPDATE` terhadap row
`ctf_user_progress` milik user, lalu menghitung jumlah submission benar. Dua user
yang submit bersamaan mengunci row berbeda, dapat sama-sama melihat dirinya sebagai
correct submission pertama, lalu keduanya memperoleh event `first_blood`. Tidak ada
unique constraint yang membatasi satu event first-blood per challenge.

**Dampak:** leaderboard dan skor tidak deterministik; insentif kompetisi dapat
dieksploitasi melalui request paralel.

**Acceptance criteria:** serialisasi pada row challenge/lock khusus atau tabel award
dengan unique key `(challenge_id, event_type)` untuk first-blood; tangani duplicate
key secara idempoten; integration test MySQL dengan dua koneksi serentak.

### P0.4 — Test yang ada belum menguji sistem nyata

PHP tests saat ini lulus, tetapi berupa contract/source assertions dan unit scoring;
tidak menyalakan router HTTP, autentikasi, atau database MySQL. Tidak ada test
frontend. Karena itu test tidak menangkap P0.1 maupun race P0.3.

**Acceptance criteria:** integration suite dengan migration database nyata, API
requests, auth/RBAC, rollback, concurrency, serta E2E browser untuk route dan alur
utama.

## P1 — fungsi inti, keamanan, dan kebenaran data

### P1.1 — Form kontak bukan kanal operasional secara default

Implementasi aktif membaca `VITE_CONTACT_API_URL` dan dengan benar tidak memalsukan
sukses bila kosong. Namun repository tidak menyediakan endpoint, health check,
kontrak deploy, spam control, rate limit, atau integration test. Dengan konfigurasi
default, tujuan lead-generation tidak berjalan.

**Perlu:** endpoint HTTPS, validasi server-side, ukuran payload maksimum, timeout,
idempotency/retry policy, rate limit, bot protection yang accessible, retention dan
privacy policy nyata, monitoring delivery, serta test success/4xx/5xx/timeout.

### P1.2 — Konten publikasi belum layak dipublikasikan

- Enam pejabat bernama `Nama Pejabat`/`Jabatan Resmi` dan seluruhnya menggunakan
  placeholder.
- Delapan panduan Informasi menggunakan paragraf generik, checklist generik, dan
  array referensi kosong.
- News diberi label demonstrasi tetapi memiliki tanggal/penulis dan bentuk artikel
  yang mudah dianggap faktual.
- Nomor telepon shell baru adalah pola placeholder dan belum diverifikasi.

Saat P0.1 diperbaiki, konten ini otomatis terekspos. Jangan sekadar mengaktifkan
route tanpa feature flag/noindex. Tambahkan workflow status `draft/reviewed/published`,
sumber primer, reviewer, `lastReviewedAt`, serta validator build-time.

### P1.3 — Quiz dapat crash atau menyajikan hasil salah dari storage rusak

`storage.get` hanya melindungi kegagalan JSON parse, bukan schema. Nilai JSON yang
valid tetapi salah tipe membuat `.map`, `.some`, spread, atau `localeCompare` gagal.
State lama dengan ID hilang menghasilkan kurang dari lima pertanyaan, sedangkan UI
tetap mengindeks sampai lima. Bank aktif kurang dari lima memiliki masalah sama.
Jawaban, score, tanggal, dan `completed` tidak divalidasi.

`calculateStats` juga menamai run terakhir sebagai `currentStreak` meskipun hari
terakhir jauh sebelum hari ini. Tombol “Tampilkan ulang hasil” hanya mengubah index
yang tidak digunakan pada result view. Countdown tidak memicu rollover hari.

**Perlu:** schema/version/migration, normalisasi/deduplikasi history, state recovery,
explicit unavailable state jika soal <5, streak relatif hari ini/kemarin, rollover
event, share fallback, dan unit tests untuk corrupt/legacy/boundary dates.

### P1.4 — PEGASUS menggabungkan produk nyata dan prototipe

Challenge list/detail dan leaderboard mencoba API, tetapi landing menampilkan
“1.284 operator aktif” dan “48.920 flag ditemukan” sebagai angka statis tanpa label
demo. Dashboard, profil, sertifikat, admin edit/delete/import/export buttons, download
resource, terminal, serta reset environment belum terhubung penuh. Sandbox runtime,
object storage, malware scanning, signed URL, isolation, quota, TTL, dan cleanup
belum ada di repository.

**Risiko:** pengguna menganggap environment aman/online dan operasi berhasil padahal
sebagian hanya visual. Semua aksi nonaktif harus benar-benar `disabled` dan berlabel
preview; statistik harus berasal dari API atau dilabel demo.

### P1.5 — Challenge start di frontend dapat menghasilkan state menyesatkan

Detail mengambil challenge lalu memanggil `startChallenge` bila status
`not_started`, tetapi kegagalan start terjadi di promise chain yang sama dengan fetch.
Catch kemudian mengganti challenge valid menjadi fallback demo bila ID ada. Error
auth, prerequisite, network, dan start tidak dibedakan, sehingga pengguna bisa
diturunkan ke preview meski server baru saja memberi data valid.

Pisahkan state fetch/start, tampilkan error berdasarkan status, dan jangan mengubah
data server menjadi demo setelah kegagalan mutasi.

### P1.6 — API hardening dan operasi belum lengkap

- Token disimpan sebagai SHA-256 tanpa server-side pepper. Entropy minimum regex
  membantu, tetapi issuance/revocation/rotation, token scope, last-used, dan brute
  force monitoring tidak tersedia di repository.
- Semua endpoint, termasuk categories, membutuhkan auth; pastikan ini sengaja karena
  UI publik otomatis jatuh ke demo tanpa token.
- Rate limit memakai database count per menit, belum mencakup start/hint/login dan
  belum memiliki strategi distributed/proxy IP yang terdokumentasi.
- `config.php` perlu dipastikan fail-closed untuk production secrets dan origin.
- Tidak ada CSRF concern untuk Bearer token, tetapi penyimpanan token di browser dan
  mitigasi XSS belum terdokumentasi.

### P1.7 — SEO memiliki tiga sumber URL dan placeholder domain

`index.html`, `robots.txt`, dan komponen detail news masih menggunakan
`your-domain.example`/`example.com`, sedangkan helper SEO memiliki konfigurasi lain.
Shell aktif hanya mengubah `document.title`; ia tidak memasang canonical, description,
Open Graph, noindex untuk invalid slug, atau provider metadata baru.

Tentukan satu `VITE_SITE_URL` tervalidasi, hasilkan robots/sitemap saat build, pasang
metadata per route, dan gunakan prerender/SSR bila indexing publikasi merupakan
kebutuhan. SPA rewrite tetap mengirim HTTP 200 untuk invalid slug.

## P2 — kelengkapan fitur dan reliability

### P2.1 — Filter, pagination, dan URL state

News belum memiliki pagination/loading state; featured item diduplikasi dalam list.
Information juga menduplikasi featured item. Query parameter filter tidak
dinormalisasi dengan allow-list dan nilai invalid dapat memberi empty state tanpa
penjelasan. Reset/search update dapat memenuhi browser history.

### P2.2 — Related content dan model data

Related News hanya memprioritaskan equality kategori dengan comparator boolean;
Information mengambil dua record pertama. Tidak ada ranking tag/topik, tie-break,
status publikasi, atau review freshness. Tambahkan schema bersama dengan ID/slug
unik, ISO date, safe URL, alt text, source, dan referential-integrity validation.

### P2.3 — Penyimpanan lokal lintas modul belum konsisten

Quiz dan checklist tidak memakai validator/version yang kuat. Sebagian Cyber Tools
memiliki version, tetapi progress learning masih menggunakan indeks array; perubahan
urutan materi memindahkan arti progress lama. Kegagalan quota/private mode sering
diabaikan meskipun `storage.set` mengembalikan `false`.

Gunakan stable item ID, namespace/version, migration, max-size/TTL bila relevan, dan
feedback saat penyimpanan gagal.

### P2.4 — Clipboard dan share belum reliable

Beberapa tombol langsung memanggil Clipboard API tanpa mengecek availability atau
memberi feedback sukses/gagal. Clipboard dapat ditolak di insecure context atau oleh
permission policy. Gunakan Web Share bila tersedia, Clipboard fallback, lalu manual
copy fallback; semua hasil diumumkan melalui live region.

### P2.5 — Detail 404 dan error boundary

Invalid News/Information/Official detail tidak memasang metadata `noindex` khusus.
Tidak ada root error boundary atau route-level recovery UI; exception render dari
storage/data dapat mengosongkan aplikasi. Tambahkan error boundary dengan retry dan
privacy-safe reporting.

### P2.6 — Data/API loading consistency

Modul publikasi membaca data sinkron sehingga tidak memiliki kontrak loading/error
untuk migrasi CMS. PEGASUS telah memiliki sebagian state tersebut tetapi semantics
fallback berbeda antarhalaman. Definisikan state machine konsisten: idle, loading,
success-empty, success-data, unauthorized, forbidden, unavailable, dan retrying.

## P3 — maintainability dan operasional

### P3.1 — Duplikasi shell dan stylesheet

Ada `src/main.jsx` versus `src/App.jsx`, navbar/footer lama versus baru, serta
`styles.css` versus `index.css`. Banyak file JSX ditulis satu baris, menghambat review,
blame, stack trace, dan merge. Pilih satu design system, hapus dead code setelah parity
test, dan terapkan formatter.

### P3.2 — Tidak ada CI/release gate

Minimum gate yang disarankan:

1. `npm ci`
2. `npm run format:check`
3. `npm run lint`
4. unit/component tests dengan coverage threshold yang realistis
5. PHP syntax + unit + MySQL integration tests
6. `npm run build`
7. Playwright route/form/filter/storage/PEGASUS smoke tests
8. axe accessibility scan, link check, dan content-schema validation

### P3.3 — Observability tidak tersedia

Tidak ada frontend error reporting, correlation/request ID, API structured log,
health/readiness endpoint, metrics, alerting, atau runbook incident/rollback. Log PHP
hanya menulis message exception. Hindari logging token, flag mentah, PII kontak, atau
jawaban sensitif saat observability ditambahkan.

### P3.4 — Dokumentasi drift

README menyebut route baru tersedia, form terintegrasi, lint/build sebagai workflow,
dan library yang tidak ada dalam manifest. `PEGASUS_AUDIT.md` sebelumnya menandai
first-blood dan sejumlah area sebagai selesai tanpa concurrency integration proof.
Dokumentasi harus menjadi bagian quality gate, bukan klaim manual.

## P4 — polish, aksesibilitas, dan performa

- Konsistenkan bahasa: `Home`, `Insight`, `Journal`, `Contact`, `Quiz`, dan istilah
  Indonesia bercampur tanpa strategi i18n.
- Mobile menu shell baru belum memiliki focus trap/focus return/body scroll lock;
  policy modal footer hanya fokus awal, belum trap/return/close Escape.
- Dropdown publikasi belum menyediakan keyboard arrow navigation dan parent active
  state ketika berada pada child publication route.
- Progress quiz sebaiknya menggunakan `<progress>` atau `role="progressbar"` dengan
  `aria-valuemin/max/now`; lakukan audit NVDA/VoiceOver, zoom 400%, dan 360 px.
- Gunakan format tanggal `id-ID` konsisten; jangan tampilkan raw ISO/date placeholder.
- Tambahkan width/height atau aspect ratio stabil, lazy loading below-the-fold,
  decoding hint, dan image error fallback.
- Tambahkan print style khusus panduan/checklist, focus-visible yang konsisten,
  reduced-motion coverage, contrast check, dan target sentuh minimal 44×44.
- Pecah bundle berdasarkan route tetap baik, tetapi tetapkan performance budget dan
  ukur setelah shell final aktif; angka build saat ini bukan baseline fitur lengkap.
- Hindari copy “diperbarui setiap hari” untuk quiz bila yang berubah hanya pilihan
  seeded dari bank statis; jelaskan timezone dan waktu rollover.

## Rencana remediasi berurutan

### Fase 0 — pulihkan kebenaran build

1. Pilih satu shell dan buat route parity map, termasuk `/cyber-tools`.
2. Tambah/pin dependency, lockfile, lint/format/test scripts.
3. Tambah smoke test semua route dan direct refresh.
4. Perbaiki first-blood dengan constraint/locking dan concurrency integration test.

### Fase 1 — staging aman

1. Feature-flag/noindex konten placeholder; verifikasi kontak dan seluruh klaim.
2. Validasi/migrasi storage Quiz dan perbaiki rollover/streak.
3. Pisahkan API fetch/start state PEGASUS; label/nonaktifkan seluruh prototipe.
4. Satukan site URL/metadata dan tambah error boundary.
5. Integrasikan endpoint kontak beserta security/operational controls.

### Fase 2 — kelengkapan produk

1. Pagination, filter allow-list, ranking related, schema/source workflow.
2. Implementasikan atau hapus CTA PEGASUS yang belum mempunyai backend/runtime.
3. Tambah browser, accessibility, API, database, link, dan content tests.

### Fase 3 — hardening dan polish

1. Refactor/format dead code dan satukan design system.
2. Performance/accessibility/device matrix dan observability.
3. Security review token lifecycle, CSP, CORS, secrets, dependencies, backup,
   migration, rollback, dan incident runbook.

## Definisi selesai untuk release

Release baru dapat dinyatakan siap ketika install bersih reproducible; seluruh route
teruji dan reachable; tidak ada konten/nomor/statistik placeholder tanpa label;
contact delivery terpantau; skor first-blood terbukti tunggal pada concurrency test;
Quiz pulih dari storage rusak; seluruh aksi PEGASUS jujur tentang capability; lint,
unit, integration, E2E, accessibility, schema, dan build menjadi required CI checks;
serta semua P0 dan P1 memiliki test regresi.
