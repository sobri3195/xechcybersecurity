const base = import.meta.env.VITE_PEGASUS_API_URL || '/api/pegasus';
const token = () => localStorage.getItem('auth_token');
export class PegasusApiError extends Error {
  constructor(message, status) { super(message); this.name = 'PegasusApiError'; this.status = status; }
}
export async function pegasusApi(path, options = {}) {
  const authToken = token();
  const response = await fetch(`${base}${path}`, { ...options, headers: { 'Content-Type':'application/json', Accept:'application/json', ...(authToken ? {Authorization:`Bearer ${authToken}`} : {}), ...options.headers }});
  const body = await response.json().catch(() => ({ message:'Respons server tidak valid.' }));
  if (!response.ok) throw new PegasusApiError(body.message || 'Permintaan gagal.', response.status);
  return body.data ?? body;
}
export const getChallenges = (query='') => pegasusApi(`/challenges${query}`);
export const getChallenge = id => pegasusApi(`/challenges/${encodeURIComponent(id)}`);
export const startChallenge = id => pegasusApi(`/challenges/${encodeURIComponent(id)}/start`, {method:'POST',body:'{}'});
export const submitFlag = (id, flag) => pegasusApi(`/challenges/${encodeURIComponent(id)}/submit`, {method:'POST',body:JSON.stringify({flag})});
export const unlockHint = (id, order) => pegasusApi(`/challenges/${encodeURIComponent(id)}/hints/${encodeURIComponent(order)}`, {method:'POST',body:'{}'});
export const getLeaderboard = (period='global') => pegasusApi(`/leaderboard?period=${encodeURIComponent(period)}`);
