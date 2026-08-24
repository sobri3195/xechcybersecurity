# Product Requirements — Xech Cyber Security

## Tujuan dan ruang lingkup
Berita memuat kabar/kegiatan berbasis waktu; Informasi memuat panduan edukatif evergreen. Detail keduanya mendukung breadcrumb, pencarian/filter URL, daftar isi, related content, dan metadata unik. Direktori pejabat hanya menerima data resmi, meminimalkan data pribadi, dan menandai seluruh placeholder. Daily Cyber Quiz menyajikan lima soal deterministik per tanggal lokal, progres lokal, hasil, streak, statistik, badge, dan riwayat maksimal 30 hari.

## User stories
- Pengunjung dapat mencari, memfilter, membagikan, dan membuka publikasi secara langsung.
- Pengunjung dapat menyimpan/reset checklist tanpa menyerahkan data sensitif.
- Pengunjung dapat membedakan profil demonstrasi dari profil resmi.
- Pengunjung dapat melanjutkan lima soal harian yang sama dan memahami jawabannya setelah submit.

## Functional requirements
- **FR-NEWS-001** Daftar berita memiliki featured, search, kategori, tahun, sort, pagination/empty/reset.
- **FR-NEWS-002** Detail berita memiliki metadata artikel, TOC, share/copy fallback, related, dan not-found.
- **FR-INFO-001** Informasi terpisah dan dapat difilter menurut topik, tingkat, serta tipe.
- **FR-INFO-002** Detail memiliki callout, checklist lokal/reset, referensi, dan related.
- **FR-OFFICIAL-001** Direktori dapat dicari/difilter dan tidak menyimpulkan hierarki yang belum lengkap.
- **FR-OFFICIAL-002** Detail hanya menampilkan data resmi relevan dan badge demonstrasi untuk placeholder.
- **FR-QUIZ-001** Seed tanggal memilih tepat lima soal yang stabil dan menghindari tiga hari terakhir bila cukup.
- **FR-QUIZ-002** Jawaban bisa diubah/disimpan dan submit terkunci hingga lengkap.
- **FR-QUIZ-003** Hasil memuat skor, penjelasan, area belajar, share, dan countdown lokal.
- **FR-QUIZ-004** Streak tidak bertambah dua kali per tanggal; best streak/statistik bertahan dan history dibatasi 30 hari.
- **NFR-CONTENT-001** Tidak ada klaim, kutipan, profil, atau sumber rekaan; setiap konten memiliki tanggal pembaruan.
- **NFR-PRIVACY-001** Tidak menyimpan identitas/fingerprint/data sensitif dan analytics memerlukan consent.

## Acceptance criteria
Seluruh route dan slug valid bisa dibuka/refresh melalui rewrite Vercel, slug invalid memberi not-found kontekstual, metadata/breadcrumb berbeda, loading dan empty state tersedia, keyboard/focus dan reduced-motion didukung, layout mulai 360px tanpa overflow, filter bertahan di URL, checklist dapat reset, quiz stabil pada tanggal sama/berotasi pada tanggal berbeda, submit lengkap saja, serta build dan lint lulus.

## Risiko dan fase berikutnya
Konten tidak terverifikasi dapat menyesatkan sehingga diperlukan workflow editorial dan CMS. Tanggal browser dapat dimanipulasi dan jawaban frontend dapat dibaca, sehingga quiz bukan ujian formal. Fase berikutnya memindahkan data ke API/CMS, memakai tanggal server/zona organisasi, validasi sumber dan role editorial, serta prerendering/SSR untuk mengatasi keterbatasan SEO SPA.
