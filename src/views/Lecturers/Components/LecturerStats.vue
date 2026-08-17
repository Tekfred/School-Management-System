<script setup>
import { ref, onMounted } from 'vue'
defineProps({ stats: Array })
const root = ref(null)

const iconColors = {
  blue:   { bg: '#1D3461', text: '#60A5FA' },
  green:  { bg: '#14362A', text: '#34D399' },
  amber:  { bg: '#3D2C0A', text: '#E5BA73' },
  purple: { bg: '#2D1B4E', text: '#A78BFA' },
}

onMounted(async () => {
  try {
    const gsap = window.gsap
    const cards = root.value?.querySelectorAll('.stat-card')
    if (cards?.length && gsap)
      gsap.from(cards, { y: 8, opacity: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out' })
  } catch(e) {}
})
</script>

<template>
  <section ref="root" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="s in stats"
      :key="s.id"
      class="flex items-center gap-3 sm:gap-4 px-4 py-4 sm:px-5 sm:py-5 stat-card surface-card interactive-surface rounded-2xl"
    >
      <div
        class="flex items-center justify-center text-xl w-11 h-11 rounded-xl shrink-0"
        :style="{ background: iconColors[s.color]?.bg, color: iconColors[s.color]?.text }"
      >
        <span class="material-symbols-outlined">{{ s.icon }}</span>
      </div>
      <div>
        <p class="text-xs font-medium muted-text mb-0.5">{{ s.title }}</p>
        <p class="text-2xl font-extrabold leading-none tracking-tight heading-text">{{ s.value }}</p>
      </div>
    </div>
  </section>
</template>