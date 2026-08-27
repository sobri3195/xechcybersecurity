export const journalStats = [
  { value: '128', label: 'Naskah diterbitkan', detail: '+18 tahun ini' },
  { value: '42', label: 'Reviewer aktif', detail: '8 bidang keahlian' },
  { value: '21 hari', label: 'Rata-rata review', detail: 'Double-blind review' },
  { value: '96%', label: 'Terbit tepat waktu', detail: '4 edisi per tahun' },
]

export const journalArticles = [
  {
    id: 'JCS-2026-041',
    title: 'Zero Trust Adaptif untuk Infrastruktur Cloud Pemerintah',
    authors: 'Aulia Rahman, Nadia Kusuma',
    category: 'Cloud Security',
    status: 'Diterbitkan',
    date: '18 Agustus 2026',
    issue: 'Vol. 4 No. 3',
    abstract: 'Model evaluasi kontrol akses adaptif yang menggabungkan konteks identitas, perangkat, dan risiko sesi untuk lingkungan multi-cloud.',
  },
  {
    id: 'JCS-2026-038',
    title: 'Deteksi Anomali DNS Berbasis Pembelajaran Mesin',
    authors: 'Fajar Pratama, Rizki Ananda',
    category: 'Threat Detection',
    status: 'Dalam review',
    date: '12 Agustus 2026',
    issue: 'Vol. 4 No. 3',
    abstract: 'Pendekatan deteksi tunneling DNS menggunakan fitur statistik ringan untuk SOC dengan sumber daya terbatas.',
  },
  {
    id: 'JCS-2026-035',
    title: 'Kerangka Respons Insiden Ransomware untuk UMKM',
    authors: 'Siti Lestari',
    category: 'Incident Response',
    status: 'Revisi',
    date: '4 Agustus 2026',
    issue: 'Vol. 4 No. 3',
    abstract: 'Kerangka respons praktis yang memetakan peran, prioritas pemulihan, dan bukti minimum untuk organisasi berukuran kecil.',
  },
  {
    id: 'JCS-2026-029',
    title: 'Analisis Keamanan Implementasi Passkey pada Layanan Digital',
    authors: 'Bagas Mahendra, Citra Dewi',
    category: 'Identity Security',
    status: 'Diterima',
    date: '27 Juli 2026',
    issue: 'Vol. 4 No. 3',
    abstract: 'Studi komparatif alur registrasi dan pemulihan passkey dengan fokus pada ketahanan terhadap phishing.',
  },
]

export const workflow = [
  { number: '01', title: 'Kirim naskah', text: 'Penulis melengkapi metadata, pernyataan orisinalitas, dan berkas tanpa identitas.' },
  { number: '02', title: 'Pemeriksaan editor', text: 'Editor memvalidasi fokus, format, etika publikasi, serta kelengkapan naskah.' },
  { number: '03', title: 'Double-blind review', text: 'Dua reviewer independen menilai metodologi, kebaruan, dan kontribusi.' },
  { number: '04', title: 'Keputusan & terbit', text: 'Revisi diverifikasi, naskah disunting, diberi DOI, lalu masuk ke edisi.' },
]
