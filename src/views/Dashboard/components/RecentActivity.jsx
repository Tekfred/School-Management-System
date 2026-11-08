import { Card, SectionTitle } from '../../../components/PageSection.jsx'
export default function RecentActivity({ items = [] }) {
  return <Card><SectionTitle>Recent Activity</SectionTitle><div className="divide-y divide-(--surface-border)">{items.slice(0, 5).map((item) => <div key={item.id} className="flex items-center gap-3 py-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-(--surface-muted) text-sm font-bold accent-text">{item.iconText}</span><p className="flex-1 text-sm body-text"><b>{item.BoldText}</b>{item.messages}<b>{item.BoldText2}</b></p><span className="shrink-0 text-xs muted-text">{item.TimeRanges}</span></div>)}{!items.length && <p className="py-5 text-sm muted-text">Recent academic activity will appear here.</p>}</div></Card>
}
