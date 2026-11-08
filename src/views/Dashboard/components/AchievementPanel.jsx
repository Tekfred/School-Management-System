import { FiAward, FiCheckCircle, FiZap, FiTarget } from 'react-icons/fi'
const iconByName = { verified: FiAward, military_tech: FiTarget, task_alt: FiCheckCircle, bolt: FiZap }

export default function AchievementPanel({ achievements = [] }) {
  return (
    <section data-animate="card" className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#181D31] p-6 text-white shadow-xl shadow-slate-300/30 dark:shadow-black/20 sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(229,186,115,.28),transparent_44%)]" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Achievements</h3>
          <FiAward className="text-2xl text-[#E5BA73]" />
        </div>
        <div className="space-y-3">
          {achievements.map((achievement) => {
            const Icon = iconByName[achievement.icon] || FiAward
            return (
              <article key={achievement.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-colors hover:bg-white/15">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#E5BA73]/15 text-2xl text-[#E5BA73]"><Icon /></span>
                <span className="min-w-0">
                  <b className="block text-base font-bold sm:text-lg">{achievement.name}</b>
                  <span className="mt-0.5 block text-sm text-slate-300">{achievement.detail}</span>
                </span>
              </article>
            )
          })}
          {!achievements.length && <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Your achievements will appear here as you make progress.</p>}
        </div>
      </div>
    </section>
  )
}
