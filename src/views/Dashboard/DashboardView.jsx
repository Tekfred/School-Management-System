import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCalendar,
  FiCreditCard,
  FiUpload,
  FiBarChart2,
  FiUsers,
} from "react-icons/fi";
import {
  PageSection,
  Card,
  Metric,
  SectionTitle,
} from "../../components/PageSection.jsx";
import IntegrationStatus from "../../components/IntegrationStatus.jsx";
import { useIntegrationResource } from "../../hooks/useIntegrationResource.js";
import { getDashboard } from "../../integrations/api/dashboardApi.js";
import { dashboardMock } from "../../integrations/mocks/dashboardMock.js";
const actions = [
  ["Submit Work", "Upload assignment", "/app/submit-work", FiUpload],
  ["View Results", "Check grades", "/app/view-results", FiBarChart2],
  ["Pay Fees", "Open billing", "/app/finance", FiCreditCard],
  ["Courses", "Continue learning", "/app/students", FiBookOpen],
];
export default function DashboardView() {
  const resource = useIntegrationResource({
    mockData: dashboardMock,
    load: getDashboard,
  });
  const data = resource.data || dashboardMock;
  const profile = data.studentProgress || {
    name: "Student",
    level: "—",
    streak: 0,
    semesterProgress: 0,
    gpa: "—",
  };
  return (
    <PageSection
      title="Student Command Center"
      subtitle="Your learning progress and campus activity at a glance."
    >
      <IntegrationStatus loading={resource.loading} error={resource.error} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div data-animate="hero" className="overflow-hidden rounded-2xl bg-[#181D31] text-white shadow-xl">
            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#E5BA73]">
                Student portal
              </p>
              <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
                Good morning, {profile.name || "Audi"}{" "}
              </h3>
              <p className="max-w-2xl mt-3 text-sm text-slate-300">
                You have 2 assignments due this week. Your Software Engineering
                progress is ahead of schedule.
              </p>
              <div className="grid gap-3 mt-7 sm:grid-cols-3">
                {[
                  ["Level", profile.level, "Computer Science"],
                  [
                    "Streak",
                    `${profile.streak} days`,
                    "Attendance and study activity",
                  ],
                  [
                    "Semester",
                    `${profile.semesterProgress}%`,
                    "Overall completion",
                  ],
                ].map(([a, b, c]) => (
                  <div
                    key={a}
                    className="p-4 border rounded-xl border-white/10 bg-white/10"
                  >
                    <p className="text-xs uppercase text-slate-300">{a}</p>
                    <p className="mt-2 text-3xl font-bold">{b}</p>
                    <p className="text-xs text-slate-300">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {(data.activeStatus || []).map((x) => (
              <Metric
                key={x.id}
                label={x.name}
                value={x.value}
                detail={x.message}
              />
            ))}
          </div>
          <Card>
            <SectionTitle>Quick Actions</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              {actions.map(([name, description, to, Icon]) => (
                <Link
                  key={name}
                  to={to}
                  className="interactive-surface flex items-center gap-4 rounded-2xl border border-(--surface-border) p-4"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#E5BA73]/20 text-[#b8860b]">
                    <Icon />
                  </span>
                  <span className="flex-1">
                    <b className="block heading-text">{name}</b>
                    <small className="muted-text">{description}</small>
                  </span>
                  <FiArrowUpRight />
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <SectionTitle>Recent Activity</SectionTitle>
            <div className="divide-y divide-(--surface-border)">
              {(data.recentActivities || []).slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--surface-muted) text-sm font-bold accent-text">
                    {item.iconText}
                  </span>
                  <p className="flex-1 text-sm body-text">
                    <b>{item.BoldText}</b>
                    {item.messages}
                    <b>{item.BoldText2}</b>
                  </p>
                  <span className="text-xs muted-text">{item.TimeRanges}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <aside className="space-y-6">
          <Card>
            <SectionTitle>Upcoming Events</SectionTitle>
            <div className="space-y-4">
              {(data.upcomingEvents || []).slice(0, 5).map((event, i) => (
                <div key={event.id || i} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E5BA73]/20 text-[#b8860b]">
                    <FiCalendar />
                  </span>
                  <div>
                    <b className="block text-sm heading-text">
                      {event.title || event.name}
                    </b>
                    <span className="text-xs muted-text">
                      {event.date || event.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="bg-[#181D31] text-white">
            <FiUsers className="text-2xl text-[#E5BA73]" />
            <h3 className="mt-3 text-lg font-bold">Stay on track</h3>
            <p className="mt-2 text-sm text-slate-300">
              Check upcoming fees and deadlines before they are due.
            </p>
            <Link
              to="/app/finance"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#E5BA73]"
            >
              Fees & payments <FiArrowUpRight />
            </Link>
          </Card>
        </aside>
      </div>
    </PageSection>
  );
}
