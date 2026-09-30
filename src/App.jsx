import { useMemo, useState } from 'react'
import { Bar, Bubble, Doughnut, Line } from 'react-chartjs-2'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
)

const palette = {
  ink: '#14221e',
  muted: '#7b8984',
  grid: '#e7ede9',
  blue: '#5e8fe4',
  green: '#78b95c',
  yellow: '#f7bf3b',
  orange: '#f18b2f',
  violet: '#ad8bcf',
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const tooltip = {
  backgroundColor: '#14221e',
  padding: 12,
  titleFont: { family: 'DM Sans', size: 12, weight: '700' },
  bodyFont: { family: 'DM Sans', size: 12 },
  displayColors: true,
  cornerRadius: 8,
}
const axis = {
  border: { display: false },
  grid: { color: palette.grid, drawTicks: false },
  ticks: { color: palette.muted, font: { family: 'DM Sans', size: 10 }, padding: 8 },
}

function Filter({ label, value, children }) {
  return (
    <label className="filter">
      <span>{label}</span>
      <select value={value} onChange={() => {}} aria-label={label}>
        {children}
      </select>
      <span className="chevron">⌄</span>
    </label>
  )
}

function KpiCard({ eyebrow, value, delta, detail, positive = true, accent }) {
  return (
    <article className="kpi-card" style={{ '--accent': accent }}>
      <div className="kpi-topline">
        <span>{eyebrow}</span>
        <button className="more-button" aria-label={`More options for ${eyebrow}`}>•••</button>
      </div>
      <strong>{value}</strong>
      <div className={`delta ${positive ? 'positive' : 'negative'}`}>
        <span>{positive ? '↗' : '↘'}</span> {delta}
      </div>
      <small>{detail}</small>
    </article>
  )
}

function Panel({ title, note, className = '', children, action = '•••' }) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-header">
        <div>
          <h2>{title}</h2>
          {note && <p>{note}</p>}
        </div>
        <button className="more-button" aria-label={`More options for ${title}`}>{action}</button>
      </header>
      {children}
    </section>
  )
}

function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [period, setPeriod] = useState('Last 30 days')
  const [notice, setNotice] = useState(false)

  const doughnutData = useMemo(() => ({
    labels: ['Organic search', 'Direct', 'Referral'],
    datasets: [{
      data: [68, 21, 11],
      backgroundColor: [palette.green, palette.blue, palette.yellow],
      borderWidth: 0,
      hoverOffset: 8,
    }],
  }), [])

  const lineData = useMemo(() => ({
    labels: months,
    datasets: [
      { label: 'Conversion', data: [3.8, 4.2, 4.6, 4.4, 5.1, 5.3, 5.8, 6.2, 6.1, 6.7, 7.1, 7.8], borderColor: palette.blue, backgroundColor: 'rgba(94,143,228,.12)', fill: true, tension: .4, pointRadius: 0, borderWidth: 2 },
      { label: 'Expansion', data: [5.1, 5.3, 5.6, 5.8, 6.1, 6.7, 7.0, 7.3, 7.6, 8.0, 8.2, 8.7], borderColor: palette.green, backgroundColor: 'rgba(120,185,92,.13)', fill: true, tension: .4, pointRadius: 0, borderWidth: 2 },
      { label: 'Contract', data: [4.3, 3.7, 4.1, 3.6, 4.2, 3.9, 4.4, 4.0, 4.5, 4.2, 4.8, 4.6], borderColor: palette.yellow, backgroundColor: 'rgba(247,191,59,.14)', fill: true, tension: .4, pointRadius: 0, borderWidth: 2 },
    ],
  }), [])

  const bubbleData = useMemo(() => ({
    datasets: [
      { label: 'Australia', data: [{ x: 22, y: 74, r: 27 }], backgroundColor: 'rgba(94,143,228,.55)', borderColor: palette.blue, borderWidth: 1 },
      { label: 'Canada', data: [{ x: 50, y: 61, r: 31 }], backgroundColor: 'rgba(173,139,207,.5)', borderColor: palette.violet, borderWidth: 1 },
      { label: 'Netherlands', data: [{ x: 11, y: 38, r: 10 }], backgroundColor: 'rgba(247,191,59,.6)', borderColor: palette.yellow, borderWidth: 1 },
      { label: 'United Kingdom', data: [{ x: 48, y: 26, r: 11 }], backgroundColor: 'rgba(241,139,47,.58)', borderColor: palette.orange, borderWidth: 1 },
      { label: 'United States', data: [{ x: 76, y: 33, r: 18 }], backgroundColor: 'rgba(94,143,228,.55)', borderColor: palette.blue, borderWidth: 1 },
      { label: 'Germany', data: [{ x: 43, y: 22, r: 8 }], backgroundColor: 'rgba(120,185,92,.7)', borderColor: palette.green, borderWidth: 1 },
      { label: 'Sweden', data: [{ x: 82, y: 16, r: 11 }], backgroundColor: 'rgba(247,191,59,.62)', borderColor: palette.yellow, borderWidth: 1 },
    ],
  }), [])

  const barData = useMemo(() => ({
    labels: ['Jan 01', 'Jan 08', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 05'],
    datasets: [
      { label: 'Cancellation', data: [-1, -2, -1, -2, -2, 0], backgroundColor: palette.blue, borderRadius: 3, stack: 'stack' },
      { label: 'Contraction', data: [7, 6, 7, 8, 7, 4], backgroundColor: palette.orange, borderRadius: 3, stack: 'stack' },
      { label: 'Expansion', data: [5, 9, 5, 4, 3, 1], backgroundColor: palette.yellow, borderRadius: 3, stack: 'stack' },
    ],
  }), [])

  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip },
    scales: { x: { ...axis, grid: { display: false } }, y: { ...axis, min: 0, max: 10, ticks: { ...axis.ticks, callback: (v) => `${v}%` } } },
  }
  const bubbleOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip },
    scales: { x: { ...axis, min: 0, max: 100, title: { display: true, text: 'ARR ($, range)', color: palette.muted, font: { family: 'DM Sans', size: 10 } } }, y: { ...axis, min: 0, max: 100, title: { display: true, text: 'Net revenue retention', color: palette.muted, font: { family: 'DM Sans', size: 10 } } } },
  }
  const barOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip },
    scales: { x: { ...axis, stacked: true, grid: { display: false } }, y: { ...axis, stacked: true, min: -4, max: 16, ticks: { ...axis.ticks, callback: (v) => `$${v}k` } } },
  }
  const doughnutOptions = {
    responsive: true, maintainAspectRatio: false, cutout: '70%',
    plugins: { legend: { display: false }, tooltip },
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">✦</span><span>signal</span></div>
        <div className="workspace-switcher"><span className="workspace-avatar">A</span><span><b>Acme Inc.</b><small>Growth workspace</small></span><span className="switcher-dots">•••</span></div>
        <nav>
          <div className="nav-label">Workspace</div>
          {['Overview', 'Customers', 'Revenue', 'Reports'].map((item, index) => (
            <button key={item} className={`nav-item ${activeNav === item ? 'active' : ''}`} onClick={() => setActiveNav(item)}>
              <span className="nav-icon">{['◈', '♙', '↗', '▤'][index]}</span>{item}
              {item === 'Reports' && <span className="new-badge">NEW</span>}
            </button>
          ))}
          <div className="nav-label nav-label-spaced">Manage</div>
          {['Settings', 'Help center'].map((item, index) => <button key={item} className="nav-item" onClick={() => setNotice(true)}><span className="nav-icon">{index ? '?' : '⚙'}</span>{item}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="upgrade-card"><span className="sparkle">✺</span><b>Make better decisions.</b><p>Unlock deeper insights with Signal Pro.</p><button onClick={() => setNotice(true)}>Explore Pro <span>↗</span></button></div><div className="user-row"><span className="user-avatar">JD</span><span><b>Jamie Davis</b><small>jamie@acme.co</small></span><span className="switcher-dots">•••</span></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{activeNav}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search">⌕</button><button className="icon-button notification" aria-label="Notifications" onClick={() => setNotice(true)}>♢<i /></button><button className="date-button" onClick={() => setNotice(true)}>Updated just now <span>↻</span></button></div></header>
        <div className="content-wrap">
          <section className="page-heading"><div><p className="overline">Monday, February 5, 2024</p><h1>Good morning, Jamie <span>✦</span></h1><p className="heading-copy">Here’s your growth pulse. You’re building momentum in all the right places.</p></div><button className="export-button" onClick={() => setNotice(true)}><span>↓</span> Export report</button></section>
          <div className="filter-row"><Filter label="Date range" value={period}><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></Filter><Filter label="Segment" value="All segments"><option>All segments</option><option>Enterprise</option><option>Self-serve</option></Filter><Filter label="Product" value="All products"><option>All products</option><option>Core platform</option><option>Analytics</option></Filter><span className="filter-status"><i /> Live data</span></div>
          <section className="kpi-grid"><KpiCard eyebrow="New wins" value="230" delta="25%" detail="vs previous 30 days" accent={palette.blue} /><KpiCard eyebrow="Trial win rate" value="9.86%" delta="25%" detail="vs previous 30 days" accent={palette.green} /><KpiCard eyebrow="New MRR" value="$25,690" delta="8.7%" detail="vs previous 30 days" positive={false} accent={palette.orange} /><KpiCard eyebrow="Average new MRR" value="$558.48" delta="33%" detail="vs previous 30 days" accent={palette.violet} /><KpiCard eyebrow="Months to recover CAC" value="0.34" delta="94%" detail="vs previous 30 days" accent={palette.yellow} /></section>
          <section className="charts-grid">
            <Panel title="Page views" note="By acquisition channel" className="donut-panel"><div className="donut-chart"><Doughnut data={doughnutData} options={doughnutOptions} /><div className="donut-center"><strong>84.2k</strong><span>Total views</span></div></div><div className="legend-list">{[['Organic search', palette.green, '68%'], ['Direct', palette.blue, '21%'], ['Referral', palette.yellow, '11%']].map(([name, color, amount]) => <span key={name}><i style={{ background: color }} />{name}<b>{amount}</b></span>)}</div></Panel>
            <Panel title="MRR by country" note="Current customer base" className="bubble-panel"><div className="chart-wrap"><Bubble data={bubbleData} options={bubbleOptions} /></div><div className="mini-legend">{['Australia', 'Canada', 'Netherlands', 'United Kingdom', 'United States'].map((x, i) => <span key={x}><i style={{ background: [palette.blue, palette.violet, palette.yellow, palette.orange, palette.green][i] }} />{x}</span>)}</div></Panel>
            <Panel title="MRR movement" note="Last 30 days" className="bar-panel"><div className="chart-wrap"><Bar data={barData} options={barOptions} /></div><div className="mini-legend">{[['Cancellation', palette.blue], ['Contraction', palette.orange], ['Expansion', palette.yellow]].map(([x, color]) => <span key={x}><i style={{ background: color }} />{x}</span>)}</div></Panel>
            <Panel title="Net MRR by product" note="Monthly trend" className="line-panel"><div className="chart-wrap"><Line data={lineData} options={lineOptions} /></div><div className="mini-legend">{[['Conversion', palette.blue], ['Expansion', palette.green], ['Contraction', palette.yellow]].map(([x, color]) => <span key={x}><i style={{ background: color }} />{x}</span>)}</div></Panel>
          </section>
        </div>
      </main>
      {notice && <button className="toast" onClick={() => setNotice(false)}><span>✓</span> This demo action is ready to connect <b>×</b></button>}
    </div>
  )
}

export default App
