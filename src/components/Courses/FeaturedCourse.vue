<script setup>
import { ref, onMounted } from 'vue'
const root = ref(null)
// static featured course; can be wired to data
onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from(root.value, { y: 8, opacity: 0, duration: 0.45, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="surface-card interactive-surface overflow-hidden p-6" style="border-radius: 1.25rem">
    <div class="flex items-center gap-3 mb-4">
      <span class="material-symbols-outlined text-2xl text-(--accent)">star</span>
      <h3 class="heading-text text-2xl font-bold">Computer Science 101</h3>
    </div>
    <p class="muted-text mb-4 text-sm">A foundational course introducing algorithms, data structures and problem solving.</p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      <div>
        <p class="text-xs muted-text uppercase tracking-wider">Students</p>
        <p class="text-xl font-black heading-text">320</p>
      </div>
      <div>
        <p class="text-xs muted-text uppercase tracking-wider">Modules</p>
        <p class="text-xl font-black heading-text">8</p>
      </div>
      <div>
        <p class="text-xs muted-text uppercase tracking-wider">Completion</p>
        <p class="text-xl font-black heading-text">92%</p>
      </div>
    </div>
    <button class="primary-action rounded-full px-6 py-2.5 font-semibold flex items-center gap-2">
      <span class="material-symbols-outlined text-sm">play_arrow</span>
      Explore Course
    </button>
  </div>
</template>

<style scoped>
</style>
