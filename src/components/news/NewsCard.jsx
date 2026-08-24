import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

export default function NewsCard({ item }) {
  return <article className="card flex flex-col">
    <img src={item.image} alt={item.imageAlt} className="mb-5 aspect-video w-full rounded-xl bg-white/5 object-cover" loading="lazy" />
    <p className="eyebrow">{item.category} · Data Demonstrasi</p>
    <h3 className="mt-3 font-mono text-xl font-bold"><Link className="hover:text-neon" to={`/news/${item.slug}`}>{item.title}</Link></h3>
    <p className="mt-3 flex-1 text-muted">{item.excerpt}</p>
    <p className="mt-4 text-xs text-muted"><time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time> · {item.readTime} menit baca</p>
    <Link className="mt-4 font-semibold text-neon" to={`/news/${item.slug}`} aria-label={`Baca selengkapnya: ${item.title}`}>Baca Selengkapnya →</Link>
  </article>;
}
