import { useRef, useState } from 'react'

const initial = { name: '', email: '', service: '', urgency: 'normal', message: '', privacy: false, website: '' }
const endpoint = import.meta.env.VITE_CONTACT_API_URL?.trim()

function validate(data) {
  const errors = {}
  if (data.name.trim().length < 3) errors.name = 'Nama minimal 3 karakter.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Masukkan alamat email yang valid.'
  if (!data.service) errors.service = 'Pilih layanan.'
  if (data.message.trim().length < 20) errors.message = 'Jelaskan kebutuhan minimal 20 karakter.'
  if (!data.privacy) errors.privacy = 'Persetujuan pemrosesan informasi wajib diberikan.'
  return errors
}

export default function Contact() {
  const [data, setData] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const formRef = useRef(null)

  const change = event => {
    const { name, type, checked, value } = event.target
    setData(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors(current => ({ ...current, [name]: undefined }))
    if (status.type !== 'idle') setStatus({ type: 'idle', message: '' })
  }

  async function submit(event) {
    event.preventDefault()
    const nextErrors = validate(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus({ type: 'error', message: 'Periksa kembali kolom yang ditandai.' })
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    if (data.website) return
    if (!endpoint) {
      setStatus({ type: 'error', message: 'Kanal formulir belum tersedia. Silakan coba kembali setelah administrator mengaktifkan endpoint kontak.' })
      return
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12_000)
    setStatus({ type: 'loading', message: 'Mengirim permintaan secara aman…' })
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(), email: data.email.trim().toLowerCase(), service: data.service,
          urgency: data.urgency, message: data.message.trim(), privacyConsent: true,
        }),
        signal: controller.signal,
      })
      const body = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(body.message || `Server menolak permintaan (${response.status}).`)
      setData(initial)
      setStatus({ type: 'success', message: body.message || 'Permintaan berhasil dikirim. Tim kami akan menindaklanjuti melalui email.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.name === 'AbortError' ? 'Waktu pengiriman habis. Periksa koneksi lalu coba lagi.' : error.message || 'Permintaan gagal dikirim. Silakan coba lagi.',
      })
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const describedBy = name => errors[name] ? `${name}-error` : undefined
  return <section className="page contact"><div><p className="eyebrow">KONTAK</p><h1>Mari membahas kebutuhan keamanan Anda.</h1><p>Jelaskan ruang lingkup tanpa menyertakan password, secret, bukti sensitif, atau material berbahaya. Tim akan menindaklanjuti melalui alamat email yang Anda berikan.</p></div><form ref={formRef} onSubmit={submit} noValidate>
    <label htmlFor="contact-name">Nama *</label><input id="contact-name" name="name" autoComplete="name" value={data.name} onChange={change} aria-invalid={!!errors.name} aria-describedby={describedBy('name')}/><small id="name-error" role={errors.name ? 'alert' : undefined}>{errors.name}</small>
    <label htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" value={data.email} onChange={change} aria-invalid={!!errors.email} aria-describedby={describedBy('email')}/><small id="email-error" role={errors.email ? 'alert' : undefined}>{errors.email}</small>
    <label htmlFor="contact-service">Layanan *</label><select id="contact-service" name="service" value={data.service} onChange={change} aria-invalid={!!errors.service} aria-describedby={describedBy('service')}><option value="">Pilih layanan</option><option>Security Assessment</option><option>Penetration Testing</option><option>Incident Response</option><option>Security Advisory</option></select><small id="service-error" role={errors.service ? 'alert' : undefined}>{errors.service}</small>
    <label htmlFor="contact-urgency">Urgensi</label><select id="contact-urgency" name="urgency" value={data.urgency} onChange={change}><option value="normal">Perencanaan / normal</option><option value="active">Insiden aktif — mendesak</option></select>
    {data.urgency === 'active' && <p className="alert" role="alert">Jangan cantumkan password, secret, atau data sensitif. Gunakan kanal respons insiden resmi organisasi Anda untuk keadaan darurat.</p>}
    <label htmlFor="contact-message">Pesan *</label><textarea id="contact-message" name="message" rows="5" value={data.message} onChange={change} aria-invalid={!!errors.message} aria-describedby={describedBy('message')}/><small id="message-error" role={errors.message ? 'alert' : undefined}>{errors.message}</small>
    <label className="consent" htmlFor="contact-privacy"><input id="contact-privacy" name="privacy" type="checkbox" checked={data.privacy} onChange={change} aria-invalid={!!errors.privacy} aria-describedby={describedBy('privacy')}/><span>Saya menyetujui pemrosesan informasi ini untuk menanggapi permintaan konsultasi. *</span></label><small id="privacy-error" role={errors.privacy ? 'alert' : undefined}>{errors.privacy}</small>
    <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" value={data.website} onChange={change}/></label>
    <button className="button" disabled={status.type === 'loading'}>{status.type === 'loading' ? 'Mengirim…' : 'Kirim permintaan'}</button>
    <p className={`status ${status.type}`} role="status" aria-live="polite">{status.message}</p>
  </form></section>
}
