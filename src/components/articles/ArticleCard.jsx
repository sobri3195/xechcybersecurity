import { Link } from 'react-router-dom'
import { formatArticleDate } from '../../utils/formatArticleDate'

export default function ArticleCard({ article, featured = false }) {
  return <article className={`intelligence-card${featured ? ' featured' : ''}`}>
    <Link className="article-cover" to={`/articles/${article.slug}`} tabIndex="-1" aria-hidden="true">
      <img src={article.cover.src} alt="" loading="lazy" onError={event => { event.currentTarget.hidden = true; event.currentTarget.parentElement.classList.add('image-fallback') }} />
    </Link>
    <div className="intelligence-card-body">
      <p className="article-kicker"><span>{article.category}</span><time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time></p>
      <h2><Link to={`/articles/${article.slug}`}>{article.title}</Link></h2>
      <p>{article.summary}</p>
      <div className="article-card-bottom"><span>{article.readTime} menit baca</span><Link to={`/articles/${article.slug}`} aria-label={`Baca selengkapnya: ${article.title}`}>Baca selengkapnya <span aria-hidden="true">→</span></Link></div>
    </div>
  </article>
}
