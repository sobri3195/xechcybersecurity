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

Copyright © 2026 Xech Cyber Security. All rights reserved.
