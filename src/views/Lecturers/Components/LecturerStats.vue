<script setup>
import { ref, onMounted } from 'vue'
defineProps({ stats: Array })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap
    const cards = root.value?.querySelectorAll('div > div')
    if (cards && cards.length && gsap) gsap.from(cards, { y: 8, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' })
  } catch(e) {}
})
</script>

<template>
  <section ref="root" class="grid grid-cols-1 sm:grid-cols-4 gap-4">
    <div v-for="s in stats" :key="s.id" class="rounded-xl bg-white p-4 shadow-md flex items-center gap-4">
      <div class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-slate-100 text-[#181D31]">
        <span class="material-symbols-outlined">{{ s.icon }}</span>
      </div>
      <div>
        <p class="text-sm text-slate-500">{{ s.title }}</p>
        <p class="text-2xl font-bold">{{ s.value }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
:global(.dark) .rounded-xl { background: #0f172a; color: #e5e7eb }
</style>