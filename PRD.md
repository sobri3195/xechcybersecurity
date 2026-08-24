# Product Requirements Document
## Xech Cyber Security Website

## A. Informasi dokumen

| InformasiDetail | |
| --- | --- |
| Nama produk | Xech Cyber Security Website |
| Jenis produk | Company profile dan lead-generation website |
| Platform | Web |
| Teknologi | React, Vite, Tailwind CSS, Vercel |
| Versi PRD | 1.0 |
| Status | Development |
| Bahasa utama | Indonesia |
| Target deployment | Vercel |

## B. Ringkasan produk

Xech Cyber Security Website adalah website company profile untuk memperkenalkan perusahaan dan layanan keamanan siber, membangun kredibilitas profesional, menjelaskan ruang lingkup layanan, menghasilkan calon klien melalui formulir konsultasi, serta menyediakan jalur kontak untuk kebutuhan *incident response*. Versi awal tidak memakai backend maupun database. Form konsultasi menggunakan simulasi submission dan disiapkan untuk integrasi API pada fase berikutnya.

## C. Latar belakang masalah

- Calon klien kesulitan memahami perbedaan layanan keamanan siber.
- Informasi ruang lingkup dan hasil assessment sering tidak disampaikan secara jelas.
- Pengguna membutuhkan jalur konsultasi yang cepat.
- Organisasi yang mengalami insiden membutuhkan kontak yang mudah ditemukan.
- Website cybersecurity harus terlihat profesional tanpa visual klise atau klaim berlebihan.

## D. Tujuan produk

- Seluruh layanan utama dapat ditemukan maksimal dalam tiga interaksi.
- Pengguna dapat membuka formulir konsultasi dari setiap halaman utama.
- Website dapat digunakan mulai resolusi 360px.
- Semua halaman penting dapat dibuka melalui URL langsung.
- Build production berhasil tanpa error dan tidak ada broken internal link.
- Form memberikan validasi dan feedback yang jelas.
- Lighthouse Performance, Accessibility, Best Practices, dan SEO ditargetkan minimal 90 pada halaman utama.

Nilai Lighthouse adalah target pengembangan, bukan klaim hasil sebelum pengujian dilakukan.

## E. Target pengguna

### 1. Pemilik bisnis
- **Kebutuhan:** penilaian keamanan dan arahan prioritas.
- **Kendala:** tidak memahami detail teknis.
- **Informasi yang dicari:** manfaat, ruang lingkup, proses, dan hasil layanan.
- **Tindakan utama:** mengirim permintaan konsultasi.

### 2. IT Manager
- **Kebutuhan:** assessment, penetration testing, audit, dan bantuan remediasi.
- **Kendala:** keterbatasan sumber daya dan waktu operasional.
- **Informasi yang dicari:** metodologi, cakupan, jadwal, dan deliverables.
- **Tindakan utama:** memilih layanan lalu membuka form kontak.

### 3. Security Officer
- **Kebutuhan:** layanan spesifik, metodologi jelas, serta deliverables teknis.
- **Kendala:** harus memvalidasi kedalaman dan relevansi pengujian.
- **Informasi yang dicari:** pendekatan teknis, batasan, bukti, dan tindak lanjut.
- **Tindakan utama:** mendiskusikan ruang lingkup teknis.

### 4. Pengambil keputusan saat insiden
- **Kebutuhan:** akses cepat ke kontak incident response.
- **Kendala:** tekanan waktu dan informasi awal yang terbatas.
- **Informasi yang dicari:** jalur eskalasi dan langkah aman berikutnya.
- **Tindakan utama:** memilih insiden aktif dan meminta respons.

## F. Ruang lingkup versi 1.0

Home, About, Services, Contact, internal 404, responsive navigation, service cards, statistik, cyber terminal animation, CTA konsultasi, contact form, client-side validation, SEO metadata, sitemap, `robots.txt`, JSON-LD, favicon, logo system, Vercel SPA rewrite, security headers dasar, dan reduced-motion support.

## G. Di luar ruang lingkup versi 1.0

User authentication, dashboard pelanggan, database, pembayaran, live chat, ticketing incident response, pengiriman email aktual, CMS, client portal, automated vulnerability scanner, penetration-testing engine, penyimpanan hasil assessment, dan integrasi CRM. Terminal scan hanya elemen presentasi visual, bukan pemindai keamanan aktual.

## H. Arsitektur informasi

```text
/
├── /about
├── /services
├── /contact
└── /*
```

Home menyampaikan proposisi nilai dan kapabilitas; About menjelaskan pendekatan; Services merinci penawaran; Contact menampung konsultasi frontend; `/*` menampilkan 404 internal dan jalur kembali.

## I. Functional requirements

| ID | Requirement | Prioritas | Acceptance Criteria |
| --- | --- | --- | --- |
| FR-NAV-001 | Navigasi desktop/mobile, active state, routing, dan scroll restoration | Must Have | Menu dapat digunakan dengan keyboard; route aktif dikenali; halaman baru kembali ke atas. |
| FR-HOME-001 | Hero, statistik, terminal presentasional, dan CTA | Must Have | Konten tampil responsif; CTA menuju Contact; terminal tidak diklaim sebagai scanner. |
| FR-ABOUT-001 | Halaman About menjelaskan prinsip kerja | Should Have | URL `/about` dapat dibuka langsung dan CTA menuju Contact. |
| FR-SERVICE-001 | Data layanan reusable dan kartu layanan | Must Have | Semua kartu berasal dari satu sumber data dan CTA menuju Contact. |
| FR-CONTACT-001 | Pilihan layanan dan urgensi | Must Have | Pengguna dapat memilih layanan; insiden aktif memunculkan pesan khusus. |
| FR-FORM-001 | Validasi, loading, success, dan error-ready state | Must Have | Nama, email, layanan, pesan divalidasi; submit valid menampilkan loading dan success; kegagalan API dapat ditambahkan pada integrasi. |
| FR-SEO-001 | Metadata per halaman, JSON-LD, sitemap, robots, dan 404 | Must Have | Judul berubah per route; crawler assets tersedia; route asing menampilkan 404 internal. |
| FR-DEPLOY-001 | Vercel SPA rewrite dan security headers | Must Have | Refresh direct route mengembalikan aplikasi; header dasar dikonfigurasi. |
| FR-BRAND-001 | Logo menuju Home dan favicon lengkap | Must Have | Logo berlabel aksesibel, tidak terdistorsi; favicon muncul bila didukung browser. |

## J. Non-functional requirements

| ID | Area | Requirement |
| --- | --- | --- |
| NFR-PERF | Performance | Route di-lazy-load, SVG dioptimalkan, aset besar tanpa kebutuhan dilarang, dan layout shift diminimalkan. |
| NFR-A11Y | Accessibility | WCAG 2.1 AA sebagai target; keyboard navigation, focus state, semantic heading, label form, ARIA live region, reduced motion, dan kontras teks. |
| NFR-SEC | Security | Tidak ada secret frontend atau `dangerouslySetInnerHTML`; validasi server wajib saat API ditambahkan; security headers dasar dan proteksi link eksternal (`noopener noreferrer`) wajib. |
| NFR-RESP | Responsiveness | Diuji pada 360px, 768px, 1024px, 1440px; tanpa horizontal overflow; area interaksi minimal 44×44px. |
| NFR-COMP | Compatibility | Mendukung versi stabil terbaru Chrome, Edge, Firefox, dan Safari. |
| NFR-MAINT | Maintainability | Komponen dan data reusable, penamaan jelas, lint dan production build dapat dijalankan. |

## K. User stories

1. > Sebagai pemilik bisnis, saya ingin memahami manfaat layanan, sehingga saya dapat memilih langkah awal.
   - Given berada di Home, When membaca kartu layanan, Then manfaat tiap layanan tampil ringkas.
2. > Sebagai IT Manager, saya ingin membandingkan layanan, sehingga saya dapat menentukan ruang lingkup.
   - Given berada di Services, When meninjau daftar, Then semua kapabilitas inti tampil konsisten.
3. > Sebagai pengguna mobile, saya ingin membuka navigasi, sehingga saya dapat berpindah halaman.
   - Given viewport mobile, When tombol Menu dipilih, Then tautan navigasi terlihat dan dapat difokuskan.
4. > Sebagai pengguna, saya ingin mengetahui halaman aktif, sehingga saya tidak kehilangan konteks.
   - Given suatu route aktif, When navigasi tampil, Then tautan aktif mempunyai indikator visual.
5. > Sebagai calon klien, saya ingin membuka form dari CTA, sehingga saya dapat berkonsultasi.
   - Given halaman utama, When CTA konsultasi dipilih, Then route Contact terbuka.
6. > Sebagai IT Manager, saya ingin mengaitkan konsultasi dengan layanan, sehingga permintaan jelas.
   - Given pengguna berada pada halaman Services, When memilih Konsultasikan Layanan, Then pengguna diarahkan ke Contact, And pilihan layanan dapat dipilih.
7. > Sebagai pengirim form, saya ingin validasi jelas, sehingga saya dapat memperbaiki masukan.
   - Given data tidak valid, When submit, Then pesan kesalahan relevan tampil dan submission dihentikan.
8. > Sebagai pengirim form, saya ingin feedback proses, sehingga saya tahu status tindakan.
   - Given data valid, When submit, Then loading tampil, And success diumumkan melalui live region.
9. > Sebagai pengambil keputusan saat insiden, saya ingin menandai insiden aktif, sehingga urgensi dikenali.
   - Given form Contact, When urgensi insiden aktif dipilih, Then peringatan untuk tidak mengirim secret tampil.
10. > Sebagai pengguna direct link, saya ingin halaman tetap terbuka setelah refresh, sehingga tautan dapat dibagikan.
    - Given URL route valid di Vercel, When refresh, Then rewrite menyajikan SPA dan route dirender.
11. > Sebagai pengguna URL salah, saya ingin arahan kembali, sehingga tidak terjebak.
    - Given route tidak dikenal, When halaman dimuat, Then 404 internal dan tautan Home tampil.
12. > Sebagai pengguna motion-sensitive, saya ingin animasi dikurangi, sehingga situs nyaman digunakan.
    - Given preferensi reduced motion aktif, When halaman dimuat, Then animasi dan smooth scrolling diminimalkan.
13. > Sebagai pengguna keyboard, saya ingin focus terlihat, sehingga navigasi dapat dioperasikan.
    - Given memakai Tab, When fokus berpindah, Then indikator fokus kontras terlihat.
14. > Sebagai pengunjung, saya ingin logo membawa ke Home, sehingga saya dapat kembali dengan cepat.
    - Given berada di halaman lain, When logo dipilih, Then Home terbuka.

## L. Content requirements

Tone of voice profesional, tenang, percaya diri, dan mudah dipahami. Istilah teknis diberi konteks; klaim belum diverifikasi dan fear-based marketing berlebihan dilarang. Informasi kontak harus mudah diganti. Statistik dan sertifikasi wajib diverifikasi pemilik bisnis sebelum publikasi.

## M. Design requirements

```text
Background utama: #0A0A0A
Background section: #111111
Background kartu: #121212
Merah utama: #F02D4F
Merah terang: #FF365C
Teks utama: #E6E6E6
Teks sekunder: #8F8F96
Border: rgba(255,255,255,0.09)
Font UI: Inter
Font teknis: JetBrains Mono
```

Arah visual dark cyber-industrial, grid teknis samar, dan neon merah terkendali. Dilarang memakai visual hacker ber-hoodie, ikon emoji, atau menyalin aset situs lain. Logo wajib original.

## N. Analytics plan

| Event | Trigger | Parameter | Tujuan |
| --- | --- | --- | --- |
| `cta_consultation_click` | CTA konsultasi dipilih | source_page | Mengukur niat konsultasi. |
| `service_card_click` | Kartu/CTA layanan dipilih | service_name | Mengukur minat layanan. |
| `contact_form_start` | Interaksi pertama form | source_page | Mengukur form start. |
| `contact_form_validation_error` | Validasi gagal | field_names | Menemukan friction. |
| `contact_form_success` | Submission berhasil | service, urgency | Mengukur konversi. |
| `incident_active_selected` | Urgensi aktif dipilih | service | Memantau kebutuhan respons. |
| `phone_contact_click` | Nomor telepon dipilih | source_page | Mengukur kontak telepon. |
| `email_contact_click` | Email dipilih | source_page | Mengukur kontak email. |

Analytics baru diaktifkan setelah persetujuan pemilik dan kebijakan privasi relevan disiapkan.

## O. Risiko dan mitigasi

| Risiko | Mitigasi |
| --- | --- |
| Klaim statistik belum diverifikasi | Gunakan data netral; approval pemilik sebelum publikasi. |
| Form belum tersambung backend | Label simulasi dengan jelas; integrasikan endpoint pada v1.1. |
| Spam ketika endpoint ditambahkan | Rate limit, honeypot/CAPTCHA proporsional, dan validasi server. |
| Terminal disangka scanner nyata | Beri label demonstrasi visual dan hindari hasil scan palsu. |
| Direct-route 404 di Vercel | Terapkan dan uji SPA rewrite. |
| Animasi memengaruhi performa | Batasi animasi dan hormati reduced motion. |
| Kontras neon tidak memadai | Uji WCAG; jangan gunakan neon untuk teks panjang. |
| Konten terlalu teknis | Gunakan progressive disclosure dan bahasa manfaat. |
| Informasi insiden tidak segera diterima | Jangan menjanjikan SLA sebelum jalur operasional tersedia. |
| Ketergantungan pihak ketiga | Audit dependensi dan minimalkan layanan eksternal. |

## P. Release criteria

- [ ] `npm install` berhasil
- [ ] `npm run build` berhasil
- [ ] Semua route dapat dibuka dan direct refresh tidak 404
- [ ] Tidak ada console error
- [ ] Form validation dan mobile menu berfungsi
- [ ] Logo dan favicon tampil
- [ ] Metadata halaman benar dan tidak ada broken link
- [ ] Tidak ada horizontal overflow
- [ ] Keyboard navigation dan reduced motion diuji
- [ ] Konten dan informasi kontak diverifikasi

## Q. Roadmap

### Version 1.0
Company profile, services, contact form frontend, branding, dan SEO dasar.

### Version 1.1
Rencana integrasi endpoint formulir, email notification, spam protection, dan analytics.

### Version 1.2
Rencana CMS, artikel keamanan, case study, dan halaman layanan terpisah.

### Version 2.0
Rencana secure client portal, ticketing, report delivery, dan role-based access. Fitur roadmap belum tersedia pada versi 1.0.
