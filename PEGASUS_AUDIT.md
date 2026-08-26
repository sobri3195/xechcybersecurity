# Audit PEGASUS CTF — P0 sampai Polish

Audit ini menilai jalur pengguna, kontrak API, keamanan, integritas skor, skema, performa, aksesibilitas, dan kesiapan operasi. Status di bawah mencerminkan patch saat ini; fitur platform yang berada di luar modul ditandai sebagai tindak lanjut, bukan disamarkan sebagai fitur aktif.

## P0 — blocker dan integritas keamanan (diperbaiki)

- **Bypass prerequisite pada endpoint start.** Klien sebelumnya dapat memulai ID apa pun, termasuk challenge nonaktif atau terkunci. Endpoint kini memverifikasi challenge aktif serta progres prerequisite sebelum membuat progres.
- **Hint kosong mengurangi skor.** Baris hint yang hilang sebelumnya tetap menaikkan `hints_used`. Transaksi kini dibatalkan dan mengembalikan 404.
- **Admin API gagal dari origin terpisah.** `admin.php` tidak menangani CORS preflight dan tidak mengirim hardening headers. Perilakunya kini konsisten dengan API utama.
- **UI mengklaim operasi berhasil saat API mati.** Challenge dan leaderboard statis terlihat seperti data nyata. UI kini mencoba API, menampilkan loading/error/retry, dan melabeli fallback sebagai pratinjau yang tidak menyimpan progres.
- **Authorization header kosong.** Client sebelumnya selalu mengirim `Bearer `; sekarang header hanya dikirim bila token ada, error HTTP dipertahankan, respons non-JSON ditolak, dan request memiliki timeout.

## P1 — fungsi inti (diperbaiki)

- Direktori challenge kini membaca status/lock/attempt dari server, menghitung progres aktual, serta menjalankan endpoint `start` sebelum navigasi untuk challenge baru.
- Leaderboard kini membaca agregat server, menangani data kosong, retry, timeout, dan hanya memakai tiga operator contoh ketika API gagal dengan label pratinjau.
- Query rate-limit memperoleh indeks `(user_id, created_at)` yang cocok dengan pola query; indeks per-challenge tetap tersedia terpisah.
- Proxy pengembangan Vite sekarang sesuai dokumentasi backend (`/api/pegasus` ke PHP port 8080).

## P2 — reliability dan UX (diperbaiki)

- API client membedakan status HTTP, network failure, timeout, dan invalid JSON agar UI tidak memberi pesan generik yang menyesatkan.
- Filter tetap dapat digunakan pada data server maupun pratinjau; status kosong, loading, error, dan operasi start memiliki feedback eksplisit.
- URL path parameter di-encode konsisten.

## P3 / polish (diperbaiki)

- Tombol mode grid/list memiliki accessible name.
- Progress bar membatasi nilai 0–100 dan mengekspos atribut ARIA lengkap.
- Error state memakai `role=alert` dan gaya visual terpisah; empty/loading tetap memakai status non-intrusif.
- Label level leaderboard dihitung deterministik dari poin ketika backend belum menyediakan level.

## Risiko tersisa / ketergantungan platform

1. **Login dan penerbitan opaque token** adalah tanggung jawab platform induk; tanpa `auth_token`, API secara benar membalas 401 dan UI menyatakan mode pratinjau.
2. **Resource challenge dan sandbox runtime** masih membutuhkan object storage, malware scanning, signed download URL, dan orchestrator container. Tombol dekoratif pada workspace tidak boleh dianggap implementasi runtime.
3. **Dashboard, profil, sertifikat, period leaderboard, serta admin edit/import/delete** masih merupakan presentational prototype. Sebelum produksi, tambahkan endpoint terotorisasi dan acceptance test end-to-end untuk masing-masing aksi.
4. **Migration existing deployment** memerlukan migration incremental untuk mengganti indeks submission; `migration.sql` saat ini adalah baseline instalasi baru.
5. Jalankan integration test dengan MySQL 8 nyata untuk menguji concurrency first-blood, rollback, FK, dan isolation level; unit/contract test tanpa DB tidak dapat membuktikan perilaku tersebut.
