import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiBarChart2, FiCreditCard, FiMessageSquare, FiUpload, FiZap } from 'react-icons/fi'
import { Card } from '../../../components/PageSection.jsx'
const actions = [
  ['Submit Work', 'Upload assignment', '/app/submit-work', FiUpload, 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300'],
  ['View Results', 'Check grades', '/app/view-results', FiBarChart2, 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300'],
  ['Pay Fees', 'Open billing', '/app/finance', FiCreditCard, 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300'],
  ['Ask Lecturer', 'Start discussion', '/app/teachers', FiMessageSquare, 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300'],
]
export default function QuickActions() {
  return (
    <Card className="h-full rounded-3xl p-6 sm:p-7">
      <div className="mb-5 flex items-start justify-between">
        <div><h3 className="text-2xl font-bold heading-text">Quick Actions</h3><p className="mt-1 text-sm muted-text">Frequent student tasks</p></div>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E5BA73]/20 text-xl text-[#b8860b]"><FiZap /></span>
      </div>
      <div className="space-y-3">
        {actions.map(([name, description, to, Icon, colors]) => (
          <Link key={name} to={to} className="interactive-surface flex items-center gap-4 rounded-2xl border border-(--surface-border) bg-(--surface) p-3.5 sm:p-4">
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xl shadow-sm ${colors}`}><Icon /></span>
            <span className="min-w-0 flex-1"><b className="block text-base heading-text">{name}</b><small className="block mt-0.5 text-sm muted-text">{description}</small></span>
            <FiArrowUpRight className="shrink-0 muted-text" />
          </Link>
        ))}
      </div>
    </Card>
  )
}
