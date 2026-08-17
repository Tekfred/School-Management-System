<script setup>
import { ref, onMounted } from 'vue'
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

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from('.metrics-grid > *', {
        y: 10, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out',
      })
      gsap.from('.dashboard-section', {
        y: 14, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2,
      })
    }
  } catch (e) {}
})</script>

<template>
  <div class="min-h-full text-(--heading) dark:bg-(--app-bg) dark:text-(--body-text)">
    <section class="dashboard-section px-4 py-5 sm:px-6 lg:px-8">
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div class="overflow-hidden rounded-2xl bg-[#181D31] text-white shadow-xl shadow-slate-200/70 dark:shadow-black/20">
          <div class="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(229,186,115,0.22),transparent_38%,rgba(59,130,246,0.16))]"></div>

            <div class="relative space-y-6">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5BA73]">Student portal</p>
                <h2 class="mt-3 text-3xl font-bold sm:text-4xl">Good morning, {{ studentProgress.name }}</h2>
                <p class="max-w-2xl mt-3 text-sm leading-6 text-slate-300">
                  You have 2 assignments due this week. Your Software Engineering progress is ahead of schedule.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-3">
                <div class="p-4 border rounded-xl border-white/10 bg-white/10 backdrop-blur">
                  <p class="text-xs font-semibold tracking-wider uppercase text-slate-300">Level</p>
                  <p class="mt-2 text-3xl font-bold">{{ studentProgress.level }}</p>
                  <p class="text-xs text-slate-300">Computer Science</p>
                </div>
                <div class="p-4 border rounded-xl border-white/10 bg-white/10 backdrop-blur">
                  <p class="text-xs font-semibold tracking-wider uppercase text-slate-300">Streak</p>
                  <p class="mt-2 text-3xl font-bold">{{ studentProgress.streak }} days</p>
                  <p class="text-xs text-slate-300">Attendance and study activity</p>
                </div>
                <div class="p-4 border rounded-xl border-white/10 bg-white/10 backdrop-blur">
                  <p class="text-xs font-semibold tracking-wider uppercase text-slate-300">Semester</p>
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
                  <div class="flex justify-between mb-2 text-sm font-semibold">
                    <span>Attendance</span>
                    <span>{{ studentProgress.attendance }}%</span>
                  </div>
                  <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div class="h-full rounded-full progress-fill bg-emerald-500" :style="{ width: `${studentProgress.attendance}%` }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-2 text-sm font-semibold">
                    <span>Assignments</span>
                    <span>{{ studentProgress.assignmentsDone }}/{{ studentProgress.assignmentsTotal }}</span>
                  </div>
                  <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div class="progress-fill h-full rounded-full bg-[#E5BA73]" :style="{ width: `${(studentProgress.assignmentsDone / studentProgress.assignmentsTotal) * 100}%` }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-2 text-sm font-semibold">
                    <span>Credits</span>
                    <span>{{ studentProgress.creditsEarned }}/{{ studentProgress.creditsTotal }}</span>
                  </div>
                  <div class="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div class="h-full bg-blue-500 rounded-full progress-fill" :style="{ width: `${(studentProgress.creditsEarned / studentProgress.creditsTotal) * 100}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <quickAction :actions="quickActions" />
      </div>
    </section>

    <section ref="gridRef" class="metrics-grid dashboard-section grid grid-cols-1 gap-5 px-4 sm:px-6 lg:px-8 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="active in activeStatus"
        :key="active.id"
        class="interactive-surface surface-card rounded-2xl p-5 transition-all duration-200"
        :style="`animation-delay: ${(active.id - 1) * 0.08}s`"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider muted-text">{{ active.name }}</p>
            <p class="mt-2 text-2xl font-black heading-text">{{ active.value }}</p>
            <p class="mt-1 text-xs muted-text">{{ active.message }}</p>
          </div>
          <span class="p-3 text-2xl material-symbols-outlined rounded-xl" :style="getIconStyle(active.bgcolor, active.borderColor)">{{ active.icon }}</span>
        </div>
      </div>
    </section>

    <section class="dashboard-section grid grid-cols-1 gap-6 px-4 py-5 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div class="space-y-6">
        <div class="surface-card rounded-3xl p-6">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h3 class="text-lg font-bold heading-text">Continue Learning</h3>
              <p class="text-sm muted-text">Pick up where you left off.</p>
            </div>
            <button class="rounded-full primary-action px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">All courses</button>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <article v-for="course in courses" :key="course.id" class="surface-panel rounded-2xl p-5 interactive-surface">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-bold tracking-wider uppercase muted-text">{{ course.code }}</p>
                  <h4 class="mt-1 font-bold heading-text">{{ course.name }}</h4>
                  <p class="text-sm muted-text">{{ course.lecturer }}</p>
                </div>
                <span class="p-2 material-symbols-outlined rounded-xl bg-(--surface-muted) text-(--accent)">play_arrow</span>
              </div>
              <div class="mt-6">
                <div class="flex justify-between mb-2 text-sm font-semibold">
                  <span class="muted-text">{{ course.nextTask }}</span>
                  <span class="body-text">{{ course.progress }}%</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-(--surface-border)">
                  <div class="h-full rounded-full" :style="{ width: `${course.progress}%`, backgroundColor: course.accent }"></div>
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
        <div class="surface-card rounded-3xl p-6" style="background: linear-gradient(135deg, var(--navy), rgba(24, 29, 49, 0.96) 48%, rgba(229, 186, 115, 0.18))">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-lg font-bold text-white">Achievements</h3>
            <span class="material-symbols-outlined text-(--accent)">emoji_events</span>
          </div>
          <div class="space-y-3">
            <div v-for="achievement in achievements" :key="achievement.id" class="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/10 backdrop-blur">
              <span class="material-symbols-outlined rounded-lg bg-(--accent)/20 p-2 text-(--accent)">{{ achievement.icon }}</span>
              <div>
                <p class="font-semibold text-white">{{ achievement.name }}</p>
                <p class="text-xs text-slate-300">{{ achievement.detail }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="surface-card rounded-3xl p-6">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-lg font-bold heading-text">Campus Feed</h3>
            <span class="flex items-center gap-2 px-3 py-1 text-xs font-bold text-blue-600 rounded-full bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300">
              <span class="live-dot"></span>
              Live
            </span>
          </div>
          <div class="space-y-4">
            <article v-for="item in campusFeed" :key="item.id" class="pb-4 border-b border-(--surface-border) last:border-0 last:pb-0">
              <div class="flex items-center justify-between gap-3">
                <span class="text-xs font-bold uppercase tracking-wider text-(--accent)">{{ item.label }}</span>
                <span class="text-xs muted-text">{{ item.time }}</span>
              </div>
              <p class="mt-1 font-semibold heading-text">{{ item.title }}</p>
            </article>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.progress-fill {
  animation: fillBar 0.9s ease both;
  transform-origin: left;
}

@keyframes fillBar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
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
</style>
