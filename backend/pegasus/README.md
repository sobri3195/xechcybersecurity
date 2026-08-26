# PEGASUS CTF API

API PHP 8.2 + MySQL 8 untuk modul PEGASUS. Browser hanya menerima skenario, objective, resource metadata, progres, dan hint yang sudah dibuka. `flag_hash` serta `solution` tidak pernah diserialisasi sebelum progres berstatus `completed`.

## Instalasi lokal

1. Siapkan tabel autentikasi platform `users(id, name, role)` dan `api_tokens(user_id, token_hash, expires_at)`; token disimpan sebagai SHA-256.
2. Jalankan `mysql xech < backend/pegasus/database/migration.sql`.
3. Atur `CTF_DB_DSN`, `CTF_DB_USER`, `CTF_DB_PASSWORD`, `CTF_SECURITY_PEPPER` (minimal 32 byte acak), `CTF_ALLOWED_ORIGIN`, dan `CTF_RESOURCE_DIR`.
4. Jalankan `php backend/pegasus/database/seed.php`. Perintah menghasilkan 100 flag acak pada berkas mode `0600`; pindahkan sekali ke secret manager administrator lalu hapus berkas.
5. Untuk lokal: `php -S 127.0.0.1:8080 -t backend/pegasus/public`. Proxy `/api/pegasus` dari Vite ke server ini.
6. Atur `VITE_PEGASUS_API_URL=https://api.example/pegasus` pada Vercel. Variabel browser bukan tempat secret.

Production harus menjalankan PHP di origin API terpisah (Apache/Nginx/PHP-FPM), TLS wajib, private resource storage di luar document root, backup terenkripsi, dan cron untuk snapshot leaderboard. Batasi body di proxy, tambahkan WAF/rate limit terdistribusi, serta teruskan IP yang telah diverifikasi proxy. Challenge runtime harus merupakan container/VM ephemeral tanpa egress, CPU/memori/time quota, image read-only, user non-root, dan tidak berbagi jaringan/database dengan API.

## Endpoint

Semua endpoint memerlukan Bearer token opaque. `GET /categories`, `GET /challenges`, `GET /challenges/{id}`, `POST /challenges/{id}/start`, `POST /challenges/{id}/hints/{1..3}`, `POST /challenges/{id}/submit`, dan `GET /leaderboard`. Endpoint `admin.php` memerlukan role `admin`: statistik, ekspor, dan pembuatan challenge. Deploy routing admin di `/api/pegasus/admin`.

## Format challenge

Impor/pembuatan challenge berisi `category_id`, `title`, `slug`, `difficulty`, `scenario`, `learning_objective`, `flag`, `solution`, `references`, `base_points`, dan `hints` (0–3 string). Flag harus cocok `PEGASUS{token_aman}` dan hanya diterima API melalui TLS; API langsung membuat Argon2id hash. Resource yang diunggah harus dinormalisasi namanya, disimpan dengan key acak, maksimal sesuai konfigurasi proxy, MIME allowlist (`application/zip`, `application/pdf`, `image/png`, `audio/wav`, `application/octet-stream`), diverifikasi magic bytes, dipindai malware, dan diberi SHA-256. Jangan menaruh jawaban di nama, komentar, atau metadata resource.

## Aturan skor

Base easy/medium/hard/expert adalah 100/200/350/500. Tiga hint mengurangi kumulatif 10%/25%/50%; tanpa hint menambah 20%; First Blood menambah 50. Penyelesaian sepuluh misi kategori diberikan sekali melalui transaksi server sebagai badge kategori dan 500 poin. Semua event dicatat dalam `ctf_scores`; leaderboard hanya membaca event server. Daily challenge, weekly mission, streak, level (`floor(sqrt(XP/100))+1`), badge cepat/no-hint, dan sertifikat 100% dihitung job backend dari event immutable.

## Keamanan dan operasi

Bearer API tidak memakai cookie sehingga tidak rentan CSRF berbasis cookie; origin tetap di-allowlist. Prepared statement digunakan untuk input, error internal hanya masuk log server, submission dibatasi 10/menit dan maksimum per challenge, nilai tebakan disimpan sebagai keyed hash, dan audit memakai IP/UA hash. Tambahkan rate limiter Redis pada deployment multi-instance. Reset skor/progres wajib berupa event adjustment dengan alasan, dual approval, dan audit—jangan menghapus histori. API tidak mengeksekusi command atau flag pengguna.
