import { Link } from 'react-router-dom'
import { FiArrowRight, FiBookOpen } from 'react-icons/fi'
import { Card } from '../../../components/PageSection.jsx'

export default function ContinueLearning({ courses = [] }) {
  return (
    <Card className="rounded-3xl p-6 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div><h3 className="text-2xl font-bold heading-text">Continue Learning</h3><p className="mt-1 text-sm muted-text">Pick up where you left off.</p></div>
        <Link to="/app/students" className="inline-flex items-center gap-2 rounded-full bg-(--navy) px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-(--accent) dark:text-(--navy)">All courses <FiArrowRight /></Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {courses.map((course) => {
          const name = course.name || course.title
          const lecturer = course.lecturer || course.teacher
          return (
            <Link key={course.id} to="/app/students" className="interactive-surface rounded-2xl border border-(--surface-border) bg-(--surface) p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#E5BA73]/20 text-[#b8860b]"><FiBookOpen /></span>
                <span className="rounded-full bg-(--surface-muted) px-2.5 py-1 text-xs font-bold muted-text">{course.code || course.category || 'Course'}</span>
              </div>
              <h4 className="mt-4 font-bold heading-text">{name}</h4>
              <p className="mt-1 text-xs muted-text">{lecturer}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold muted-text"><span>Course progress</span><span>{course.progress}%</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-(--surface-muted)"><div className="h-full rounded-full bg-(--accent)" style={{ width: `${course.progress}%` }} /></div>
              <p className="mt-3 text-xs muted-text">Next: {course.nextTask || `${course.modules ?? 0} modules to explore`}</p>
            </Link>
          )
        })}
        {!courses.length && <p className="col-span-full py-8 text-sm muted-text">Your active courses will appear here.</p>}
      </div>
    </Card>
  )
}
