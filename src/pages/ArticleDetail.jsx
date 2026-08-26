import { Link, Navigate, useParams } from 'react-router-dom'
import { getArticle } from '../data/articles'

function ArticleFigure({ media }) {
  if (!media) return null

  return (
    <figure className="article-figure">
      <img src={media.src} alt={media.alt} loading="lazy" />
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  )
}

function ArticleTable({ table }) {
  if (!table) return null

  return (
    <div className="article-table-wrap" tabIndex="0" role="region" aria-label={table.caption}>
      <table className="article-table">
        <caption>{table.caption}</caption>
        <thead>
          <tr>{table.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                cellIndex === 0
                  ? <th scope="row" key={cell}>{cell}</th>
                  : <td key={`${cell}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) return <Navigate to="/404" replace />

  return (
    <article className="article-detail">
      <Link className="back-link" to="/articles">← Kembali ke semua artikel</Link>
      <header className="article-header">
        <p className="eyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p className="article-lead">{article.summary}</p>
        <div className="article-author">
          <span className="author-avatar" aria-hidden="true">{article.author.initials}</span>
          <div>
            <span>Ditulis oleh</span>
            <strong>{article.author.name}</strong>
            <small>{article.author.role}</small>
          </div>
        </div>
        <div className="article-byline">
          <span>{article.date}</span><span>{article.readTime}</span><strong>{article.cve}</strong>
        </div>
      </header>

      <ArticleFigure media={article.heroMedia} />

      <div className="article-layout">
        <div className="article-content">
          <section id="ringkasan">
            <h2>{article.editorial ? 'Apa Itu Aircrack-ng MCP Server?' : 'Apa yang perlu diketahui?'}</h2>
            <p>{article.intro}</p>
            <div className="risk-box"><span>Tingkat prioritas</span><strong>{article.severity}</strong><p>{article.impact}</p></div>
          </section>
          <section id="persiapan">
            <p className="step-label">TAHAP 01</p><h2>{article.editorial ? 'Persiapan dan Konfigurasi' : 'Persiapan sebelum perubahan'}</h2>
            <p>{article.editorial ? 'Siapkan perangkat, hak akses, dan integrasi secara terkendali sebelum memulai pengujian.' : 'Jangan mulai dari patching tanpa konteks. Siapkan bukti dan jalur pemulihan terlebih dahulu.'}</p>
            <ul className="check-list">{article.before.map(item => <li key={item}>{item}</li>)}</ul>
            {article.sudoersExample && (
              <div className="article-code-example">
                <strong>Contoh pembatasan akses melalui sudoers</strong>
                <pre><code>{article.sudoersExample}</code></pre>
              </div>
            )}
          </section>
          <section id="mitigasi">
            <p className="step-label">TAHAP 02</p><h2>{article.editorial ? 'Daftar Kemampuan (Tools)' : 'Tutorial mitigasi langkah demi langkah'}</h2>
            <ol className="tutorial-steps">{article.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
            <ArticleTable table={article.comparisonTable} />
          </section>
          <section id="deteksi">
            <p className="step-label">TAHAP 03</p><h2>{article.editorial ? 'Mekanisme Serangan Deautentikasi' : 'Deteksi dan triase'}</h2><p>{article.detection}</p>
            <ArticleFigure media={article.inlineMedia} />
            <div className="safe-note"><strong>Jika ada indikasi kompromi</strong><p>Isolasi sistem secara terkendali, pertahankan log dan artefak, catat waktu kejadian, lalu aktifkan prosedur incident response. Hindari menjalankan PoC publik pada server production.</p></div>
          </section>
          <section id="validasi">
            <p className="step-label">TAHAP 04</p><h2>{article.editorial ? 'Strategi Mitigasi' : 'Checklist validasi'}</h2>
            <ul className="check-list verify-list">{article.verify.map(item => <li key={item}>{item}</li>)}</ul>
          </section>
          <section id="referensi">
            <h2>Referensi dan tautan terkait</h2>
            <p>Gunakan sumber resmi berikut untuk memvalidasi versi, prosedur, dan pembaruan terbaru sebelum melakukan perubahan.</p>
            <ul className="reference-list">{article.references.map(reference => <li key={reference.url}><a href={reference.url} target="_blank" rel="noreferrer">{reference.label}<span aria-hidden="true"> ↗</span></a><small>{reference.description}</small></li>)}</ul>
          </section>
          <section><h2>{article.conclusion ? 'Penutup' : 'Langkah berikutnya'}</h2><p>{article.conclusion || 'Dokumentasikan perubahan, pemilik tindakan, hasil pengujian, serta risiko yang masih diterima. Jadwalkan peninjauan ulang untuk memastikan kontrol sementara telah diganti dengan perbaikan permanen.'}</p><Link className="button" to="/contact">Diskusikan kebutuhan assessment</Link></section>
        </div>
        <aside className="article-toc">
          <p>DI ARTIKEL INI</p>
          <ol><li><a href="#ringkasan">{article.editorial ? 'Tentang Aircrack-ng MCP' : 'Apa yang perlu diketahui'}</a></li><li><a href="#persiapan">{article.editorial ? 'Persiapan dan konfigurasi' : 'Persiapan perubahan'}</a></li><li><a href="#mitigasi">{article.editorial ? 'Daftar kemampuan' : 'Tutorial mitigasi'}</a></li><li><a href="#deteksi">{article.editorial ? 'Mekanisme deautentikasi' : 'Deteksi dan triase'}</a></li><li><a href="#validasi">{article.editorial ? 'Strategi mitigasi' : 'Checklist validasi'}</a></li><li><a href="#referensi">Referensi</a></li></ol>
          <div><strong>Penggunaan aman</strong><p>Gunakan hanya pada sistem yang Anda miliki atau kelola dengan izin tertulis.</p></div>
        </aside>
      </div>
    </article>
  )
}
