const articleMetadata = {
  'mitigasi-cve-2026-19478-gitlab': {
    author: { name: 'Raka Pradana', role: 'Security Researcher · Xech', initials: 'RP' },
    references: [
      { label: 'GitLab Security Releases', url: 'https://about.gitlab.com/releases/categories/releases/', description: 'Informasi rilis dan pembaruan resmi GitLab.' },
      { label: 'GitLab Update Guide', url: 'https://docs.gitlab.com/update/', description: 'Dokumentasi resmi untuk merencanakan jalur pembaruan.' },
    ],
  },
  'mitigasi-cve-2026-73570-zimbra': {
    author: { name: 'Nadia Kusuma', role: 'Incident Response Analyst · Xech', initials: 'NK' },
    references: [
      { label: 'Zimbra Security Center', url: 'https://www.zimbra.com/security/', description: 'Advisory dan informasi keamanan resmi Zimbra.' },
      { label: 'Zimbra Documentation', url: 'https://www.zimbra.com/documentation/', description: 'Dokumentasi administrasi dan pembaruan produk.' },
    ],
  },
  'mitigasi-cve-2026-63520-sharepoint': {
    author: { name: 'Fahmi Akbar', role: 'Cloud & Infrastructure Security · Xech', initials: 'FA' },
    references: [
      { label: 'Microsoft Security Response Center', url: 'https://msrc.microsoft.com/update-guide/', description: 'Panduan pembaruan keamanan resmi Microsoft.' },
      { label: 'SharePoint Updates', url: 'https://learn.microsoft.com/officeupdates/sharepoint-updates', description: 'Daftar build dan pembaruan SharePoint Server.' },
    ],
  },
}

const rawArticles = [
  {
    slug: 'mitigasi-cve-2026-19478-gitlab', category: 'GitLab Security', date: '24 Agustus 2026', readTime: '8 menit baca', cve: 'CVE-2026-19478', severity: 'Kritis',
    title: 'Panduan defensif merespons kerentanan GraphQL GitLab',
    summary: 'Langkah terstruktur untuk memetakan paparan, memperbarui GitLab self-managed, memeriksa indikator anomali, dan memvalidasi pemulihan.',
    intro: 'Kerentanan injeksi kode pada fitur GraphQL dilaporkan berdampak pada GitLab Community Edition dan Enterprise Edition yang dikelola sendiri. Karena serangan dapat menyasar proyek publik tanpa autentikasi pada kondisi tertentu, tim perlu memperlakukan server yang terpapar internet sebagai prioritas pemeriksaan.',
    impact: 'Penyerang berpotensi memodifikasi atau menghapus data proyek publik. Ketersediaan proof of concept dan laporan eksploitasi aktif meningkatkan urgensi, tetapi pemeriksaan internal tetap diperlukan untuk memastikan apakah lingkungan Anda benar-benar terdampak.',
    before: ['Catat versi GitLab, metode instalasi (Omnibus, Helm, atau paket), URL publik, serta pemilik sistem.', 'Buat snapshot atau backup sesuai prosedur resmi dan pastikan tersedia ruang penyimpanan yang cukup.', 'Ekspor daftar integrasi dan runner penting agar perubahan setelah pembaruan mudah dibandingkan.'],
    steps: [
      { title: 'Inventarisasi dan batasi paparan', body: 'Identifikasi seluruh instance self-managed, termasuk staging. Sambil menunggu patch window, batasi akses ke endpoint dari jaringan tepercaya melalui reverse proxy atau WAF tanpa mengganggu operasi penting.' },
      { title: 'Perbarui melalui jalur resmi', body: 'Gunakan rilis keamanan out-of-band terbaru dari GitLab yang sesuai dengan jalur upgrade versi Anda. Baca catatan upgrade, uji di staging, lalu jalankan backup dan pembaruan pada production dalam change window.' },
      { title: 'Tinjau jejak aktivitas', body: 'Periksa access log, audit event, aktivitas GraphQL yang tidak lazim, perubahan branch/proyek, penghapusan data, token baru, serta perubahan hak akses sejak waktu paparan yang paling awal.' },
      { title: 'Pulihkan dan rotasi kredensial', body: 'Jika ditemukan aktivitas mencurigakan, isolasi instance, simpan bukti log, pulihkan data dari backup bersih, dan rotasi token akses, deploy key, runner token, secret integrasi, serta kredensial administrator.' }
    ],
    verify: ['Versi yang berjalan tercantum sebagai versi yang telah diperbaiki.', 'Health check, clone/push, pipeline, dan integrasi utama kembali normal.', 'Tidak ada perubahan proyek atau identitas yang tidak dapat dijelaskan.', 'Monitoring khusus endpoint GraphQL dan audit event sudah aktif.'],
    detection: 'Buat baseline volume permintaan GraphQL, lalu prioritaskan lonjakan dari sumber baru, respons error berulang, dan aktivitas perubahan proyek yang tidak sesuai jadwal. Jangan hanya mengandalkan satu indikator; korelasikan access log, audit event, dan histori repository.'
  },
  {
    slug: 'mitigasi-cve-2026-73570-zimbra', category: 'Email Security', date: '24 Agustus 2026', readTime: '7 menit baca', cve: 'CVE-2026-73570', severity: 'Kritis',
    title: 'Tutorial hardening Zimbra dan penanganan risiko zimbra-snmp',
    summary: 'Panduan aman untuk mengecek paket zimbra-snmp, mengurangi permukaan serangan, memperbarui ZCS, dan menelusuri tanda eksekusi perintah.',
    intro: 'Celah OS command injection dilaporkan berada pada paket opsional zimbra-snmp di Zimbra Collaboration sebelum versi 10.1.20, terutama ketika notifikasi SNMP diaktifkan. Dampaknya dapat berupa eksekusi kode jarak jauh tanpa autentikasi.',
    impact: 'Server email menyimpan data bernilai tinggi dan sering terpapar internet. Laporan eksploitasi aktif serta pencantuman dalam katalog kerentanan yang diketahui dieksploitasi membuat pembaruan dan threat hunting perlu diprioritaskan.',
    before: ['Konfirmasi versi ZCS dan apakah zimbra-snmp benar-benar terpasang serta digunakan.', 'Dokumentasikan konfigurasi notifikasi SNMP dan tujuan penerimanya.', 'Siapkan backup mailbox, LDAP, konfigurasi, dan prosedur rollback yang sudah diuji.'],
    steps: [
      { title: 'Periksa kebutuhan paket', body: 'Validasi bersama tim monitoring. Jika zimbra-snmp tidak dibutuhkan, nonaktifkan atau hapus paket menggunakan prosedur vendor. Jangan menghapus komponen production tanpa backup dan persetujuan perubahan.' },
      { title: 'Kurangi akses jaringan', body: 'Batasi port dan antarmuka manajemen ke subnet monitoring yang sah. Gunakan firewall host dan perimeter untuk menolak koneksi yang tidak diperlukan serta catat seluruh penolakan untuk investigasi.' },
      { title: 'Naikkan versi ke 10.1.20 atau lebih baru', body: 'Ambil paket hanya dari kanal resmi Zimbra, verifikasi integritasnya, baca dependency dan known issue, uji pada replika, kemudian lakukan pembaruan sesuai runbook organisasi.' },
      { title: 'Lakukan threat hunting', body: 'Cari proses anak yang tidak biasa dari layanan Zimbra, koneksi keluar baru, perubahan scheduled task, akun admin baru, file yang berubah di direktori aplikasi, dan autentikasi anomali.' }
    ],
    verify: ['ZCS menunjukkan versi 10.1.20 atau versi perbaikan yang lebih baru.', 'zimbra-snmp hanya aktif bila ada kebutuhan bisnis yang terdokumentasi.', 'Aturan firewall membatasi jalur manajemen dan monitoring.', 'Uji kirim-terima email, antrean, LDAP, dan monitoring selesai tanpa error.'],
    detection: 'Korelasikan log Zimbra, process accounting atau EDR, firewall egress, dan perubahan file. Bila ditemukan indikasi eksekusi, jangan langsung membersihkan artefak: isolasi host dan pertahankan bukti untuk menentukan ruang lingkup kompromi.'
  },
  {
    slug: 'mitigasi-cve-2026-63520-sharepoint', category: 'Microsoft Security', date: '24 Agustus 2026', readTime: '9 menit baca', cve: 'CVE-2026-63520', severity: 'Kritis',
    title: 'Playbook patching dan validasi Microsoft SharePoint Server',
    summary: 'Dari pemetaan farm hingga pengujian pascapatch: tutorial defensif menangani risiko RCE dalam rantai eksploitasi SharePoint.',
    intro: 'Kerentanan improper input validation pada Microsoft SharePoint Server dilaporkan dapat memungkinkan eksekusi kode jarak jauh tanpa autentikasi dengan hak akun layanan situs. Risiko bertambah ketika celah ini dirangkai dengan kerentanan lain seperti CVE-2026-55040.',
    impact: 'Kompromi akun layanan dapat membuka akses ke konten, konfigurasi, dan sistem yang terhubung sesuai privilege akun tersebut. Detail teknis yang mulai beredar menjadi alasan untuk mempercepat patch tanpa melakukan pengujian eksploit terhadap sistem production.',
    before: ['Petakan seluruh server pada farm, peran server, build number, dan ketergantungan solusi kustom.', 'Pastikan backup farm, database konten, konfigurasi, dan kunci yang diperlukan untuk recovery tersedia.', 'Tentukan maintenance window dan siapkan pemantauan layanan, IIS, serta database.'],
    steps: [
      { title: 'Kurangi permukaan akses', body: 'Batasi SharePoint on-premises ke VPN, reverse proxy, atau sumber tepercaya. Tinjau kembali publikasi endpoint dan hapus aturan firewall lama yang tidak lagi dibutuhkan.' },
      { title: 'Terapkan pembaruan di seluruh farm', body: 'Unduh pembaruan keamanan Agustus 2026 dari Microsoft Update Catalog atau kanal resmi organisasi. Ikuti urutan pembaruan farm, selesaikan konfigurasi produk bila disyaratkan, dan jangan meninggalkan node pada build berbeda.' },
      { title: 'Audit akun layanan', body: 'Pastikan akun aplikasi dan farm tidak memiliki hak administrator domain atau akses sistem yang tidak diperlukan. Rotasi kredensial bila terdapat indikasi kompromi dan perbarui dependensi secara terkendali.' },
      { title: 'Periksa indikator anomali', body: 'Tinjau log IIS, ULS, Windows Event, EDR, perubahan file aplikasi, proses anak dari worker process, web shell, dan koneksi keluar yang tidak sesuai baseline.' }
    ],
    verify: ['Build number pada setiap node sesuai pembaruan keamanan terbaru.', 'Central Administration, site collection, search, dan integrasi bisnis lulus smoke test.', 'Tidak ada node farm tertinggal atau menunggu konfigurasi.', 'Akun layanan mengikuti least privilege dan alert EDR aktif.'],
    detection: 'Fokus pada hubungan antarperistiwa: request web yang tidak biasa, proses yang diluncurkan worker IIS, penulisan file, lalu koneksi jaringan keluar. Satu error HTTP saja bukan bukti eksploitasi; simpan timeline dan validasi dengan beberapa sumber telemetri.'
  }
]

const heroMedia = {
  src: '/article-security-operations.svg',
  alt: 'Ilustrasi dashboard pusat operasi keamanan dengan panel pemantauan dan perisai',
  caption: 'Ilustrasi: alur respons defensif dimulai dari pemantauan, mitigasi, kemudian validasi.',
}

const comparisonTable = {
  caption: 'Prioritas tindakan berdasarkan kondisi lingkungan',
  headers: ['Kondisi', 'Prioritas', 'Tindakan awal'],
  rows: [
    ['Terpapar internet', 'Segera', 'Batasi akses, pertahankan log, lalu jadwalkan pembaruan'],
    ['Hanya jaringan internal', 'Tinggi', 'Validasi versi, petakan akses, dan uji patch'],
    ['Sudah diperbarui', 'Monitor', 'Verifikasi build dan pantau indikator anomali'],
  ],
}

export const articles = rawArticles.map(article => ({
  ...article,
  ...articleMetadata[article.slug],
  heroMedia,
  comparisonTable,
}))

export const getArticle = slug => articles.find(article => article.slug === slug)
