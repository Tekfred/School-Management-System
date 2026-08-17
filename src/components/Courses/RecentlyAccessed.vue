<script setup>
import { ref, onMounted } from 'vue'
const items = [1,2,3,4]
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from(root.value, { x: 12, opacity: 0, duration: 0.45, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="flex gap-4 overflow-x-auto py-2">
    <div
      v-for="i in items"
      :key="i"
      class="min-w-50 surface-card rounded-2xl p-4 interactive-surface"
    >
      <div class="h-32 rounded-xl bg-(--surface-muted) mb-3"></div>
      <h4 class="font-black heading-text text-lg">Course title</h4>
      <p class="text-sm muted-text">Prof. Name</p>
    </div>
  </div>
</template>
