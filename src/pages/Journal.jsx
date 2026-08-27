import { useMemo, useState } from 'react'
import { journalArticles, journalStats, workflow } from '../data/journals'

const statuses = ['Semua', 'Diterbitkan', 'Dalam review', 'Revisi', 'Diterima']

function Icon({ name }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    file: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

export default function Journal() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Semua')
  const [submitOpen, setSubmitOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const filtered = useMemo(() => journalArticles.filter(article => {
    const text = `${article.title} ${article.authors} ${article.category} ${article.id}`.toLowerCase()
    return (status === 'Semua' || article.status === status) && text.includes(query.trim().toLowerCase())
  }), [query, status])

  function submitManuscript(event) {
    event.preventDefault()
    setSent(true)
  }

  function closeDialog() {
    setSubmitOpen(false)
    setSent(false)
  }

  return <div className="journal-page">
    <section className="journal-hero">
      <div>
        <p className="eyebrow">XECH JOURNAL OF CYBER SECURITY</p>
        <h1>Riset yang menjaga<br/><span>ruang digital.</span></h1>
        <p className="journal-lead">Platform pengelolaan jurnal ilmiah terbuka untuk riset keamanan siber yang relevan, teruji, dan dapat diterapkan.</p>
        <div className="journal-actions">
          <button className="button" type="button" onClick={() => setSubmitOpen(true)}>Kirim naskah <Icon name="arrow"/></button>
          <a className="button secondary" href="#terbitan">Jelajahi terbitan</a>
        </div>
      </div>
      <aside className="journal-issue-card" aria-label="Terbitan terkini">
        <div className="journal-cover"><span>XJCS</span><b>04—03</b><small>August 2026</small></div>
        <div><p className="eyebrow">TERBITAN TERKINI</p><h2>Vol. 4 No. 3</h2><p>Resilient systems, adaptive defense, and trusted digital identity.</p><a href="#terbitan">Lihat 8 artikel <span aria-hidden="true">→</span></a></div>
      </aside>
    </section>

    <section className="journal-stats" aria-label="Statistik jurnal">
      {journalStats.map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span><small>{item.detail}</small></div>)}
    </section>

    <section className="journal-library" id="terbitan">
      <div className="journal-section-head"><div><p className="eyebrow">ARSIP &amp; NASKAH</p><h2>Temukan publikasi terbaru.</h2></div><p>Telusuri artikel berdasarkan judul, penulis, bidang, atau nomor naskah.</p></div>
      <div className="journal-toolbar" role="search">
        <label className="journal-search"><span className="sr-only">Cari publikasi</span><Icon name="search"/><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Cari judul, penulis, atau bidang..."/></label>
        <div className="journal-tabs" aria-label="Filter status">{statuses.map(item => <button type="button" key={item} className={status === item ? 'active' : ''} onClick={() => setStatus(item)}>{item}</button>)}</div>
      </div>
      <p className="journal-result" aria-live="polite">{filtered.length} naskah ditemukan</p>
      <div className="journal-list">
        {filtered.map(article => <article key={article.id}>
          <div className="journal-doc"><Icon name="file"/></div>
          <div className="journal-entry-main"><div className="journal-entry-meta"><span>{article.id}</span><span>{article.category}</span><span>{article.date}</span></div><h3>{article.title}</h3><p className="journal-authors">{article.authors}</p><p>{article.abstract}</p></div>
          <div className="journal-entry-side"><span className={`journal-status status-${article.status.toLowerCase().replace(' ', '-')}`}>{article.status}</span><small>{article.issue}</small><button type="button" aria-label={`Lihat ${article.title}`}>Detail <span aria-hidden="true">↗</span></button></div>
        </article>)}
        {!filtered.length && <div className="journal-empty"><h3>Tidak ada naskah yang cocok</h3><p>Coba ubah kata kunci atau pilih status lain.</p><button className="button secondary" type="button" onClick={() => { setQuery(''); setStatus('Semua') }}>Atur ulang</button></div>}
      </div>
    </section>

    <section className="journal-workflow">
      <div className="journal-section-head"><div><p className="eyebrow">ALUR EDITORIAL</p><h2>Dari naskah menjadi pengetahuan.</h2></div><p>Proses transparan, terlacak, dan berorientasi pada integritas ilmiah.</p></div>
      <div className="journal-workflow-grid">{workflow.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    {submitOpen && <div className="journal-modal" role="dialog" aria-modal="true" aria-labelledby="submit-title" onMouseDown={event => event.target === event.currentTarget && closeDialog()}>
      <div className="journal-modal-panel"><button className="journal-modal-close" onClick={closeDialog} aria-label="Tutup formulir"><Icon name="close"/></button>
        {!sent ? <><p className="eyebrow">SUBMISSION PORTAL</p><h2 id="submit-title">Kirim naskah baru</h2><p>Masukkan informasi awal. Tim editorial akan mengirim instruksi unggah lengkap melalui email.</p><form onSubmit={submitManuscript}><label>Judul naskah<input name="title" required placeholder="Judul lengkap penelitian"/></label><label>Penulis korespondensi<input name="author" required placeholder="Nama lengkap"/></label><label>Email institusi<input name="email" type="email" required placeholder="nama@institusi.ac.id"/></label><label>Bidang<select name="category" required defaultValue=""><option value="" disabled>Pilih bidang</option><option>Cloud Security</option><option>Threat Detection</option><option>Incident Response</option><option>Identity Security</option></select></label><button className="button" type="submit">Lanjutkan pengiriman <Icon name="arrow"/></button></form></> : <div className="journal-success"><span>✓</span><h2 id="submit-title">Informasi diterima.</h2><p>Instruksi pengiriman naskah akan dikirim ke email korespondensi. Simpan kode referensi <strong>XJCS-PRE-0826</strong>.</p><button className="button" type="button" onClick={closeDialog}>Selesai</button></div>}
      </div>
    </div>}
  </div>
}
