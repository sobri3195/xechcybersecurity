import {useEffect, useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {categories, demoChallenges} from './catalog';
import {Difficulty, Progress, State} from '../../components/pegasus/Ui';
import {getChallenges, startChallenge} from '../../services/pegasusApi';

export default function ChallengeList() {
  const [params] = useSearchParams();
  const [filters, setFilters] = useState({query: '', category: params.get('category') || '', difficulty: '', status: '', sort: 'progress'});
  const [view, setView] = useState('grid');
  const [challenges, setChallenges] = useState([]);
  const [state, setState] = useState({loading: true, error: '', starting: null});

  const load = () => {
    setState(current => ({...current, loading: true, error: ''}));
    getChallenges().then(setChallenges)
      .then(() => setState(current => ({...current, loading: false})))
      .catch(error => setState(current => ({...current, loading: false, error: error.message})));
  };
  useEffect(load, []);

  const source = challenges.length ? challenges : (state.error ? demoChallenges : []);
  const rows = useMemo(() => source.filter(item =>
    (!filters.query || item.title.toLowerCase().includes(filters.query.toLowerCase())) &&
    (!filters.category || item.category_slug === filters.category) &&
    (!filters.difficulty || item.difficulty === filters.difficulty) &&
    (!filters.status || item.status === filters.status)
  ).sort((a, b) => filters.sort === 'points' ? b.points - a.points : filters.sort === 'difficulty' ? a.points - b.points : Number(a.locked) - Number(b.locked)), [source, filters]);

  const update = event => setFilters(current => ({...current, [event.target.name]: event.target.value}));
  const begin = async (event, challenge) => {
    if (state.error || challenge.status !== 'not_started') return;
    event.preventDefault();
    setState(current => ({...current, starting: challenge.id}));
    try {
      await startChallenge(challenge.id);
      window.location.assign(`/pegasus/challenges/${challenge.id}`);
    } catch (error) {
      setState(current => ({...current, starting: null, error: error.message}));
    }
  };

  return <section className="peg-wrap peg-page">
    <div className="peg-heading"><div><p className="peg-kicker">MISSION DIRECTORY</p><h1>Challenge</h1></div><div className="peg-view" aria-label="Mode tampilan"><button onClick={() => setView('grid')} aria-label="Tampilan kartu" aria-pressed={view === 'grid'}>▦</button><button onClick={() => setView('list')} aria-label="Tampilan daftar" aria-pressed={view === 'list'}>☷</button></div></div>
    {state.loading && <State/>}
    {state.error && <><State type="error" message={`${state.error} Katalog pratinjau ditampilkan; progres tidak akan disimpan.`}/><button className="peg-button ghost" onClick={load}>Hubungkan ulang API</button></>}
    <div className="peg-panel peg-filters">
      <label>Cari<input name="query" value={filters.query} onChange={update} placeholder="Cari judul…"/></label>
      <label>Kategori<select name="category" value={filters.category} onChange={update}><option value="">Semua kategori</option>{categories.map(([slug, name]) => <option value={slug} key={slug}>{name}</option>)}</select></label>
      <label>Kesulitan<select name="difficulty" value={filters.difficulty} onChange={update}><option value="">Semua level</option>{['easy', 'medium', 'hard', 'expert'].map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Status<select name="status" value={filters.status} onChange={update}><option value="">Semua status</option><option value="not_started">Belum dimulai</option><option value="in_progress">Dikerjakan</option><option value="completed">Selesai</option></select></label>
      <label>Urutkan<select name="sort" value={filters.sort} onChange={update}><option value="progress">Progres</option><option value="points">Poin</option><option value="difficulty">Kesulitan</option></select></label>
    </div>
    <Progress label={`${rows.length} misi tersedia`} value={source.length ? Math.round(source.filter(item => item.status === 'completed').length / source.length * 100) : 0}/>
    <div className={`peg-challenges ${view}`}>{rows.map(item => <article className={`peg-challenge ${item.locked ? 'locked' : ''}`} key={item.id}><header><span>{item.public_id || `#${String(item.id).padStart(3, '0')}`}</span><Difficulty value={item.difficulty}/></header><div><small>{item.category}</small><h2>{item.title}</h2><p>{item.description || item.scenario}</p></div><footer><strong>{item.points} PTS</strong>{item.locked ? <span title="Selesaikan prerequisite">◈ Terkunci</span> : <Link onClick={event => begin(event, item)} to={`/pegasus/challenges/${item.id}`}>{state.starting === item.id ? 'Memulai…' : item.status === 'in_progress' ? 'Lanjutkan' : item.status === 'completed' ? 'Lihat Pembahasan' : 'Mulai Challenge'} →</Link>}</footer></article>)}</div>
    {!state.loading && !rows.length && <State type="empty" message="Tidak ada challenge yang cocok dengan filter."/>}
  </section>;
}
