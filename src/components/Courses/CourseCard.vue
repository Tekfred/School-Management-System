<script setup>
import { ref, onMounted, computed } from 'vue'
const props = defineProps({ course: Object })
const root = ref(null)

const progressColor = computed(() => props.course.accent || '#E5BA73')

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from(root.value, { y: 6, opacity: 0, duration: 0.4, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <article ref="root" class="surface-card interactive-surface flex h-full flex-col p-4 rounded-2xl">
    <div class="flex items-center gap-3 mb-4">
      <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-(--surface-border) bg-(--surface-muted) text-lg text-(--accent)">
        <span class="material-symbols-outlined">{{ course.icon || 'menu_book' }}</span>
      </div>
      <div>
        <h4 class="heading-text font-bold">{{ course.title }}</h4>
        <p class="muted-text text-sm">{{ course.teacher }}</p>
      </div>
    </div>

    <div class="muted-text mb-3 text-sm">{{ course.students }} Students • {{ course.modules }} Modules</div>

    <div class="mb-4">
      <div class="flex justify-between mb-2 text-sm font-semibold">
        <span class="muted-text">Progress</span>
        <span class="body-text">{{ course.progress }}%</span>
      </div>
      <div class="h-2 overflow-hidden rounded-full bg-(--surface-border)">
        <div class="h-full rounded-full" :style="{ width: course.progress + '%', backgroundColor: progressColor }"></div>
      </div>
    </div>

    <div class="mt-auto flex items-center justify-between pt-3 border-t border-(--surface-border)">
      <span class="text-xs font-semibold muted-text">{{ course.modules }} modules</span>
      <button class="primary-action rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-1.5">
        <span class="material-symbols-outlined text-xs">visibility</span>
        View Details
      </button>
    </div>
  </article>
</template>

<style scoped>
</style>
