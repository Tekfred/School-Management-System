<script setup>
import studentsEnrollment from '@/views/Dashboard/Components/studentsEnrollment.vue';
import quickAction from '@/views/Dashboard/Components/quickAction.vue';
import recentActivity from './Components/recentActivity.vue';
import UpcomingEvents from './Components/UpcomingEvents.vue';
import {
  achievements,
  activeStatus,
  campusFeed,
  courses,
  enrollmentData,
  quickActions,
  recentActivities,
  studentProgress,
  upcomingEvents,
} from './Data';

const getIconStyle = (bgcolor, borderColor) => {
  return {
    backgroundColor: bgcolor,
    color: borderColor.includes('amber') ? '#b8860b' : borderColor.split('-')[1],
  };
};
</script>

<template>
  <div class="min-h-full bg-[#f7f8fc] text-[#181D31] dark:bg-[#0b1120] dark:text-gray-100">
    <section class="px-5 py-6 sm:px-8">
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div class="overflow-hidden rounded-2xl bg-[#181D31] text-white shadow-xl shadow-slate-200/70 dark:shadow-black/20">
          <div class="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(229,186,115,0.22),transparent_38%,rgba(59,130,246,0.16))]"></div>

            <div class="relative space-y-6">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5BA73]">Student portal</p>
                <h2 class="mt-3 text-3xl font-bold sm:text-4xl">Good morning, {{ studentProgress.name }}</h2>
                <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  You have 2 assignments due this week. Your Software Engineering progress is ahead of schedule.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-3">
                <div class="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-300">Level</p>
                  <p class="mt-2 text-3xl font-bold">{{ studentProgress.level }}</p>
                  <p class="text-xs text-slate-300">Computer Science</p>
                </div>
                <div class="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-300">Streak</p>
                  <p class="mt-2 text-3xl font-bold">{{ studentProgress.streak }} days</p>
                  <p class="text-xs text-slate-300">Attendance and study activity</p>
                </div>
                <div class="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-300">Semester</p>
                  <p class="mt-2 text-3xl font-bold">{{ studentProgress.semesterProgress }}%</p>
                  <p class="text-xs text-slate-300">Overall completion</p>
                </div>
              </div>
            </div>

            <div class="relative rounded-2xl border border-white/10 bg-white p-5 text-[#181D31] shadow-2xl dark:bg-[#0f172a] dark:text-white">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">Academic progress</p>
                  <p class="text-3xl font-bold">{{ studentProgress.gpa }}</p>
                </div>
                <span class="material-symbols-outlined rounded-xl bg-[#E5BA73]/20 p-3 text-[#b8860b]">school</span>
              </div>
              <div class="mt-5 space-y-4">
                <div>
                  <div class="mb-2 flex justify-between text-sm font-semibold">
                    <span>Attendance</span>
                    <span>{{ studentProgress.attendance }}%</span>
                  </div>
                  <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div class="progress-fill h-full rounded-full bg-emerald-500" :style="{ width: `${studentProgress.attendance}%` }"></div>
                  </div>
                </div>
                <div>
                  <div class="mb-2 flex justify-between text-sm font-semibold">
                    <span>Assignments</span>
                    <span>{{ studentProgress.assignmentsDone }}/{{ studentProgress.assignmentsTotal }}</span>
                  </div>
                  <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div class="progress-fill h-full rounded-full bg-[#E5BA73]" :style="{ width: `${(studentProgress.assignmentsDone / studentProgress.assignmentsTotal) * 100}%` }"></div>
                  </div>
                </div>
                <div>
                  <div class="mb-2 flex justify-between text-sm font-semibold">
                    <span>Credits</span>
                    <span>{{ studentProgress.creditsEarned }}/{{ studentProgress.creditsTotal }}</span>
                  </div>
                  <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div class="progress-fill h-full rounded-full bg-blue-500" :style="{ width: `${(studentProgress.creditsEarned / studentProgress.creditsTotal) * 100}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <quickAction :actions="quickActions" />
      </div>
    </section>

    <section class="grid grid-cols-1 gap-5 px-5 sm:px-8 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="active in activeStatus"
        :key="active.id"
        :class="`portal-card metric-card border-l-4 ${active.borderColor}`"
        :style="`animation-delay: ${(active.id - 1) * 0.08}s`"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ active.name }}</div>
          <span class="metric-icon material-symbols-outlined rounded-xl p-3 text-2xl" :style="getIconStyle(active.bgcolor, active.borderColor)">{{ active.icon }}</span>
        </div>
        <div class="mt-4 text-3xl font-bold text-[#181D31] dark:text-white">{{ active.value }}</div>
        <div class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{{ active.message }}</div>
      </div>
    </section>

    <section class="grid grid-cols-1 gap-6 px-5 py-6 sm:px-8 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div class="space-y-6">
        <div class="portal-card">
          <div class="mb-5 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-[#181D31] dark:text-white">Continue Learning</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">Pick up where you left off.</p>
            </div>
            <button class="rounded-full bg-[#181D31] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#283252] dark:bg-[#E5BA73] dark:text-[#181D31]">All courses</button>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <article v-for="course in courses" :key="course.id" class="course-card">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ course.code }}</p>
                  <h4 class="mt-1 font-bold text-[#181D31] dark:text-white">{{ course.name }}</h4>
                  <p class="text-sm text-slate-500 dark:text-slate-400">{{ course.lecturer }}</p>
                </div>
                <span class="material-symbols-outlined rounded-xl bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-200">play_arrow</span>
              </div>
              <div class="mt-6">
                <div class="mb-2 flex justify-between text-sm font-semibold">
                  <span>{{ course.nextTask }}</span>
                  <span>{{ course.progress }}%</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div class="progress-fill h-full rounded-full" :style="{ width: `${course.progress}%`, backgroundColor: course.accent }"></div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <studentsEnrollment :enrollment-data="enrollmentData" />

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <recentActivity :activities="recentActivities" />
          <UpcomingEvents :events="upcomingEvents" />
        </div>
      </div>

      <aside class="space-y-6">
        <div class="portal-card gradient-card">
          <div class="mb-5 flex items-center justify-between">
            <h3 class="text-lg font-bold text-white">Achievements</h3>
            <span class="material-symbols-outlined text-[#E5BA73]">emoji_events</span>
          </div>
          <div class="space-y-3">
            <div v-for="achievement in achievements" :key="achievement.id" class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <span class="material-symbols-outlined rounded-lg bg-[#E5BA73]/20 p-2 text-[#b8860b]">{{ achievement.icon }}</span>
              <div>
                <p class="font-semibold text-white">{{ achievement.name }}</p>
                <p class="text-xs text-slate-300">{{ achievement.detail }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="portal-card campus-feed-card ">
          <div class="mb-5 flex items-center justify-between ">
            <h3 class="text-lg font-bold text-[#181D31] dark:text-white ">Campus Feed</h3>
            <span class="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
              <span class="live-dot"></span>
              Live
            </span>
          </div>
          <div class="space-y-4">
            <article v-for="item in campusFeed" :key="item.id" class="border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-800">
              <div class="flex items-center justify-between gap-3">
                <span class="text-xs font-bold uppercase tracking-wider text-[#E5BA73]">{{ item.label }}</span>
                <span class="text-xs text-slate-400">{{ item.time }}</span>
              </div>
              <p class="mt-1 font-semibold leading-5 text-[#181D31] dark:text-white">{{ item.title }}</p>
            </article>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.portal-card,
.course-card {
  animation: riseIn 0.55s ease forwards;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(24, 29, 49, 0.08);
  opacity: 0;
  padding: 1.25rem;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.course-card {
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(255, 255, 255, 0.98));
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.portal-card:hover,
.course-card:hover {
  box-shadow: 0 22px 50px rgba(24, 29, 49, 0.12);
  transform: translateY(-3px);
}

.progress-fill {
  animation: fillBar 0.9s ease both;
  transform-origin: left;
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fillBar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

:global(.dark) .portal-card,
:global(.dark) .course-card {
  background: #0f172a;
  border-color: rgba(51, 65, 85, 0.9);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

:global(html.dark) .metric-card,
:global(.dark) .metric-card {
  background: #0f172a !important;
  background-color: #0f172a !important;
  background-image: none !important;
  border-top-color: rgba(51, 65, 85, 0.9);
  border-right-color: rgba(51, 65, 85, 0.9);
  border-bottom-color: rgba(51, 65, 85, 0.9);
}

:global(html.dark) .metric-card .metric-icon,
:global(.dark) .metric-card .metric-icon {
  background: #111827 !important;
  color: #E5BA73 !important;
  box-shadow: inset 0 0 0 1px rgba(229, 186, 115, 0.18);
}

:global(.dark) .campus-feed-card {
  background: #0f172a !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2) !important;
}

.live-dot {
  animation: liveBlink 1.15s ease-in-out infinite;
  background: #22c55e;
  border-radius: 999px;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  height: 0.45rem;
  width: 0.45rem;
}

@keyframes liveBlink {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);
  }
  50% {
    opacity: 0.45;
    box-shadow: 0 0 0 5px rgba(34, 197, 94, 0);
  }
}

.gradient-card,
:global(.dark) .gradient-card {
  background: linear-gradient(135deg, #181D31, rgba(24, 29, 49, 0.96) 48%, rgba(229, 186, 115, 0.18));
  border: 1px solid rgba(229, 186, 115, 0.16);
  box-shadow: 0 22px 55px rgba(24, 29, 49, 0.22);
}
</style>
