<script setup>
import { courses } from '@/views/Dashboard/Data';
</script>

<template>
  <div class="min-h-full p-6">
    <!-- HEADER -->
    <header class="mb-6">
      <p class="text-sm uppercase tracking-wider text-slate-400">Learning Hub</p>
      <h1 class="text-3xl font-bold">Discover, manage and track academic journeys.</h1>
    </header>

    <!-- HERO BANNER -->
    <section class="portal-card mb-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold">🎓 Learning Hub</h2>
          <p class="text-sm text-slate-500">Explore knowledge across every department.</p>
        </div>
        <div class="mt-4 flex gap-4 sm:mt-0">
          <div class="rounded-xl border border-slate-200 p-4 text-center">
            <p class="text-sm text-slate-500">Active Courses</p>
            <p class="text-xl font-bold">42</p>
          </div>
          <div class="rounded-xl border border-slate-200 p-4 text-center">
            <p class="text-sm text-slate-500">Students Enrolled</p>
            <p class="text-xl font-bold">1250</p>
          </div>
          <div class="rounded-xl border border-slate-200 p-4 text-center">
            <p class="text-sm text-slate-500">Completion Rate</p>
            <p class="text-xl font-bold">94%</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SEARCH + FILTERS -->
    <section class="mb-6">
      <div class="flex items-center gap-4">
        <input placeholder="Search courses, assignments, lecturers..." class="flex-1 rounded-lg border p-3" />
        <button class="rounded-lg border px-4 py-3">Filters</button>
      </div>
    </section>

    <!-- FEATURED COURSE -->
    <section class="portal-card mb-6">
      <h3 class="text-lg font-bold mb-2">Featured Course</h3>
      <div class="rounded-lg border p-4">
        <h4 class="font-bold">Course Title Placeholder</h4>
        <p class="text-sm text-slate-500">Short description of the featured course.</p>
      </div>
    </section>

    <!-- COURSE GRID -->
    <section class="portal-card mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">Course Grid</h3>
        <button class="rounded-full bg-[#181D31] px-4 py-2 text-sm font-semibold text-white">All courses</button>
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
    </section>

    <!-- RECENTLY ACCESSED -->
    <section class="portal-card">
      <h3 class="text-lg font-bold mb-2">Recently Accessed</h3>
      <p class="text-sm text-slate-500">No recently accessed courses.</p>
    </section>
  </div>
</template>

<style scoped>
.portal-card,
.course-card {
  animation: riseIn 0.55s ease forwards;
  border-radius: 16px;
  opacity: 0;
  padding: 1.25rem;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

/* Make outer portal containers transparent (remove white long cards) */
.portal-card {
  background: transparent;
  box-shadow: none;
  border: none;
}

/* Inner course cards keep card look */
.course-card {
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(255, 255, 255, 0.98));
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 16px 40px rgba(24, 29, 49, 0.08);
  padding: 1rem;
}

/* Dark mode for course cards */
:global(.dark) .course-card {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.95));
  border: 1px solid rgba(51, 65, 85, 0.9);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  color: #e5e7eb;
}

/* Hover only on course cards (outer portal containers don't hover) */
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
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* small responsive tweaks */
@media (max-width: 640px) {
  .portal-card { padding: 1rem; }
  .course-card { padding: 0.9rem; }
}
</style>