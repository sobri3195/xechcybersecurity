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
    id: 'news-001',
    slug: 'membangun-budaya-sadar-phishing',
    title: 'Membangun Budaya Sadar Phishing di Tempat Kerja',
    excerpt: 'Langkah praktis untuk membantu tim mengenali pesan mencurigakan, melaporkannya dengan cepat, dan belajar dari simulasi secara aman.',
    category: 'Edukasi',
    publishedAt: '2026-08-24',
    updatedAt: '2026-08-24',
    readTime: 5,
    featured: true,
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
