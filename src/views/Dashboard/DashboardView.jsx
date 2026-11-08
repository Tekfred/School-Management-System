import { PageSection } from "../../components/PageSection.jsx";
import IntegrationStatus from "../../components/IntegrationStatus.jsx";
import { useIntegrationResource } from "../../hooks/useIntegrationResource.js";
import { getDashboard } from "../../integrations/api/dashboardApi.js";
import { dashboardMock } from "../../integrations/mocks/dashboardMock.js";
import AcademicMomentum from "./components/AcademicMomentum.jsx";
import AchievementPanel from "./components/AchievementPanel.jsx";
import CampusFeed from "./components/CampusFeed.jsx";
import ContinueLearning from "./components/ContinueLearning.jsx";
import DashboardHero from "./components/DashboardHero.jsx";
import DashboardStatCard from "./components/DashboardStatCard.jsx";
import QuickActions from "./components/QuickActions.jsx";
import RecentActivity from "./components/RecentActivity.jsx";
import UpcomingEvents from "./components/UpcomingEvents.jsx";

export default function DashboardView() {
  const resource = useIntegrationResource({
    mockData: dashboardMock,
    load: getDashboard,
  });
  const data = resource.data || dashboardMock;
  const student = data.studentProgress || dashboardMock.studentProgress;

  return (
    <PageSection
      title="Student Command Center"
      subtitle="Your learning progress and campus activity at a glance."
    >
      <IntegrationStatus loading={resource.loading} error={resource.error} />
      <div className="grid items-stretch grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <DashboardHero student={student} />
        </div>
        <div className="xl:col-span-4">
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-12 xl:grid-cols-4">
          {(data.activeStatus || []).map((item, index) => (
            <DashboardStatCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="xl:col-span-8">
          <ContinueLearning courses={data.courses || []} />
        </div>
        <div className="xl:col-span-4">
          <AchievementPanel achievements={data.achievements || []} />
        </div>

        <div className="xl:col-span-12">
          <AcademicMomentum data={data.enrollmentData || []} />
        </div>
        <div className="xl:col-span-5">
          <CampusFeed
            items={data.campusFeed || []}
            isLive={!resource.isMock && !resource.error}
          />
        </div>

        <div className="xl:col-span-7">
          <UpcomingEvents events={data.upcomingEvents || []} />
        </div>
        <div className="xl:col-span-12">
          <RecentActivity items={data.recentActivities || []} />
        </div>
      </div>
    </PageSection>
  );
}
