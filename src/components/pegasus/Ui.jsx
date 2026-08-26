export function Metric({label,value,sub}){return <div className="peg-panel"><span className="peg-label">{label}</span><strong className="peg-metric">{value}</strong>{sub&&<small>{sub}</small>}</div>}
export function Progress({value,label}){return <div><div className="peg-progress-label"><span>{label}</span><span>{value}%</span></div><div className="peg-progress"><i style={{width:`${value}%`}}/></div></div>}
export function State({type='loading',message}){return <div className={`peg-state ${type}`} role="status">{message||'Memuat data aman…'}</div>}
export function Difficulty({value}){return <span className={`peg-difficulty ${value}`}>{value==='expert'?'BOSS':value}</span>}
