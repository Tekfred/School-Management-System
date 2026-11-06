import { FiSearch, FiStar, FiBookOpen, FiClock } from "react-icons/fi";
import { lecturersMock as lecturers } from "../../integrations/mocks/lecturersMock.js";
import {
  PageSection,
  Card,
  Metric,
  SectionTitle,
} from "../../components/PageSection.jsx";
import IntegrationStatus from "../../components/IntegrationStatus.jsx";
import { useIntegrationResource } from "../../hooks/useIntegrationResource.js";
import { getLecturers } from "../../integrations/api/lecturersApi.js";
export default function LecturersView() {
  const resource = useIntegrationResource({
    mockData: lecturers,
    load: getLecturers,
  });
  const data = resource.data || lecturers;
  return (
    <PageSection
      title="Lecturers"
      subtitle="Connect with your teaching team and explore availability."
    >
      <IntegrationStatus loading={resource.loading} error={resource.error} />
      <div className="grid gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-4">
        {(data.stats || []).map((s) => (
          <Metric key={s.id} label={s.title} value={s.value} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <div className="flex items-center justify-between mb-5">
            <SectionTitle>Lecturer Directory</SectionTitle>
            <label className="relative">
              <FiSearch className="absolute -translate-y-1/2 left-3 top-1/2 muted-text" />
              <input
                className="w-48 rounded-xl border border-(--surface-border) bg-(--surface-muted) py-2 pl-9 pr-3 text-sm"
                placeholder="Search lecturers"
              />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {(data.list || []).map((l) => (
              <div
                key={l.id}
                className="flex gap-4 rounded-2xl border border-(--surface-border) p-4"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#181D31] text-lg font-bold text-[#E5BA73]">
                  {l.name.split(" ").slice(-1)[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold heading-text">{l.name}</h3>
                      <p className="text-xs muted-text">{l.department}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] ${l.status === "Available" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {l.status}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs muted-text">
                    <span className="flex items-center gap-1">
                      <FiBookOpen />
                      {l.courses} courses
                    </span>
                    <span className="flex items-center gap-1">
                      <FiStar className="text-amber-500" />
                      {l.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <SectionTitle>Top Performers</SectionTitle>
            {(data.top || []).map((x, i) => (
              <div
                key={x.id}
                className="flex items-center justify-between border-b border-(--surface-border) py-3 last:border-0"
              >
                <span className="text-sm font-semibold body-text">
                  {i + 1}. {x.name}
                </span>
                <b className="text-sm accent-text">{x.score}%</b>
              </div>
            ))}
          </Card>
          <Card>
            <SectionTitle>Upcoming Lectures</SectionTitle>
            {(data.upcoming || []).map((x) => (
              <div
                key={x.id}
                className="flex gap-3 border-b border-(--surface-border) py-3 last:border-0"
              >
                <FiClock className="mt-1 accent-text" />
                <div>
                  <b className="block text-sm heading-text">{x.title}</b>
                  <span className="text-xs muted-text">
                    {x.lecturer} · {x.time}
                  </span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </PageSection>
  );
}
