const article = (data) => ({
  author: 'Tim Editorial Xech Cyber',
  image: '/images/news/news-placeholder.svg',
  imageAlt: 'Ilustrasi perisai dan jaringan keamanan siber',
  tags: [],
  isPlaceholder: true,
  ...data,
});

// Konten berikut adalah materi demonstrasi. Ganti dengan artikel yang telah
// melewati verifikasi editorial sebelum situs dipublikasikan.
export const news = [
  article({
    id: 'news-007',
    slug: 'ai-mengubah-risiko-sql-injection-2026',
    title: 'AI dan SQL Injection di 2026: Serangan Makin Cepat, Pertahanan Harus Lebih Cerdas',
    excerpt: 'AI mempercepat pencarian celah dan variasi payload SQL injection, tetapi tim keamanan dapat memakai teknologi yang sama untuk menemukan serta menutup risiko lebih dini.',
    category: 'AI & Keamanan',
    author: 'Tim Riset Keamanan Xech Cyber',
    publishedAt: '2026-08-25',
    updatedAt: '2026-08-25',
    readTime: 7,
    featured: true,
    image: '/images/news/ai-sql-injection-2026.svg',
    imageAlt: 'Ilustrasi kecerdasan buatan yang melindungi basis data dari SQL injection',
    tags: ['AI', 'SQL injection', 'AppSec', 'keamanan aplikasi'],
    sections: [
      {
        heading: 'SQL injection belum menjadi masalah lama',
        paragraphs: [
          'SQL injection terjadi ketika input yang tidak tepercaya ikut membentuk perintah basis data. Dampaknya dapat berupa akses tanpa izin, perubahan data, hingga terganggunya layanan. Pada 2026, akar masalahnya tetap sama: aplikasi mencampurkan data pengguna dengan struktur kueri tanpa pembatasan yang benar.',
          'AI tidak menciptakan kelas kerentanan baru, tetapi dapat membantu pelaku menguji lebih banyak variasi input dan menyesuaikannya terhadap respons aplikasi dengan lebih cepat. Karena itu, organisasi tidak boleh mengandalkan pemblokiran kata kunci atau menyembunyikan pesan kesalahan sebagai perlindungan utama.',
        ],
      },
      {
        heading: 'Dua sisi penggunaan AI pada keamanan aplikasi',
        paragraphs: [
          'Di sisi ofensif, otomasi berbantuan AI dapat mempercepat pemetaan endpoint, pengelompokan respons, dan pembuatan variasi payload. Risiko meningkat ketika aplikasi lama, API yang tidak terdokumentasi, atau kode hasil generasi AI diterapkan tanpa peninjauan keamanan.',
          'Di sisi defensif, AI dapat membantu memprioritaskan temuan pemindai, menandai pola kueri yang tidak biasa, dan menjelaskan aliran data berisiko kepada pengembang. Namun, hasilnya tetap perlu diverifikasi manusia karena model dapat melewatkan konteks atau menghasilkan rekomendasi yang keliru.',
        ],
      },
      {
        heading: 'Pertahanan utama tetap berada di kode',
        paragraphs: [
          'Gunakan parameterized query atau prepared statement agar nilai masukan tidak pernah ditafsirkan sebagai bagian dari sintaks SQL. Terapkan validasi berbasis allowlist sesuai tipe dan kebutuhan bisnis, batasi hak akses akun basis data, serta hindari menampilkan detail kesalahan internal kepada pengguna.',
          'Lapisan tambahan seperti web application firewall dapat membantu mendeteksi pola mencurigakan, tetapi bukan pengganti perbaikan kode. Rahasia koneksi harus dikelola secara aman, aktivitas basis data perlu dicatat, dan cadangan harus diuji agar respons insiden tidak dimulai dari nol.',
        ],
      },
      {
        heading: 'Cara aman memakai AI dalam pengujian',
        paragraphs: [
          'Gunakan AI hanya pada sistem yang dimiliki atau telah memberikan izin tertulis, dengan ruang lingkup dan batas waktu yang jelas. Jangan mengirim kode privat, kredensial, data pelanggan, atau struktur produksi ke layanan AI publik tanpa persetujuan dan kontrol organisasi.',
          'Gabungkan code review, pengujian SAST dan DAST, dependency scanning, serta uji penetrasi terotorisasi. Setiap saran perbaikan dari AI harus melewati review, pengujian regresi, dan verifikasi bahwa kueri benar-benar memakai parameter—bukan sekadar melakukan sanitasi string.',
        ],
      },
      {
        heading: 'Checklist prioritas untuk 2026',
        paragraphs: [
          'Inventarisasikan seluruh aplikasi dan API yang berkomunikasi dengan basis data, lalu prioritaskan endpoint autentikasi, pencarian, filter, dan laporan. Cari kueri dinamis, migrasikan ke prepared statement, kurangi privilege akun layanan, dan tambahkan pengujian keamanan ke pipeline CI/CD.',
          'Kecepatan AI harus dijawab dengan fondasi AppSec yang disiplin. Organisasi yang menggabungkan desain aman, otomasi terukur, dan keputusan manusia yang dapat dipertanggungjawabkan akan lebih siap menghadapi evolusi SQL injection sepanjang 2026.',
        ],
      },
    ],
  }),
  article({
    id: 'news-001',
    slug: 'membangun-budaya-sadar-phishing',
    title: 'Membangun Budaya Sadar Phishing di Tempat Kerja',
    excerpt: 'Langkah praktis untuk membantu tim mengenali pesan mencurigakan, melaporkannya dengan cepat, dan belajar dari simulasi secara aman.',
    category: 'Edukasi',
    publishedAt: '2026-08-24',
    updatedAt: '2026-08-24',
    readTime: 5,
    tags: ['phishing', 'kesadaran keamanan'],
    sections: [
      { heading: 'Mengapa kewaspadaan manusia penting', paragraphs: ['Filter teknis membantu mengurangi pesan berbahaya, tetapi keputusan terakhir sering tetap berada di tangan penerima. Program kesadaran yang baik membangun kebiasaan memeriksa konteks, alamat pengirim, tautan, dan permintaan yang terasa mendesak.', 'Simulasi sebaiknya digunakan sebagai sarana belajar, bukan untuk mempermalukan peserta. Hasilnya perlu diterjemahkan menjadi perbaikan proses yang dapat dilakukan bersama.'] },
      { heading: 'Tiga kebiasaan yang dapat dilatih', paragraphs: ['Biasakan berhenti sejenak sebelum membuka lampiran, mengonfirmasi permintaan sensitif melalui kanal kedua, dan memakai tombol pelaporan yang mudah ditemukan. Tim keamanan juga perlu memberikan respons singkat agar pelapor tahu bahwa laporannya diterima.', 'Materi latihan harus diperbarui mengikuti pola serangan yang relevan bagi organisasi tanpa menampilkan data pribadi atau meniru pihak tertentu secara berlebihan.'] },
      { heading: 'Mengukur perbaikan', paragraphs: ['Ukur kecepatan pelaporan, kualitas eskalasi, serta perubahan perilaku dari waktu ke waktu. Angka klik saja tidak cukup untuk menggambarkan ketahanan organisasi dan sebaiknya tidak digunakan sebagai ukuran kinerja individu.'] },
    ],
  }),
  article({
    id: 'news-002', slug: 'panduan-ringkas-autentikasi-multifaktor', title: 'Panduan Ringkas Mengaktifkan Autentikasi Multifaktor',
    excerpt: 'Mengenal pilihan faktor autentikasi dan cara menerapkannya untuk memperkuat perlindungan akun penting.', category: 'Keamanan Siber',
    publishedAt: '2026-08-18', updatedAt: '2026-08-20', readTime: 4, tags: ['MFA', 'akun'],
    sections: [
      { heading: 'Lapisan tambahan untuk akun', paragraphs: ['Autentikasi multifaktor meminta bukti tambahan selain kata sandi. Jika layanan mendukungnya, aplikasi autentikator atau kunci keamanan umumnya lebih tahan terhadap penyadapan dibandingkan kode yang dikirim melalui SMS.'] },
      { heading: 'Mulai dari akun paling penting', paragraphs: ['Prioritaskan email utama, pengelola kata sandi, perbankan, dan akun administrator. Simpan kode pemulihan di lokasi aman yang terpisah dari perangkat utama dan tinjau perangkat yang masih memiliki sesi aktif.'] },
    ],
  }),
  article({
    id: 'news-003', slug: 'latihan-meja-respons-insiden', title: 'Latihan Meja untuk Mematangkan Respons Insiden',
    excerpt: 'Skenario terarah dapat membantu tim menguji jalur komunikasi, kewenangan keputusan, dan kesiapan pemulihan.', category: 'Incident Response',
    publishedAt: '2026-08-10', updatedAt: '2026-08-10', readTime: 6, tags: ['respons insiden', 'tabletop'],
    sections: [
      { heading: 'Menguji proses tanpa mengganggu operasi', paragraphs: ['Latihan meja mempertemukan pemilik proses untuk mendiskusikan respons terhadap skenario yang masuk akal. Tujuannya adalah menemukan celah pada prosedur, bukan menguji peserta secara individual.'] },
      { heading: 'Catat keputusan dan tindak lanjut', paragraphs: ['Dokumentasikan asumsi, pihak yang perlu dihubungi, bukti yang harus dijaga, serta keputusan pemulihan. Setiap temuan perlu memiliki penanggung jawab dan tenggat yang realistis.'] },
    ],
  }),
  article({
    id: 'news-004', slug: 'forum-berbagi-pengetahuan-keamanan', title: 'Forum Berbagi Pengetahuan Keamanan untuk Tim Teknis',
    excerpt: 'Format sesi internal yang ringan untuk berbagi temuan, pola serangan, dan perbaikan kontrol secara berkelanjutan.', category: 'Kegiatan',
    publishedAt: '2026-07-29', updatedAt: '2026-07-29', readTime: 3, tags: ['komunitas', 'pembelajaran'],
    sections: [
      { heading: 'Belajar secara rutin', paragraphs: ['Sesi singkat dan terjadwal membantu pengetahuan tidak berhenti pada satu orang. Agenda dapat mencakup ulasan insiden yang telah disanitasi, pembaruan kontrol, atau demonstrasi alat pada lingkungan uji.'] },
      { heading: 'Jaga ruang berbagi tetap aman', paragraphs: ['Hapus identitas, kredensial, dan detail sistem sensitif dari materi. Tetapkan aturan distribusi catatan agar informasi operasional tidak tersebar di luar peserta yang berwenang.'] },
    ],
  }),
  article({
    id: 'news-005', slug: 'kolaborasi-untuk-rantai-pasok-digital', title: 'Kolaborasi untuk Menjaga Rantai Pasok Digital',
    excerpt: 'Pertanyaan awal yang membantu organisasi menyelaraskan ekspektasi keamanan bersama penyedia layanan.', category: 'Kolaborasi',
    publishedAt: '2026-07-17', updatedAt: '2026-07-22', readTime: 5, tags: ['vendor', 'rantai pasok'],
    sections: [
      { heading: 'Sepakati tanggung jawab sejak awal', paragraphs: ['Kontrak dan prosedur operasional perlu menjelaskan kepemilikan data, kontrol akses, pemberitahuan insiden, pemulihan, dan penghentian layanan. Persyaratan sebaiknya proporsional dengan risiko layanan.'] },
      { heading: 'Tinjau secara berkala', paragraphs: ['Perubahan integrasi, subprosesor, dan ruang lingkup data dapat mengubah profil risiko. Tinjauan berkala membantu kedua pihak memperbarui kontrol dan kontak eskalasi.'] },
    ],
  }),
  article({
    id: 'news-006', slug: 'praktik-pencadangan-data-yang-dapat-diuji', title: 'Praktik Pencadangan Data yang Dapat Diuji',
    excerpt: 'Cadangan baru bermanfaat ketika terlindungi, dipantau, dan terbukti dapat dipulihkan sesuai kebutuhan operasi.', category: 'Keamanan Siber',
    publishedAt: '2026-07-04', updatedAt: '2026-07-04', readTime: 4, tags: ['backup', 'pemulihan'],
    sections: [
      { heading: 'Pisahkan dan lindungi cadangan', paragraphs: ['Gunakan pemisahan akses dan salinan yang tidak dapat langsung diubah dari lingkungan produksi. Terapkan retensi yang sesuai dengan kebutuhan bisnis dan kewajiban organisasi.'] },
      { heading: 'Uji proses pemulihan', paragraphs: ['Lakukan pengujian berkala dengan target waktu dan cakupan yang jelas. Catat hasilnya, perbaiki kegagalan, dan pastikan dokumentasi dapat digunakan oleh petugas pengganti.'] },
    ],
  }),
];
