<script setup>
import { ref, onMounted } from 'vue'
import LecturerStats from './Components/LecturerStats.vue'
import LecturerDirectory from './Components/LecturerDirectory.vue'
import TopPerformers from './Components/TopPerformers.vue'
import TeachingLoad from './Components/TeachingLoad.vue'
import UpcomingLectures from './Components/UpcomingLectures.vue'
import LecturerAvailability from './Components/LecturerAvailability.vue'
import { lecturers } from './Data'

const root = ref(null)
onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from(root.value, { y: 10, opacity: 0, duration: 0.5, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="min-h-full p-4 md:p-6 space-y-5 md:space-y-6">

    <!-- Page Header -->
    <header class="pt-4 pb-2">
      <p class="text-xs font-bold tracking-widest uppercase text-(--accent) mb-1">
        FACULTY OVERVIEW
      </p>
      <h1 class="mb-1 text-3xl font-extrabold tracking-tight heading-text" style="font-family: 'Cormorant Garamond', Georgia, serif">
        Lecturer Command Centre
      </h1>
      <p class="text-sm muted-text">
        Track performance, availability and teaching load across all departments.
      </p>
    </header>

    <!-- Stats Row -->
    <LecturerStats :stats="lecturers.stats" />

    <!-- Main Grid -->
    <div class="grid gap-6 lg:grid-cols-[1fr_340px]">
      <LecturerDirectory :items="lecturers.list" />
      <aside class="flex flex-col gap-6">
        <TopPerformers :items="lecturers.top" />
        <TeachingLoad :data="lecturers.load" />
      </aside>
    </div>

    <!-- Bottom Grid -->
    <div class="grid gap-6 lg:grid-cols-2">
      <UpcomingLectures :items="lecturers.upcoming" />
      <LecturerAvailability :items="lecturers.availability" />
    </div>

  </div>
</template>