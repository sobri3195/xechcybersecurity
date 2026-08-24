import { Link } from 'react-router-dom';
export default function Breadcrumb({items=[]}){return <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted"><ol className="flex flex-wrap gap-2"><li><Link to="/">Home</Link></li>{items.map((x,i)=><li key={x.label}>/ {x.to&&i<items.length-1?<Link to={x.to}>{x.label}</Link>:<span aria-current="page">{x.label}</span>}</li>)}</ol></nav>}
