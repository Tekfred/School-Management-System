<script setup>
import LecturerStats from './Components/LecturerStats.vue'
import LecturerDirectory from './Components/LecturerDirectory.vue'
import TopPerformers from './Components/TopPerformers.vue'
import TeachingLoad from './Components/TeachingLoad.vue'
import UpcomingLectures from './Components/UpcomingLectures.vue'
import LecturerAvailability from './Components/LecturerAvailability.vue'
import { lecturers } from './Data'
</script>

<template>
  <div class="min-h-full p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Lecturer Overview</h1>
    </header>

    <LecturerStats :stats="lecturers.stats" />

    <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <LecturerDirectory :items="lecturers.list" />
      </div>
      <aside class="space-y-6">
        <TopPerformers :items="lecturers.top" />
        <TeachingLoad :data="lecturers.load" />
      </aside>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <UpcomingLectures :items="lecturers.upcoming" />
      <LecturerAvailability :items="lecturers.availability" />
    </div>
  </div>
</template>

<style scoped>
/* Layout left intentionally minimal; components carry visuals */
</style>