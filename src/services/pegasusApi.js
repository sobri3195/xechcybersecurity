const base = import.meta.env.VITE_PEGASUS_API_URL || '/api/pegasus';
const token = () => localStorage.getItem('auth_token');
export async function pegasusApi(path, options = {}) {
  const response = await fetch(`${base}${path}`, { ...options, headers: { 'Content-Type':'application/json', Accept:'application/json', Authorization:`Bearer ${token() || ''}`, ...options.headers }});
  const body = await response.json().catch(() => ({ message:'Respons server tidak valid.' }));
  if (!response.ok) throw new Error(body.message || 'Permintaan gagal.');
  return body.data ?? body;
}
export const getChallenges = (query='') => pegasusApi(`/challenges${query}`);
export const getChallenge = id => pegasusApi(`/challenges/${encodeURIComponent(id)}`);
export const startChallenge = id => pegasusApi(`/challenges/${id}/start`, {method:'POST',body:'{}'});
export const submitFlag = (id, flag) => pegasusApi(`/challenges/${id}/submit`, {method:'POST',body:JSON.stringify({flag})});
export const unlockHint = (id, order) => pegasusApi(`/challenges/${id}/hints/${order}`, {method:'POST',body:'{}'});
