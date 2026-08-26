import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'

const ALL_CATEGORIES = 'Semua kategori'

export default function Articles() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const categories = useMemo(
    () => [ALL_CATEGORIES, ...new Set(articles.map(article => article.category))],
    [],
  )
  const filteredArticles = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('id-ID')

    return articles.filter(article => {
      const matchesCategory = category === ALL_CATEGORIES || article.category === category
      const searchableText = [article.title, article.summary, article.category, article.cve]
        .join(' ')
        .toLocaleLowerCase('id-ID')

      return matchesCategory && (!keyword || searchableText.includes(keyword))
    })
  }, [category, query])

  const resetFilters = () => {
    setQuery('')
    setCategory(ALL_CATEGORIES)
  }

  return (
    <section className="page articles-page">
      <p className="eyebrow">THREAT BRIEF &amp; TUTORIAL</p>
      <h1>Artikel keamanan yang bisa langsung ditindaklanjuti.</h1>
      <p>
        Bukan sekadar ringkasan CVE. Setiap materi memuat persiapan, langkah mitigasi
        defensif, pemeriksaan indikasi kompromi, dan validasi setelah patch.
      </p>

      <div className="article-filters" role="search" aria-label="Cari dan filter artikel">
        <label>
          Cari artikel
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Judul, topik, atau CVE"
          />
        </label>
        <label>
          Kategori
          <select value={category} onChange={event => setCategory(event.target.value)}>
            {categories.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <p aria-live="polite">
          Menampilkan <strong>{filteredArticles.length}</strong> dari {articles.length} artikel
        </p>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="article-grid">
          {filteredArticles.map(article => (
            <article className="article-card" key={article.slug}>
              <div className="article-card-top">
                <span aria-hidden="true">{article.cve.startsWith('CVE-') ? article.cve.split('-').at(-1).slice(-2) : 'AI'}</span>
                <span className="severity">{article.severity}</span>
              </div>
              <p className="article-meta">{article.category} · {article.readTime}</p>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <p className="article-card-author">Oleh <strong>{article.author.name}</strong></p>
              <div className="article-card-footer">
                <strong>{article.cve}</strong>
                <Link to={`/articles/${article.slug}`} aria-label={`Baca tutorial: ${article.title}`}>
                  Baca tutorial <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="article-empty">
          <h2>Artikel tidak ditemukan</h2>
          <p>Coba kata kunci lain atau tampilkan kembali seluruh kategori.</p>
          <button className="button secondary" type="button" onClick={resetFilters}>
            Atur ulang filter
          </button>
        </div>
      )}

      <aside className="editorial-note">
        <strong>Catatan editorial</strong>
        <p>
          Materi ini berfokus pada pertahanan. Selalu validasi versi terdampak dan
          instruksi patch melalui advisory resmi vendor sebelum melakukan perubahan pada production.
        </p>
      </aside>
    </section>
  )
}
