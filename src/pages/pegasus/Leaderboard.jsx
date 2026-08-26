import {useEffect, useState} from 'react';
import {State} from '../../components/pegasus/Ui';
import {getLeaderboard} from '../../services/pegasusApi';

const demoPlayers = [
  {name: 'N0vaByte', points: 12480, completed: 87, first_bloods: 9},
  {name: 'CipherWing', points: 11930, completed: 82, first_bloods: 7},
  {name: 'RootRanger', points: 10840, completed: 78, first_bloods: 6},
];

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [state, setState] = useState({loading: true, error: ''});

  const load = () => {
    setState({loading: true, error: ''});
    getLeaderboard().then(setPlayers).then(() => setState({loading: false, error: ''}))
      .catch(error => setState({loading: false, error: error.message}));
  };
  useEffect(load, []);

  const rows = players.length ? players : (state.error ? demoPlayers : []);
  return <section className="peg-wrap peg-page">
    <p className="peg-kicker">HALL OF OPERATORS</p><h1>Leaderboard</h1>
    <p>Skor dihitung backend dari event immutable; browser hanya menampilkan hasil.</p>
    {state.loading && <State/>}
    {state.error && <State type="error" message={`${state.error} Menampilkan data pratinjau.`}/>}
    {state.error && <button className="peg-button ghost" onClick={load}>Coba lagi</button>}
    {!state.loading && !rows.length && <State type="empty" message="Belum ada operator yang memperoleh skor."/>}
    {!!rows.length && <>
      <div className="peg-podium">{rows.slice(0, 3).map((player, index) => <article key={player.id || player.name}><b>#{index + 1}</b><div className="peg-avatar">{player.name[0]}</div><h2>{player.name}</h2><strong>{Number(player.points).toLocaleString('id-ID')} PTS</strong><small>{player.completed} selesai</small></article>)}</div>
      <div className="peg-table" role="table"><div role="row" className="head"><span>RANK</span><span>OPERATOR</span><span>POIN</span><span>SELESAI</span><span>FIRST BLOOD</span><span>LEVEL</span></div>{rows.map((player, index) => <div role="row" key={player.id || player.name}><b>#{index + 1}</b><strong>{player.name}</strong><span>{Number(player.points).toLocaleString('id-ID')}</span><span>{player.completed}</span><span>{player.first_bloods}</span><span>{Math.floor(Math.sqrt(Number(player.points) / 100)) + 1}</span></div>)}</div>
    </>}
  </section>;
}
