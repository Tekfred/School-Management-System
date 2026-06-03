<script setup>
import { ref, onMounted } from 'vue'
defineProps({ items: Array })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap || (await import(/* @vite-ignore */ 'gsap')).default
    gsap.from(root.value?.querySelectorAll('li'), { y: 8, opacity: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="rounded-xl bg-white/6 p-4 backdrop-blur">
    <h4 class="font-bold mb-3">Top Performers</h4>
    <ul class="space-y-2">
      <li v-for="t in items" :key="t.id" class="flex justify-between text-sm">
        <span>{{ t.name }}</span>
        <span class="font-semibold">{{ t.score }}</span>
      </li>
    </ul>
  </div>
</template>
