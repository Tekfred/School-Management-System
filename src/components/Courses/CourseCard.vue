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
  <article ref="root" class="surface-card interactive-surface flex h-full flex-col p-4">
    <div class="flex items-center gap-3 mb-4">
      <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--surface-border)] bg-[var(--surface-muted)] text-lg">📚</div>
      <div>
        <h4 class="heading-text font-bold">{{ course.title }}</h4>
        <p class="muted-text text-sm">{{ course.teacher }}</p>
      </div>
    </div>

    <div class="muted-text mb-3 text-sm">{{ course.students }} Students • {{ course.modules }} Modules</div>

    <div class="mb-4">
      <div class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div class="h-full bg-[#E5BA73]" :style="{ width: course.progress + '%' }"></div>
      </div>
      <div class="muted-text mt-2 text-xs">{{ course.progress }}%</div>
    </div>

    <div class="mt-auto">
      <button class="primary-action rounded-xl px-3 py-2 text-sm font-semibold">View Details</button>
    </div>
  </article>
</template>

<style scoped>
</style>
