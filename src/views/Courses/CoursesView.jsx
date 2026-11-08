import { useMemo, useState } from "react";
import { FiBookOpen, FiSearch, FiPlayCircle } from "react-icons/fi";
import { coursesMock as courses } from "../../integrations/mocks/coursesMock.js";
import { PageSection, Card, Metric } from "../../components/PageSection.jsx";
import IntegrationStatus from "../../components/IntegrationStatus.jsx";
import { useIntegrationResource } from "../../hooks/useIntegrationResource.js";
import { getCourses } from "../../integrations/api/coursesApi.js";
export default function CoursesView() {
  const resource = useIntegrationResource({
    mockData: courses,
    load: getCourses,
  });
  const courseList = resource.data || courses;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(courseList.map((c) => c.category))];
  const visible = useMemo(
    () =>
      courseList.filter(
        (c) =>
          (category === "All" || c.category === category) &&
          c.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query, courseList],
  );
  return (
    <PageSection
      title="Courses"
      subtitle="Explore your active courses and track your learning progress."
    >
      <IntegrationStatus loading={resource.loading} error={resource.error} />
      <div className="grid gap-4 mb-6 sm:grid-cols-3">
        <Metric label="Enrolled courses" value={courseList.length} />
        <Metric
          label="Learning modules"
          value={courseList.reduce((n, c) => n + c.modules, 0)}
        />
        <Metric
          label="Average progress"
          value={`${Math.round(courseList.reduce((n, c) => n + c.progress, 0) / (courseList.length || 1))}%`}
        />
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <label className="relative flex-1 min-w-52">
            <FiSearch className="absolute -translate-y-1/2 left-3 top-1/2 muted-text" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-xl border border-(--surface-border) bg-(--surface-muted) py-2 pl-10 pr-3 text-sm"
            />
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-(--surface-border) bg-(--surface-muted) px-4 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((c) => (
            <article
              key={c.id}
              className="interactive-surface overflow-hidden rounded-2xl border border-(--surface-border) bg-(--surface)"
            >
              <div className="flex items-center justify-between bg-[#181D31] p-5 text-white">
                <FiBookOpen className="text-2xl text-[#E5BA73]" />
                <span className="px-3 py-1 text-xs rounded-full bg-white/10">
                  {c.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold heading-text">{c.title}</h3>
                <p className="mt-1 text-sm muted-text">
                  Instructor: {c.teacher}
                </p>
                <div className="flex justify-between mt-4 text-xs muted-text">
                  <span>{c.modules} modules</span>
                  <span>{c.progress}% complete</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-(--surface-muted)">
                  <div
                    className="h-full rounded-full bg-(--accent)"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-xs muted-text">
                    {c.students} students
                  </span>
                  <button className="flex items-center gap-2 rounded-xl bg-[#181D31] px-3 py-2 text-xs font-bold text-white">
                    <FiPlayCircle /> Continue
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!visible.length && (
          <p className="py-12 text-center muted-text">
            No courses match that search.
          </p>
        )}
      </Card>
    </PageSection>
  );
}
