import {NavLink} from 'react-router-dom';
const links=[['/pegasus','Beranda'],['/pegasus/dashboard','Dashboard'],['/pegasus/challenges','Challenge'],['/pegasus/leaderboard','Leaderboard'],['/pegasus/profile','Profil']];
export default function PegasusShell({children}){return <div className="pegasus min-h-screen pt-16"><div className="peg-grid" aria-hidden="true"/><nav className="peg-subnav" aria-label="Navigasi PEGASUS CTF"><span className="peg-brand">◈ PEGASUS</span>{links.map(([to,label])=><NavLink key={to} end={to==='/pegasus'} to={to}>{label}</NavLink>)}</nav>{children}</div>}
