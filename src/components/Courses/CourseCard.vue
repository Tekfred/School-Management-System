<script setup>
import { ref, onMounted } from 'vue'
defineProps({ course: Object })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from(root.value, { y: 6, opacity: 0, duration: 0.4, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <article ref="root" class="course-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-12 h-12 rounded-lg bg-white/6 flex items-center justify-center text-lg">📚</div>
      <div>
        <h4 class="font-bold">{{ course.title }}</h4>
        <p class="text-sm text-slate-400">{{ course.teacher }}</p>
      </div>
    </div>

    <div class="text-sm text-slate-400 mb-3">{{ course.students }} Students • {{ course.modules }} Modules</div>

    <div class="mb-4">
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-[#E5BA73]" :style="{ width: course.progress + '%' }"></div>
      </div>
      <div class="text-xs text-slate-400 mt-2">{{ course.progress }}%</div>
    </div>

    <div class="mt-auto">
      <button class="text-sm font-semibold text-[#181D31] bg-white/90 px-3 py-2 rounded">View Details</button>
    </div>
  </article>
</template>

<style scoped>
.course-card { padding: 1rem; background: white; border-radius: 12px; }
:global(.dark) .course-card { background: #0f172a; color: #e5e7eb; }
</style>
