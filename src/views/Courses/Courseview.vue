<script setup>
import CourseHero from '@/components/Courses/CourseHero.vue'
import CourseFilter from '@/components/Courses/CourseFilter.vue'
import FeaturedCourse from '@/components/Courses/FeaturedCourse.vue'
import CourseCard from '@/components/Courses/CourseCard.vue'
import RecentlyAccessed from '@/components/Courses/RecentlyAccessed.vue'
import { courses } from '@/views/Courses/coursesData'
</script>

<template>
  <div class="min-h-full p-6">
    <CourseHero />

    <div class="mt-6">
      <CourseFilter />
    </div>

    <div class="mt-6">
      <FeaturedCourse />
    </div>

    <section class="mt-6">
      <h3 class="text-lg font-bold mb-4">Course Grid</h3>
      <div class="grid gap-4 md:grid-cols-3">
        <CourseCard v-for="c in courses" :key="c.id" :course="c" />
      </div>
    </section>

    <section class="mt-8">
      <h3 class="text-lg font-bold mb-4">Recently Accessed</h3>
      <RecentlyAccessed />
    </section>
  </div>
</template>

<style scoped>
/* Layout styles retained minimal; components have their own visuals */
</style>