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
  <div ref="root" class="surface-card interactive-surface overflow-hidden p-6">
    <h3 class="heading-text mb-2 text-2xl font-bold">Computer Science 101</h3>
    <p class="muted-text mb-4 text-sm">A foundational course introducing algorithms, data structures and problem solving.</p>
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div>
        <p class="muted-text text-xs">Students</p>
        <p class="heading-text font-bold">320</p>
      </div>
      <div>
        <p class="muted-text text-xs">Modules</p>
        <p class="heading-text font-bold">8</p>
      </div>
      <div>
        <p class="muted-text text-xs">Completion</p>
        <p class="heading-text font-bold">92%</p>
      </div>
    </div>
    <button class="primary-action rounded-full px-5 py-2 font-semibold">Explore Course</button>
  </div>
</template>

<style scoped>
</style>
