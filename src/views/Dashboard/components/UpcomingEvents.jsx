import { useState } from 'react'
import { FiCalendar, FiClock, FiChevronDown } from 'react-icons/fi'
import { Card } from '../../../components/PageSection.jsx'

const eventColors = ['bg-blue-100 dark:bg-blue-900/40', 'bg-emerald-100 dark:bg-emerald-900/40', 'bg-rose-100 dark:bg-rose-900/40', 'bg-amber-100 dark:bg-amber-900/40']

export default function UpcomingEvents({ events = [] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleEvents = showAll ? events : events.slice(0, 3)
  return (
    <Card className="rounded-3xl p-6 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FiCalendar className="text-xl text-[#D9A94F]" />
          <h3 className="text-2xl font-bold heading-text">Upcoming Events</h3>
        </div>
        {events.length > 3 && <button onClick={() => setShowAll((value) => !value)} className="inline-flex items-center gap-1 text-sm font-semibold accent-text">{showAll ? 'Show less' : 'View calendar'}<FiChevronDown className={showAll ? 'rotate-180' : ''} /></button>}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {visibleEvents.map((event, index) => (
          <article key={event.id} className="rounded-2xl border border-(--surface-border) bg-(--surface-muted) p-4 transition-colors hover:border-(--surface-border-strong)">
            <div className="flex items-start gap-3">
              <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${eventColors[index % eventColors.length]}`} />
              <div className="min-w-0">
                <h4 className="font-bold leading-6 heading-text">{event.Events || event.title}</h4>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm muted-text">
                  <span className="inline-flex items-center gap-2"><FiCalendar />{event.Timeline || event.date}</span>
                  {(event.Time || event.time) && <span className="inline-flex items-center gap-2"><FiClock />{event.Time || event.time}</span>}
                </div>
              </div>
            </div>
          </article>
        ))}
        {!events.length && <p className="col-span-full py-6 text-sm muted-text">No upcoming events are scheduled.</p>}
      </div>
    </Card>
  )
}
