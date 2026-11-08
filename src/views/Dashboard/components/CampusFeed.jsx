import { FiRadio } from 'react-icons/fi'
import { Card } from '../../../components/PageSection.jsx'

export default function CampusFeed({ items = [], isLive = false }) {
  return (
    <Card className="h-full rounded-3xl p-6 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-2xl font-bold heading-text">Campus Feed</h3>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${isLive ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300' : 'bg-(--surface-muted) muted-text'}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${isLive ? 'animate-pulse bg-emerald-400' : 'bg-slate-400'}`} />
          {isLive ? 'Live' : 'Preview'}
        </span>
      </div>
      <div className="divide-y divide-(--surface-border)">
        {items.map((item) => (
          <article key={item.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#D9A94F]">{item.label}</span>
              <span className="shrink-0 text-xs muted-text">{item.time}</span>
            </div>
            <h4 className="mt-2 text-base font-bold leading-6 heading-text sm:text-lg">{item.title}</h4>
          </article>
        ))}
        {!items.length && <p className="py-6 text-sm muted-text">There are no campus updates right now.</p>}
      </div>
      {isLive && <p className="mt-4 flex items-center gap-2 text-xs muted-text"><FiRadio className="text-emerald-500" /> Updates are coming from your campus feed.</p>}
    </Card>
  )
}
