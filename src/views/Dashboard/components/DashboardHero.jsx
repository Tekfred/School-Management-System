import { FiAward, FiBookOpen } from 'react-icons/fi'
import { Card } from '../../../components/PageSection.jsx'

export default function DashboardHero({ student }) {
  const assignmentCount = student.assignmentsDone ?? student.assignmentsCompleted ?? 0
  const assignmentTotal = student.assignmentsTotal ?? 0
  const credits = student.creditsEarned ?? 0
  const creditsTotal = student.creditsTotal ?? student.creditsRequired ?? 120
  const progressRows = [
    { label: 'Attendance', value: `${student.attendance ?? 0}%`, percent: student.attendance ?? 0, color: '#10B981' },
    { label: 'Assignments', value: `${assignmentCount}/${assignmentTotal}`, percent: assignmentTotal ? assignmentCount / assignmentTotal * 100 : 0, color: '#E5BA73' },
    { label: 'Credits', value: `${credits}/${creditsTotal}`, percent: creditsTotal ? credits / creditsTotal * 100 : 0, color: '#3B82F6' },
  ]

  return (
    <section data-animate="hero" className="overflow-hidden rounded-3xl bg-[#181D31] text-white shadow-xl shadow-slate-300/40 dark:shadow-black/20">
      <div className="relative grid gap-7 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,.95fr)] lg:items-stretch">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(229,186,115,.2),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(59,130,246,.12),transparent_34%)]" />
        <div className="relative flex flex-col justify-between gap-7">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-[#E5BA73]">Student portal</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Good morning, {student.name || 'Audi'}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Keep your momentum going. You have 2 assignments due this week and your Software Engineering progress is ahead of schedule.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Level" value={student.level ?? '5'} caption="Computer Science" />
            <SummaryTile label="Streak" value={`${student.streak ?? 0} days`} caption="Attendance and study activity" />
            <SummaryTile label="Semester" value={`${student.semesterProgress ?? 0}%`} caption="Overall completion" />
          </div>
        </div>

        <Card className="relative border-white/70 bg-white p-5 text-[#181D31] shadow-none dark:border-white/10 dark:bg-[#111827] dark:text-white sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-500 dark:text-slate-400">Academic progress</p>
              <p className="mt-1 text-5xl font-bold leading-none heading-text">{Number(student.gpa ?? 3.45).toFixed(2)}</p>
              <p className="mt-2 text-xs muted-text">Current GPA</p>
            </div>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#E5BA73]/20 text-2xl text-[#b8860b]"><FiAward /></span>
          </div>
          <div className="mt-6 space-y-5">
            {progressRows.map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold heading-text">
                  <span>{row.label}</span><span>{row.value}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.min(row.percent, 100)}%`, backgroundColor: row.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <FiBookOpen className="text-[#b8860b]" /> Progress updates as you complete coursework
          </div>
        </Card>
      </div>
    </section>
  )
}

function SummaryTile({ label, value, caption }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-300">{caption}</p>
    </div>
  )
}
