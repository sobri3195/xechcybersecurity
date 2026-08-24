import { Link } from 'react-router-dom'
export default function Logo() {
  return <Link className="logo" to="/" aria-label="Xech Cyber Security — Home">
    <picture><source media="(max-width: 390px)" srcSet="/brand/xech-cyber-mark.svg"/><img src="/brand/xech-cyber-logo-horizontal.svg" alt="Xech Cyber Security" /></picture>
  </Link>
}
