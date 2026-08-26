const base = (import.meta.env.VITE_PEGASUS_API_URL || '/api/pegasus').replace(/\/$/, '');

export class PegasusApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'PegasusApiError';
    this.status = status;
  }
}

export async function pegasusApi(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  const authToken = localStorage.getItem('auth_token');
  const headers = {Accept: 'application/json', ...options.headers};
  if (options.body) headers['Content-Type'] = 'application/json';
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  try {
    const response = await fetch(`${base}${path}`, {...options, headers, signal: controller.signal});
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new PegasusApiError(body?.message || `Permintaan gagal (${response.status}).`, response.status);
    if (!body) throw new PegasusApiError('Respons server bukan JSON yang valid.', response.status);
    return body.data ?? body;
  } catch (error) {
    if (error.name === 'AbortError') throw new PegasusApiError('Server PEGASUS tidak merespons. Coba lagi.', 408);
    if (error instanceof PegasusApiError) throw error;
    throw new PegasusApiError('API PEGASUS tidak dapat dijangkau. Periksa koneksi atau konfigurasi.', 0);
  } finally {
    clearTimeout(timeout);
  }
}

export const getChallenges = (query = '') => pegasusApi(`/challenges${query}`);
export const getChallenge = id => pegasusApi(`/challenges/${encodeURIComponent(id)}`);
export const getLeaderboard = () => pegasusApi('/leaderboard');
export const startChallenge = id => pegasusApi(`/challenges/${encodeURIComponent(id)}/start`, {method: 'POST', body: '{}'});
export const submitFlag = (id, flag) => pegasusApi(`/challenges/${encodeURIComponent(id)}/submit`, {method: 'POST', body: JSON.stringify({flag})});
export const unlockHint = (id, order) => pegasusApi(`/challenges/${encodeURIComponent(id)}/hints/${order}`, {method: 'POST', body: '{}'});
