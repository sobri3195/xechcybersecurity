# Audit Modul Xech Cyber Security

Tanggal audit: 26 Agustus 2026  
Ruang lingkup: source code, konfigurasi build/lint, routing, modul publikasi, profil pejabat, Daily Cyber Quiz, formulir kontak, SEO, aksesibilitas, keamanan deployment, dan kesiapan operasional.

## Ringkasan eksekutif

Status saat ini **belum layak dirilis sebagai implementasi PRD terbaru**. Build produksi memang berhasil, tetapi build tersebut hanya memuat aplikasi lama dari `src/main.jsx`. Implementasi baru di `src/App.jsx`—termasuk Berita, Informasi, Pejabat, Quiz, navbar baru, SEO dinamis, dan footer baru—tidak pernah di-mount. Karena itu hasil build hijau memberi rasa aman yang keliru.

Selain itu, dependency yang diperlukan implementasi baru (`framer-motion`, `lucide-react`, `react-helmet-async`, dan `react-hook-form`) tidak tercantum di `package.json`; lint tidak dapat dimulai karena dependency ESLint tidak tersedia; tidak ada lockfile; formulir kontak masih simulasi; canonical URL masih memakai `example.com`; dan hampir seluruh konten Informasi/Pejabat masih berupa placeholder tanpa referensi resmi.

## Metode dan batasan audit

Audit dilakukan secara statis dan dengan pemeriksaan build/lint berikut:

```bash
npm run build
npx eslint .
npm ls --depth=0
rg '^import|import\\(' src -g '*.{js,jsx}'
node --input-type=module # pemeriksaan jumlah dan keunikan data
```

Belum ada test runner, unit test, integration test, atau end-to-end test di repository. Karena aplikasi aktif tidak mengekspos modul baru, pengujian browser terhadap modul tersebut juga belum dapat dianggap representatif sampai P0 routing/dependency diselesaikan.

## P0 — Release blocker / fungsi utama tidak berjalan

### P0.1 Entry point menjalankan aplikasi lama, bukan `src/App.jsx`

**Bukti:** `index.html` memuat `src/main.jsx`. File tersebut mendefinisikan `App` lokal dengan hanya route Home, About, Services, Articles, Article Detail, Contact, dan 404. Ia tidak mengimpor `src/App.jsx`.

**Dampak:** route `/news`, `/information`, `/officials`, dan `/quiz` jatuh ke 404. Seluruh navbar/footer/SEO/animasi baru juga menjadi dead code. Build hanya mentransformasi 51 modul dan output chunk tidak berisi modul-modul baru tersebut.

**Perbaikan wajib:** jadikan `main.jsx` bootstrap tipis yang me-render `App` dari `./App`, bungkus dengan `HelmetProvider`, dan pertahankan `BrowserRouter`. Hapus implementasi shell lama agar tidak ada dua sumber kebenaran.

### P0.2 Dependency runtime implementasi baru hilang

`src/App.jsx` dan komponennya mengimpor:

- `framer-motion`
- `lucide-react`
- `react-helmet-async`
- `react-hook-form`

Tidak satu pun tercantum di `dependencies`. Build saat ini lolos hanya karena modul yang mengimpornya tidak reachable dari entry point.

**Dampak:** setelah P0.1 diperbaiki, build akan gagal resolve module. Instalasi production yang bersih juga tidak bisa menjamin dependency tersedia.

**Perbaikan wajib:** tambahkan dependency dengan versi terpin, buat lockfile, lakukan instalasi bersih, lalu build ulang.

### P0.3 Toolchain lint tidak reproducible dan lint gagal sebelum menganalisis source

`eslint.config.js` mengimpor `@eslint/js`, `globals`, `eslint-plugin-react-hooks`, dan `eslint-plugin-react-refresh`, tetapi semuanya hilang dari `devDependencies`; bahkan `eslint` dan script `lint` juga tidak ada.

**Dampak:** acceptance criterion “build dan lint lulus” tidak terpenuhi dan regression React Hooks/unused variables tidak terdeteksi.

**Perbaikan wajib:** tambahkan seluruh dependency lint, pin versi kompatibel, tambahkan script `lint`, dan jalankan di CI.

### P0.4 Tidak ada lockfile

Repository tidak memiliki `package-lock.json`, `npm-shrinkwrap.json`, `yarn.lock`, maupun `pnpm-lock.yaml`.

**Dampak:** `npm ci` tidak dapat digunakan, dependency transitif tidak deterministik, audit supply-chain dan rollback build melemah.

**Perbaikan wajib:** hasilkan dan commit lockfile dari versi Node/npm yang ditetapkan, lalu gunakan `npm ci` di CI/deployment.

## P1 — Kritis sebelum production

### P1.1 Form kontak tidak pernah mengirim lead

Baik halaman Contact lama maupun `ContactForm` baru hanya menunggu timer dan menampilkan sukses. `VITE_CONTACT_API_URL` hanya disebut dalam komentar/README dan tidak pernah dibaca.

**Dampak:** tujuan lead-generation utama gagal; pengguna dapat percaya permintaan sudah diproses padahal tidak ada data yang dikirim.

**Kebutuhan:** endpoint HTTPS, validasi server-side, timeout/cancel, mapping error, retry yang aman, rate limiting, spam protection, consent/privacy link, observability, dan pesan yang tidak mengklaim terkirim sebelum server mengonfirmasi. Nomor telepon placeholder harus dihapus atau diverifikasi.

### P1.2 SEO menggunakan domain placeholder dan provider belum terpasang

Komponen SEO membuat canonical dan Open Graph URL dari `https://example.com`; JSON-LD detail berita juga memakai domain tersebut, sedangkan `index.html` memakai `https://your-domain.example`. `Helmet` memerlukan `HelmetProvider`, tetapi entry point aktif tidak menyediakannya.

**Dampak:** canonical salah, structured data tidak konsisten, dan setelah modul diaktifkan Helmet berpotensi error/tidak bekerja sesuai desain.

**Kebutuhan:** satu `VITE_SITE_URL` tervalidasi, satu helper URL, `HelmetProvider`, OG image, Twitter metadata, dan strategi prerender/SSR untuk crawler yang tidak mengeksekusi SPA.

### P1.3 Konten berisiko menyesatkan dan melanggar NFR konten

- Seluruh profil pejabat adalah “Nama Pejabat/Jabatan Resmi” placeholder.
- Seluruh delapan panduan Informasi memakai teks generik yang sama dan `references: []`.
- Halaman Informasi mengklaim “Referensi” tetapi hanya menampilkan pesan, bukan daftar tautan sumber.
- Artikel memuat CVE bertanggal 2026 dan nama penulis/role; validitas klaim tidak dapat dibuktikan dari workflow repository.

**Dampak:** situs keamanan dapat menyebarkan klaim yang tidak terverifikasi dan merusak kepercayaan. Ini bertentangan dengan `NFR-CONTENT-001`.

**Kebutuhan:** jangan publikasikan route placeholder ke pengguna/crawler; terapkan schema data dan validasi sumber; simpan URL, penerbit, tanggal akses, status review, reviewer, dan last-reviewed; verifikasi semua identitas, kontak, statistik, CVE, versi patch, serta klaim eksploitasi terhadap sumber primer.

### P1.4 Daily Quiz rapuh terhadap data/storage rusak

- State dari `localStorage` dipercaya tanpa validasi schema.
- Jika `questionIds` tersimpan sebagian/tidak valid, `chosen` bisa kurang dari lima; UI tetap mengindeks lima soal dan dapat crash saat `item.question` dibaca.
- Jika bank soal aktif kurang dari lima, masalah yang sama terjadi.
- Riwayat dipercaya sebagai array; nilai JSON valid dengan tipe salah dapat membuat `.some`, `.filter`, atau spread gagal.
- Statistik “current streak” sebenarnya streak terakhir dalam history, walau pengguna sudah melewatkan banyak hari; ini bukan current streak kalender.
- Tombol “Tampilkan ulang hasil” hanya mengubah indeks yang tidak dipakai pada result view.
- Countdown tidak diberi `onNewDay`, sehingga pergantian hari tidak menyegarkan kuis.
- Share quiz hanya mengandalkan Clipboard API, tanpa Web Share/fallback untuk insecure context atau izin ditolak.

**Kebutuhan:** schema validation/migration storage, fallback selection selalu tepat lima atau explicit unavailable state, deduplikasi history, validasi tanggal/skor/answer, perhitungan streak relatif terhadap hari ini/kemarin, real result navigation, dan rollover hari yang aman.

### P1.5 Security headers belum memadai untuk situs keamanan

Konfigurasi sudah memiliki `nosniff`, frame denial, referrer policy, dan permissions policy, tetapi belum memiliki Content-Security-Policy dan HSTS. Tidak ada kebijakan `connect-src` untuk endpoint kontak atau pembatasan script/image/font yang terdokumentasi.

**Kebutuhan:** tambahkan CSP yang diuji (awali report-only), HSTS setelah seluruh subdomain siap HTTPS, serta `Cross-Origin-Opener-Policy`/kebijakan lain berdasarkan kebutuhan. Sesuaikan CSP dengan JSON-LD inline atau gunakan nonce/hash.

## P2 — Fitur PRD belum lengkap / correctness

### P2.1 News belum memiliki pagination dan loading state

`FR-NEWS-001` mensyaratkan pagination; implementasi merender seluruh hasil. Acceptance criteria juga meminta loading state, tetapi data seluruhnya sinkron dan tidak ada skeleton/loading/error boundary per modul.

### P2.2 Featured content diduplikasi

Saat filter default, Featured News tampil di bagian unggulan dan item yang sama kembali muncul di “Semua Berita”. Hal serupa terjadi pada Informasi: featured cards juga tetap ada di hasil seluruh panduan.

### P2.3 Parameter URL tidak divalidasi

Nilai `sort`, kategori, tahun, topik, level, tipe, unit, status, dan periode dari URL diterima apa adanya. `sort` yang bukan `old` diam-diam dianggap terbaru, sementara filter invalid menghasilkan empty state.

**Kebutuhan:** normalisasi allow-list, canonical query ordering, dan tombol reset yang konsisten memakai `{ replace: true }` agar input pencarian tidak memenuhi history browser.

### P2.4 Invalid detail route tidak punya metadata/HTTP semantics yang tepat

Detail News/Information/Official yang tidak ditemukan menampilkan UI kontekstual, tetapi tidak memasang title/noindex khusus dan sebagai SPA tetap dikirim dengan HTTP 200 dari rewrite.

**Kebutuhan:** minimal metadata `noindex`/title 404; idealnya SSR/edge routing mengembalikan status 404.

### P2.5 Related content terlalu naif

News hanya memprioritaskan kategori lewat comparator boolean dan Information hanya mengambil dua item pertama. Tidak ada relevansi tag/topik, kestabilan tie-break eksplisit, atau pengecualian draft/unpublished.

### P2.6 Model data artikel tidak konsisten

Objek artikel tidak memiliki `id`; pemeriksaan integritas menunjukkan tiga artikel tetapi hanya satu nilai unik untuk `id` (semuanya `undefined`). Modul lain memakai `id` secara konsisten.

**Kebutuhan:** schema bersama atau validator build-time untuk required fields, slug/ID unik, tanggal ISO, URL aman, alt text, status publikasi, dan referential integrity.

### P2.7 Tidak ada batas/versi untuk penyimpanan checklist

Checklist menyimpan indeks array. Bila editor mengubah urutan item, progres lama menunjuk item yang salah. Key per slug juga tidak memiliki schema version/TTL.

**Kebutuhan:** item ID stabil, storage version, migration, validasi tipe, dan feedback bila penyimpanan browser gagal.

### P2.8 Aksesibilitas perlu dilengkapi

- Progress quiz hanya visual dan teks; belum menggunakan `<progress>` atau ARIA value semantics.
- Mobile menu tidak mengunci/mengelola fokus dan tidak otomatis tutup pada perubahan route selain klik link.
- Dropdown desktop tidak memiliki pengelolaan fokus arrow-key/menu yang eksplisit.
- Beberapa status/reset tidak memiliki konfirmasi live yang konsisten.
- Error form Contact lama untuk service/message tidak dihubungkan dengan `aria-describedby`.

**Kebutuhan:** audit keyboard/screen reader nyata (NVDA/VoiceOver), focus return, focus visibility, automated axe, contrast, zoom 200–400%, dan target 360px.

## P3 — Maintainability dan operasional

### P3.1 Dua aplikasi dan dua design system hidup bersamaan

Ada `src/index.css` dan `src/styles.css`, `src/App.jsx` dan App lokal di `main.jsx`, Contact lama dan `ContactForm` baru, serta shell navbar/footer lama dan baru. Duplikasi membuat perubahan mudah diterapkan ke file yang tidak pernah dipakai.

**Kebutuhan:** pilih satu application shell dan satu stylesheet entry; hapus/migrasikan dead code setelah coverage memastikan parity.

### P3.2 Hampir semua modul baru ditulis satu baris

Banyak file JSX menggabungkan imports, fungsi, dan seluruh markup pada satu baris. Ini menghambat review, blame, citation, debugging stack trace, dan merge.

**Kebutuhan:** jalankan formatter (Prettier atau Biome), tetapkan aturan di CI, dan pecah logic kompleks seperti Quiz ke reducer/hooks/service teruji.

### P3.3 Tidak ada CI dan matriks quality gate

Repository tidak memiliki test scripts maupun workflow yang menegakkan install bersih, lint, unit, build, link check, accessibility, dan E2E.

**Minimum gate:**

1. `npm ci`
2. `npm run lint`
3. `npm test -- --run`
4. `npm run build`
5. Playwright smoke test seluruh route + invalid slug + refresh
6. axe accessibility scan
7. schema/content/link validation

### P3.4 Error handling dan observability belum ada

Tidak ada React error boundary, route-level error UI, logging terstruktur, error reporting, health signal endpoint kontak, ataupun privacy-aware analytics yang benar-benar diimplementasikan.

### P3.5 Dokumentasi tidak sinkron

README menyebut modul baru seolah tersedia, menyebut lint/build harus dijalankan tetapi tidak menyediakan lint script, dan bagian License mencantumkan library yang bahkan tidak ada dalam manifest. Struktur proyek yang didokumentasikan juga belum mencakup kondisi aktual secara lengkap.

## P4 — Polish

- Konsistenkan bahasa menu (`Home/About/Services/Articles/Contact`) dengan konten Indonesia atau sediakan i18n yang nyata.
- Format seluruh tanggal dengan locale Indonesia; halaman Informasi/Pejabat masih menampilkan raw string.
- Tambahkan image dimensions/aspect ratio, lazy-loading untuk gambar below-the-fold, dan error fallback.
- Tambahkan active state publikasi parent saat berada di child route.
- Debounce pencarian bila data berpindah ke API dan pertahankan fokus setelah reset/filter.
- Tambahkan empty state yang dapat ditindaklanjuti secara konsisten di semua direktori.
- Sediakan print styles untuk panduan/checklist dan share metadata per artikel.
- Audit copy: gunakan “Kuis” secara konsisten, jelaskan demonstrasi sebelum CTA, dan hindari klaim “diperbarui setiap hari” bila data hanya diacak dari bank statis.
- Optimalkan bundle setelah aplikasi baru benar-benar masuk build; ukuran build saat ini tidak dapat dipakai sebagai baseline modul baru.

## Urutan remediation yang direkomendasikan

### Fase 0 — Pulihkan kebenaran build (hari 1)

1. Integrasikan `src/App.jsx` ke entry point.
2. Tambahkan seluruh dependency runtime/dev dan lockfile.
3. Tambahkan lint script, formatter, dan install/build bersih.
4. Tambahkan smoke test yang menyatakan semua route PRD bukan 404.

### Fase 1 — Aman untuk staging (hari 2–4)

1. Perbaiki/validasi storage dan seluruh edge case Quiz.
2. Konfigurasi site URL tunggal + HelmetProvider + metadata invalid route.
3. Sembunyikan konten placeholder dari production/indexing.
4. Implementasikan endpoint kontak atau ubah CTA secara tegas menjadi demo non-submission.
5. Tambahkan error boundary, CSP report-only, dan test accessibility dasar.

### Fase 2 — Penuhi PRD (minggu 2)

1. Pagination, loading/error state, URL validation, related ranking.
2. Content schema, sumber resmi, workflow editorial, dan link checker.
3. Unit test utility + integration test form/filter/checklist/quiz + E2E route/refresh.
4. Tentukan SSR/prerender untuk SEO dan HTTP 404 yang benar.

### Fase 3 — Hardening dan polish

1. Formatter/refactor dead code dan design system.
2. Browser/device/screen-reader matrix, performance budget, image optimization.
3. Observability, privacy consent, analytics terukur, backup/rollback content.
4. Security review CSP/HSTS/dependency/license dan release checklist.

## Definition of done minimum

Rilis baru boleh dianggap siap ketika install bersih deterministik; lint, unit, integration, E2E, accessibility, dan build lulus; seluruh route PRD dapat dibuka dan di-refresh; tidak ada placeholder/claim tanpa sumber di production; form benar-benar mendapat acknowledgement server; Quiz tahan storage korup dan pergantian hari; canonical memakai domain produksi; invalid route memiliki noindex/404 semantics; serta ada rollback dan monitoring.
