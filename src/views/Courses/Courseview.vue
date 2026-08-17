<script setup>
import { ref, onMounted } from 'vue'
import CourseHero from '@/components/Courses/CourseHero.vue'
import CourseFilter from '@/components/Courses/CourseFilter.vue'
import FeaturedCourse from '@/components/Courses/FeaturedCourse.vue'
import CourseCard from '@/components/Courses/CourseCard.vue'
import RecentlyAccessed from '@/components/Courses/RecentlyAccessed.vue'
import { courses } from '@/views/Courses/coursesData'

const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from('.course-section', {
        y: 12, opacity: 0, duration: 0.45, stagger: 0.1, ease: 'power2.out',
      })
    }
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="app-page p-4 md:p-6 lg:p-7">
    <CourseHero />

    <div class="course-section mt-6">
      <CourseFilter />
    </div>

    <div class="course-section mt-6">
      <FeaturedCourse />
    </div>

    <section class="course-section mt-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold heading-text">Course Grid</h3>
      </div>
      <div class="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <CourseCard v-for="c in courses" :key="c.id" :course="c" />
      </div>
    </section>

    <section class="course-section mt-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold heading-text">Recently Accessed</h3>
      </div>
      <RecentlyAccessed />
    </section>
  </div>
</template>
