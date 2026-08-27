export const certipyToc = [
  ['pendahuluan', 'Pendahuluan'],
  ['tentang-certipy', 'Apa itu Certipy?'],
  ['mengapa-berhasil', 'Mengapa serangan berhasil?'],
  ['modul-utama', 'Modul dan teknik utama'],
  ['teknik-lanjutan', 'Teknik yang perlu diwaspadai'],
  ['mitigasi', 'Strategi mitigasi'],
  ['relevansi', 'Red team dan blue team'],
  ['penutup', 'Penutup'],
]

const modules = [
  ['find', 'Memindai konfigurasi AD CS dan mengidentifikasi templat atau CA yang berpotensi rentan.'],
  ['account', 'Mengelola atribut akun dan akun mesin dalam pengujian yang memiliki otorisasi.'],
  ['req', 'Mengajukan permintaan sertifikat dan menguji apakah kebijakan penerbitan mencegah impersonasi.'],
  ['auth', 'Memvalidasi dampak sertifikat dengan autentikasi Kerberos PKINIT di laboratorium atau ruang lingkup uji.'],
  ['shadow', 'Mengaudit risiko kredensial alternatif pada atribut msDS-KeyCredentialLink akun target.'],
  ['template / ca', 'Meninjau dan, hanya dalam simulasi terkontrol, mengelola konfigurasi templat serta CA.'],
  ['forge', 'Mendemonstrasikan dampak kompromi kunci privat CA tanpa menggunakannya di sistem produksi.'],
  ['relay', 'Menguji paparan endpoint web AD CS terhadap NTLM relay dalam engagement yang disetujui.'],
]

export default function CertipyArticle() {
  return <>
    <section id="pendahuluan">
      <h2>Pendahuluan</h2>
      <p>Active Directory Certificate Services (AD CS) adalah komponen infrastruktur kunci publik (PKI) yang banyak digunakan organisasi untuk menerbitkan sertifikat digital di lingkungan Windows. Meski dirancang untuk memperkuat keamanan melalui autentikasi berbasis sertifikat, konfigurasi yang keliru justru dapat membuka jalan bagi eskalasi hak akses hingga pengambilalihan domain.</p>
      <div className="risk-box"><span>Fokus pembahasan</span><strong>Audit dan pertahanan</strong><p>Certipy hanya boleh digunakan pada sistem milik sendiri atau dalam pengujian yang memiliki izin tertulis, ruang lingkup, dan aturan pelaksanaan yang jelas.</p></div>
    </section>

    <section id="tentang-certipy">
      <h2>Apa Itu Certipy?</h2>
      <p>Certipy adalah alat serba guna untuk asesmen ofensif maupun defensif dalam konteks AD CS. Alat ini membantu praktisi menemukan miskonfigurasi templat dan Certificate Authority (CA), lalu memvalidasi dampaknya—mulai dari eskalasi hak istimewa dan impersonasi hingga persistensi berbasis sertifikat. Jalur-jalur serangan AD CS lazim dikelompokkan dengan penamaan ESC.</p>
    </section>

    <section id="mengapa-berhasil">
      <p className="step-label">DASAR RISIKO</p>
      <h2>Mengapa Serangan Ini Bisa Berhasil?</h2>
      <p>Serangan terhadap AD CS umumnya bukan eksploitasi kelemahan kode, melainkan penyalahgunaan hubungan kepercayaan dan kebijakan yang terlalu longgar.</p>
      <ol className="tutorial-steps">
        <li><span>01</span><div><h3>Kepercayaan berlebih pada CA</h3><p>CA memproses permintaan terautentikasi sesuai kebijakan yang dikonfigurasi. Kebijakan penerbitan yang lemah dapat membuat permintaan berbahaya tampak sah.</p></div></li>
        <li><span>02</span><div><h3>Miskonfigurasi templat sertifikat</h3><p>Kombinasi hak enrollment yang luas, kemampuan autentikasi klien, dan kontrol pemohon atas identitas sertifikat dapat memungkinkan impersonasi.</p></div></li>
        <li><span>03</span><div><h3>Autentikasi berbasis sertifikat</h3><p>Kerberos PKINIT memungkinkan autentikasi menggunakan sertifikat. Jika identitas sertifikat dapat dimanipulasi, kontrol yang hanya berfokus pada kata sandi tidak lagi memadai.</p></div></li>
      </ol>
    </section>

    <section id="modul-utama">
      <p className="step-label">PERMUKAAN ASESMEN</p>
      <h2>Modul dan Teknik Utama dalam Certipy</h2>
      <p>Rangkaian modul Certipy mencakup siklus asesmen AD CS. Ringkasan berikut sengaja berfokus pada tujuan audit, bukan langkah eksploitasi operasional.</p>
      <div className="article-table-wrap" tabIndex="0" role="region" aria-label="Modul utama Certipy">
        <table className="article-table"><caption>Kemampuan utama Certipy</caption><thead><tr><th scope="col">Modul</th><th scope="col">Fungsi dalam asesmen berizin</th></tr></thead><tbody>
          {modules.map(([name, description]) => <tr key={name}><th scope="row"><code>{name}</code></th><td>{description}</td></tr>)}
        </tbody></table>
      </div>
    </section>

    <section id="teknik-lanjutan">
      <p className="step-label">RISIKO LANJUTAN</p>
      <h2>Teknik yang Patut Diwaspadai</h2>
      <div className="response-stage"><h3>Shadow Credentials</h3><p>Teknik ini menyisipkan material kredensial alternatif ke atribut <code>msDS-KeyCredentialLink</code> pada akun target. Akses dapat bertahan setelah kata sandi target berubah, sehingga pemantauan perubahan atribut dan pembatasan izin tulis menjadi penting.</p></div>
      <div className="response-stage"><h3>Eskalasi ke Subordinate CA</h3><p>Jika penyerang memperoleh sertifikat Subordinate CA yang dipercaya atau menguasai kunci privat CA, ia berpotensi menerbitkan sertifikat untuk identitas lain. Skenario ini harus diperlakukan sebagai kompromi tingkat tinggi yang memerlukan respons PKI menyeluruh.</p></div>
    </section>

    <section id="mitigasi">
      <p className="step-label">PERTAHANAN</p>
      <h2>Strategi Mitigasi</h2>
      <ul className="check-list verify-list">
        <li><strong>Keraskan dan audit templat.</strong> Tinjau templat aktif, khususnya kombinasi autentikasi klien, kontrol identitas pemohon, approval, dan kelompok yang boleh melakukan enrollment.</li>
        <li><strong>Batasi izin tulis.</strong> Terapkan least privilege untuk hak Enroll, perubahan templat, perubahan <code>msDS-KeyCredentialLink</code>, dan pembuatan akun mesin.</li>
        <li><strong>Aktifkan audit CA.</strong> Pantau Event ID 4886 untuk permintaan sertifikat dan 4887 untuk penerbitan sertifikat, lalu korelasikan dengan perubahan objek AD dan autentikasi.</li>
        <li><strong>Kurangi paparan relay.</strong> Nonaktifkan Web Enrollment dan NTLM bila tidak diperlukan; bila masih diperlukan, terapkan perlindungan autentikasi serta segmentasi yang sesuai.</li>
        <li><strong>Lindungi kunci CA.</strong> Batasi akses administratif, gunakan perlindungan kunci yang memadai, siapkan backup aman, dan dokumentasikan prosedur respons kompromi PKI.</li>
      </ul>
      <div className="safe-note"><strong>Deteksi membutuhkan konteks</strong><p>Penerbitan sertifikat bukan dengan sendirinya bukti serangan. Bangun baseline, tandai identitas atau templat berisiko tinggi, dan korelasikan peristiwa CA dengan perubahan direktori serta autentikasi Kerberos yang tidak lazim.</p></div>
    </section>

    <section id="relevansi">
      <h2>Relevansi bagi Red Team dan Blue Team</h2>
      <p>Bagi <strong>red team</strong>, pemahaman enumerasi templat, validasi impersonasi, shadow credentials, dan dampak kompromi CA membantu menguji kontrol secara realistis. Bagi <strong>blue team</strong>, pemahaman jalur yang sama menjadi dasar untuk merancang deteksi dan prioritas hardening yang tepat sasaran. Kolaborasi keduanya dalam pendekatan <em>purple team</em> membantu organisasi menguji apakah pencegahan, telemetri, dan prosedur respons benar-benar bekerja.</p>
    </section>

    <section id="penutup">
      <h2>Penutup</h2>
      <p>AD CS sering luput dari audit rutin, padahal kepercayaan sertifikat dapat berdampak pada seluruh domain. Peninjauan templat secara berkala, kontrol akses yang ketat, perlindungan kunci CA, dan deteksi berbasis log merupakan fondasi untuk menutup jalur serangan yang dapat diidentifikasi dengan Certipy.</p>
    </section>
  </>
}
