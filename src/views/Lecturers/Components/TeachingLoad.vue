<script setup>
import { ref, onMounted } from 'vue'
defineProps({ data: Array })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap || (await import(/* @vite-ignore */ 'gsap')).default
    gsap.from(root.value?.querySelectorAll('div > div'), { y: 6, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' })
  } catch(e) {}
})
</script>

<template>
  <div class="rounded-xl bg-white/6 p-4 backdrop-blur">
    <h4 class="font-bold mb-3">Teaching Load</h4>
    <div class="space-y-3">
      <div v-for="d in data" :key="d.name">
        <div class="flex justify-between text-sm mb-1"><span>{{ d.name }}</span><span>{{ d.load }}</span></div>
        <div class="h-2 bg-white/20 rounded-full"><div class="h-full bg-[#E5BA73]" :style="{ width: (d.load / 6 * 100) + '%' }"></div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>