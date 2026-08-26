<p align="center">
  <img src="./public/brand/xech-cyber-logo-horizontal.svg" alt="Xech Cyber Security" width="360">
</p>

# Xech Cyber Security Website

Website company profile dan lead-generation untuk layanan keamanan siber, dibangun menggunakan React, Vite, dan Tailwind CSS.

| React | Vite | Tailwind CSS | Vercel Ready | License |
| --- | --- | --- | --- | --- |
| UI components | Build tooling | Styling | SPA rewrite tersedia | All rights reserved |

## Features

- Responsive multipage interface dan React Router
- Modul artikel defensif dengan pencarian, filter kategori, halaman detail, dan checklist mitigasi
- Reusable service components dan accessible mobile navigation
- Contact-form validation (simulasi frontend)
- SEO metadata, original SVG logo system, dan complete favicon support
- Reduced-motion support, Vercel SPA rewrite, dan security headers dasar

## Tech stack

| Teknologi | Kegunaan |
| --- | --- |
| React | Antarmuka berbasis komponen |
| React Router | Routing client-side dan internal 404 |
| Vite | Development server dan production build |
| Tailwind CSS | Tooling CSS; stylesheet proyek juga memakai token CSS khusus |
| Vercel | Target hosting dan SPA rewrite |

## Project structure

```text
.
├── public/
│   ├── brand/                 # Sistem logo SVG
│   ├── favicon/               # Sumber SVG, manifest, browser config
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-favicons.cjs  # Generator PNG/ICO tanpa dependency
├── src/
│   ├── components/Logo.jsx
│   ├── data/services.js
│   ├── pages/                 # Home, About, Services, Contact, 404
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── index.html
├── PRD.md
├── vercel.json
└── vite.config.js
```

## Getting started

```bash
git clone <repository-url>
cd xech-cyber-security
npm install
npm run dev
```

Ganti `<repository-url>` dengan URL repository sebenarnya.

## Available scripts

```bash
npm run generate:favicons # membuat seluruh turunan PNG dan ICO
npm run dev               # membuat favicon lalu menjalankan development server
npm run build             # membuat favicon dan production build ke dist/
npm run preview           # preview production build
```

## Environment variables

Salin `.env.example` menjadi `.env` bila integrasi diperlukan:

```env
VITE_CONTACT_API_URL=
VITE_SITE_URL=https://your-domain.example
```

Semua variabel Vite berawalan `VITE_` tersedia di browser. Jangan pernah menyimpan secret, token privat, atau kredensial pada variabel tersebut.

## Contact-form integration

Form v1.0 masih frontend-only: loading dan success state disimulasikan, sedangkan error validasi ditampilkan di sisi klien. Untuk integrasi, baca `VITE_CONTACT_API_URL`, kirim payload melalui HTTPS, lalu petakan respons endpoint ke loading, success, dan error state. Endpoint wajib menerapkan validasi server-side, rate limiting, dan spam protection. Jangan mengirim API secret dari frontend.

## Deployment to Vercel

1. Push repository ke GitHub, GitLab, atau Bitbucket.
2. Import repository di Vercel.
3. Pilih framework preset **Vite**.
4. Gunakan build command `npm run build`.
5. Gunakan output directory `dist`.
6. Tambahkan environment variables yang diperlukan.
7. Deploy.
8. Uji direct URL dan refresh seluruh route.

`vercel.json` mengarahkan seluruh request route ke `index.html` agar React Router dapat menangani direct navigation, serta menambahkan security headers dasar.

## Brand assets

```text
public/
├── brand/
│   ├── xech-cyber-mark.svg
│   ├── xech-cyber-logo-horizontal.svg
│   ├── xech-cyber-logo-horizontal-light.svg
│   ├── xech-cyber-logo-stacked.svg
│   ├── xech-cyber-wordmark.svg
│   ├── xech-cyber-logo-monochrome.svg
│   └── logo-preview.svg
└── favicon/
```

File PNG dan ICO adalah hasil `npm run generate:favicons` dari bentuk mark dan sengaja tidak disimpan di Git karena media review hanya mendukung file teks. Script `postinstall`, `predev`, dan `prebuild` memastikan seluruh file biner yang direferensikan tersedia sebelum aplikasi dijalankan atau dibangun.

Jangan mengubah proporsi, mengganti warna sembarangan, atau menambahkan efek yang menurunkan keterbacaan. Sisakan clear space minimal setara ketebalan shield. Gunakan versi monokrom untuk latar yang tidak cocok.

## Content verification notice

> **Sebelum publikasi:** statistik proyek/klien, sertifikasi tim, informasi kontak, dan klaim layanan harus diverifikasi serta sesuai kemampuan aktual. Terminal scan adalah demonstrasi visual, bukan pemindai keamanan.

## Testing checklist

- [ ] Routing dan direct refresh
- [ ] Mobile menu dan contact form
- [ ] Keyboard navigation
- [ ] Layout responsif tanpa overflow
- [ ] Metadata per halaman
- [ ] Favicon dan logo pada latar gelap/terang
- [ ] Production build

## License

React, React DOM, React Router DOM, Vite, Tailwind CSS, Lucide React, Framer Motion, React Helmet Async, dan React Hook Form.

## Modul publikasi, pejabat, dan Daily Cyber Quiz

Route baru: `/news`, `/news/:slug`, `/information`, `/information/:slug`, `/officials`, `/officials/:slug`, dan `/quiz`. Data dikelola di `src/data/news.js`, `src/data/information.js`, `src/data/officials.js`, serta bank soal `src/data/quizQuestions.js`. Tambahkan konten dengan menyalin struktur objek yang ada, memakai slug unik, tanggal pembaruan, dan menjalankan lint/build. Profil pejabat **wajib** berasal dari sumber resmi, tidak boleh memuat data sensitif, dan placeholder harus tetap berlabel demonstrasi. Referensi informasi hanya boleh berupa sumber resmi terverifikasi.

Quiz memilih tepat lima soal aktif dengan seeded shuffle deterministik dari tanggal lokal `YYYY-MM-DD`, menghindari ID tiga hari terakhir bila bank mencukupi. `correctAnswer` adalah indeks berbasis nol. State, riwayat maksimal 30 hari, dan statistik tersimpan tanpa identitas di `xech_daily_quiz_state`, `xech_daily_quiz_history`, dan `xech_daily_quiz_stats`. Untuk testing, gunakan tombol **Hapus Riwayat Quiz** atau hapus ketiga key melalui DevTools. Produksi multi-region sebaiknya menggunakan tanggal server/zona waktu organisasi.

Quiz frontend hanya untuk edukasi: jawaban terlihat di source dan tidak cocok untuk sertifikasi, seleksi pegawai, ujian berisiko tinggi, atau klaim kompetensi. SPA client-side juga membatasi indexing metadata dinamis; fase berikutnya perlu API/CMS tervalidasi dan prerendering/SSR untuk SEO serta konsistensi tanggal. Analytics hanya direncanakan—`news_search`, `news_filter_applied`, `news_article_open`, `information_search`, `information_checklist_progress`, `official_profile_open`, `quiz_start`, `quiz_answer_selected`, `quiz_complete`, `quiz_perfect_score`, `quiz_streak_updated`, `quiz_history_deleted`—dan tidak diaktifkan tanpa consent serta konfigurasi privasi.

## PEGASUS CTF

Modul pembelajaran baru tersedia di `/pegasus` dengan landing, dashboard operator, direktori 100 challenge, workspace tiga panel, leaderboard, profil, dan control room administrator. Frontend berada di `src/pages/pegasus`, komponen reusable di `src/components/pegasus`, katalog aman (tanpa flag/solusi) di `src/pages/pegasus/catalog.js`, serta client API di `src/services/pegasusApi.js`.

Direktori challenge, detail workspace, dan leaderboard memuat data dari API terautentikasi. Jika API belum tersedia, antarmuka beralih secara eksplisit ke **mode pratinjau** memakai katalog aman; pada mode ini resource, hint, dan validasi flag dinonaktifkan agar simulasi tidak disalahartikan sebagai progres nyata. Filter direktori disimpan pada URL sehingga pencarian dan tampilan dapat dibagikan atau dipulihkan setelah refresh.

Backend native PHP berada di `backend/pegasus`: migration 11 tabel, seeder 10 kategori/100 challenge, autentikasi Bearer/RBAC, unlock hint berurutan, validasi flag Argon2id, rate limit submission, scoring transaksional, leaderboard server-side, audit log, serta endpoint administrator. Ikuti [panduan backend](backend/pegasus/README.md) untuk setup lokal/production dan format challenge. Jalankan pemeriksaan dengan `find backend/pegasus -name '*.php' -print0 | xargs -0 -n1 php -l`, `php backend/pegasus/tests/ScoringTest.php`, lalu `npm run build`.
