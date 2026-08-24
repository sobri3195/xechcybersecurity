# Xech Cyber Security

Company profile multipage bertema cyber-industrial untuk **Xech Cyber Security**, dibangun ulang dengan React dan Vite. Aplikasi mencakup Home, About, Services, Contact, internal 404, formulir tervalidasi, metadata SEO, animasi yang menghormati reduced-motion, dan konfigurasi Vercel.

## Prasyarat

- Node.js 20 atau lebih baru
- npm 10 atau lebih baru

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite. Untuk build dan memeriksa hasil production:

```bash
npm run build
npm run preview
```

## Deploy ke Vercel

1. Push repository ke penyedia Git.
2. Import repository di Vercel.
3. Gunakan preset **Vite** (build command `npm run build`, output `dist`).
4. Deploy. `vercel.json` mengarahkan seluruh route ke `index.html`, sehingga refresh langsung pada `/about`, `/services`, dan `/contact` tetap ditangani React Router. File yang sama juga menerapkan header keamanan dasar.

Ganti domain placeholder `https://example.com` pada canonical URL, Open Graph, JSON-LD, `public/robots.txt`, dan `public/sitemap.xml` sebelum publikasi.

## Mengubah konten

- Informasi kontak: cari `info@xechcybersecurity.com` dan `+62 812 3456 7890` di `src/pages/Contact.jsx`, `src/components/Footer.jsx`, dan structured data di Home.
- Data layanan terpusat di `src/data/services.js`.
- Warna dan design token berada di `tailwind.config.js` dan `src/index.css`.

## Integrasi form

Form saat ini sengaja hanya menyimulasikan validasi dan loading; tidak ada data yang dikirim atau disimpan. Isi URL endpoint produksi pada variabel berikut:

```bash
VITE_CONTACT_API_URL=https://endpoint-anda.example/contact
```

Kemudian implementasikan request pada komentar integrasi di `src/components/ContactForm.jsx`. Variabel `VITE_` dapat dibaca pengguna browser, jadi jangan pernah menaruh API key atau secret di sana. Terapkan validasi, rate limiting, sanitasi, dan proteksi spam di server. Formspree dapat digunakan sebagai alternatif.

## Environment variable

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `VITE_CONTACT_API_URL` | Tidak | URL endpoint form produksi; kosong pada demo. |

## Catatan publikasi

Angka statistik, daftar sertifikasi, cakupan dukungan, informasi kontak, dan klaim bisnis dalam template harus diverifikasi oleh pemilik bisnis sebelum situs dipublikasikan. Structured data sengaja tidak memuat sertifikasi, jumlah klien, atau legal entity yang belum diverifikasi.

## Dependency utama

React, React DOM, React Router DOM, Vite, Tailwind CSS, Lucide React, Framer Motion, React Helmet Async, dan React Hook Form.

## Modul publikasi, pejabat, dan Daily Cyber Quiz

Route baru: `/news`, `/news/:slug`, `/information`, `/information/:slug`, `/officials`, `/officials/:slug`, dan `/quiz`. Data dikelola di `src/data/news.js`, `src/data/information.js`, `src/data/officials.js`, serta bank soal `src/data/quizQuestions.js`. Tambahkan konten dengan menyalin struktur objek yang ada, memakai slug unik, tanggal pembaruan, dan menjalankan lint/build. Profil pejabat **wajib** berasal dari sumber resmi, tidak boleh memuat data sensitif, dan placeholder harus tetap berlabel demonstrasi. Referensi informasi hanya boleh berupa sumber resmi terverifikasi.

Quiz memilih tepat lima soal aktif dengan seeded shuffle deterministik dari tanggal lokal `YYYY-MM-DD`, menghindari ID tiga hari terakhir bila bank mencukupi. `correctAnswer` adalah indeks berbasis nol. State, riwayat maksimal 30 hari, dan statistik tersimpan tanpa identitas di `xech_daily_quiz_state`, `xech_daily_quiz_history`, dan `xech_daily_quiz_stats`. Untuk testing, gunakan tombol **Hapus Riwayat Quiz** atau hapus ketiga key melalui DevTools. Produksi multi-region sebaiknya menggunakan tanggal server/zona waktu organisasi.

Quiz frontend hanya untuk edukasi: jawaban terlihat di source dan tidak cocok untuk sertifikasi, seleksi pegawai, ujian berisiko tinggi, atau klaim kompetensi. SPA client-side juga membatasi indexing metadata dinamis; fase berikutnya perlu API/CMS tervalidasi dan prerendering/SSR untuk SEO serta konsistensi tanggal. Analytics hanya direncanakan—`news_search`, `news_filter_applied`, `news_article_open`, `information_search`, `information_checklist_progress`, `official_profile_open`, `quiz_start`, `quiz_answer_selected`, `quiz_complete`, `quiz_perfect_score`, `quiz_streak_updated`, `quiz_history_deleted`—dan tidak diaktifkan tanpa consent serta konfigurasi privasi.
