<script setup>
import CourseHero from '@/components/Courses/CourseHero.vue'
import CourseFilter from '@/components/Courses/CourseFilter.vue'
import FeaturedCourse from '@/components/Courses/FeaturedCourse.vue'
import CourseCard from '@/components/Courses/CourseCard.vue'
import CourseAnalytics from '@/components/Courses/CourseAnalytics.vue'
import RecentlyAccessed from '@/components/Courses/RecentlyAccessed.vue'
import { courses } from './coursesData'
</script>

<template>
  <div class="min-h-full p-6 bg-gradient-to-r from-[#181D31] to-[#1e293b] backdrop-blur text-white">
    <CourseHero />

    <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <CourseFilter />

        <div class="mt-6">
          <FeaturedCourse />
        </div>

        <section class="mt-6">
          <h3 class="text-xl font-bold mb-4">Course Grid</h3>
          <div class="grid gap-4 md:grid-cols-3">
            <CourseCard v-for="c in courses" :key="c.id" :course="c" />
          </div>
        </section>

        <section class="mt-8">
          <h3 class="text-xl font-bold mb-4">Recently Accessed</h3>
          <RecentlyAccessed />
        </section>
      </div>

      <aside>
        <CourseAnalytics />
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* small spacing tweaks */
</style>