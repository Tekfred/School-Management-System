<script setup>
import { ref, onMounted } from 'vue'
defineProps({ items: Array })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap || (await import(/* @vite-ignore */ 'gsap')).default
    gsap.from(root.value?.querySelectorAll('li'), { y: 6, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' })
  } catch(e) {}
})
</script>

<template>
  <div ref="root" class="rounded-xl bg-white/6 p-4 backdrop-blur">
    <h4 class="font-bold mb-3">Upcoming Lectures</h4>
    <ul class="space-y-2">
      <li v-for="it in items" :key="it.id" class="text-sm">
        <div class="font-semibold">{{ it.title }}</div>
        <div class="text-slate-500">{{ it.lecturer }} • {{ it.time }}</div>
      </li>
    </ul>
  </div>
</template>

