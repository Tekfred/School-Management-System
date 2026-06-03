<script setup>
import { ref, onMounted } from 'vue'
defineProps({ items: Array })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap || (await import(/* @vite-ignore */ 'gsap')).default
    gsap.from(root.value?.querySelectorAll('div > div'), { y: 6, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="rounded-xl bg-white/6 p-4 backdrop-blur">
    <h4 class="font-bold mb-3">Lecturer Availability</h4>
    <div class="space-y-2">
      <div v-for="a in items" :key="a.name">
        <div class="font-semibold">{{ a.name }}</div>
        <div class="text-sm text-slate-500">{{ a.slots.join(' • ') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>