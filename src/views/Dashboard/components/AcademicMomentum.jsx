import { useMemo, useRef, useState } from 'react'
import { FiTrendingUp } from 'react-icons/fi'
import { Card } from '../../../components/PageSection.jsx'
import { useGsap } from '../../../hooks/useGsap.js'

export default function AcademicMomentum({ data = [] }) {
  const [period, setPeriod] = useState('6')
  const chartRef = useRef(null)
  const months = useMemo(() => data.slice(-Number(period)), [data, period])
  const first = months[0]?.students ?? 0
  const last = months.at(-1)?.students ?? 0
  const growth = last - first
  const growthRate = first ? Math.round((growth / first) * 100) : 0
  const average = months.length ? Math.round(months.reduce((total, month) => total + month.students, 0) / months.length) : 0

  useGsap(chartRef, (gsap, chart) => {
    const bars = chart.querySelectorAll('[data-momentum-bar]')
    gsap.fromTo(bars,
      { scaleY: 0.08, autoAlpha: 0.65 },
      { scaleY: 1, autoAlpha: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out', transformOrigin: 'bottom center' },
    )
  }, [months])

  return (
    <Card className="rounded-3xl p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-lg accent-text" />
            <h3 className="text-2xl font-bold heading-text">Academic Momentum</h3>
          </div>
          <p className="mt-1 text-sm muted-text">Monthly study progress trend</p>
        </div>
        <label className="sr-only" htmlFor="momentum-period">Chart time period</label>
        <select id="momentum-period" value={period} onChange={(event) => setPeriod(event.target.value)} className="rounded-xl border border-(--surface-border) bg-(--surface-muted) px-4 py-2.5 text-sm font-semibold body-text outline-none focus:border-(--accent)">
          <option value="3">Last 3 months</option>
          <option value="6">Last 6 months</option>
        </select>
      </div>

      <div ref={chartRef} className="mt-6 grid min-h-64 grid-cols-3 items-end gap-3 rounded-3xl border border-(--surface-border) bg-(--surface-muted) px-4 pb-4 pt-6 sm:grid-cols-6 sm:gap-4 sm:px-6 sm:pb-5">
        {months.map((month) => (
          <div key={month.month} className="flex h-full min-w-0 flex-col items-center justify-end gap-3">
            <div className="flex h-48 w-full items-end overflow-hidden rounded-t-2xl">
              <div
                data-momentum-bar
                className="w-full origin-bottom rounded-t-2xl bg-gradient-to-t from-[#E5BA73] via-[#88765E] to-[#181D31] shadow-sm"
                style={{ height: `${Math.max(18, month.percent)}%` }}
                role="img"
                aria-label={`${month.month}: ${month.percent}% study progress`}
              />
            </div>
            <span className="text-sm font-bold muted-text">{month.month}</span>
          </div>
        ))}
        {!months.length && <p className="col-span-full py-10 text-center text-sm muted-text">No academic progress has been recorded yet.</p>}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <MomentumStat label="Total Growth" value={`${growth}%`} positive />
        <MomentumStat label="Average" value={String(average)} positive />
        <MomentumStat label="Growth Rate" value={`${growthRate}%`} />
      </div>
    </Card>
  )
}

function MomentumStat({ label, value, positive = false }) {
  return (
    <div className="rounded-2xl bg-(--surface-muted) px-4 py-3.5">
      <p className="text-sm muted-text">{label}</p>
      <p className={`mt-1 text-3xl font-extrabold ${positive ? 'text-emerald-500' : 'text-[#E5BA73]'}`}>{value}</p>
    </div>
  )
}
