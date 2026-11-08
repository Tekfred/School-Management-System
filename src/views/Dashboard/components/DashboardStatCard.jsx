import { FiAward, FiCheckSquare, FiClipboard, FiTrendingUp } from 'react-icons/fi'
import { Card } from '../../../components/PageSection.jsx'
const icons = [FiTrendingUp, FiCheckSquare, FiClipboard, FiAward]
const iconStyles = [
  'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300',
  'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300',
  'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300',
  'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300',
]
export default function DashboardStatCard({ item, index }) {
  const Icon = icons[index % icons.length]
  return (
    <Card className="flex min-h-40 items-center justify-between gap-3 rounded-2xl p-5">
      <div className="min-w-0">
        <p className="text-sm font-bold uppercase tracking-wide muted-text">{item.name}</p>
        <p className="mt-3 text-3xl font-extrabold heading-text">{item.value}</p>
        <p className="mt-1 text-sm muted-text">{item.message}</p>
      </div>
      <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl ${iconStyles[index % iconStyles.length]}`}><Icon /></span>
    </Card>
  )
}
