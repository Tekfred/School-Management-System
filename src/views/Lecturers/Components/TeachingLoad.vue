<script setup>
import { ref, onMounted } from 'vue'
defineProps({ data: Array })
const root = ref(null)

const loadLabel = (load) => {
  if (load >= 5) return { text: 'Heavy',    color: '#F87171' }
  if (load >= 3) return { text: 'Moderate', color: '#E5BA73' }
  return               { text: 'Light',    color: '#34D399' }
}

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from(root.value?.querySelectorAll('.load-row'), { y: 6, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' })
      gsap.from(root.value?.querySelectorAll('.bar-fill'), { width: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', delay: 0.2 })
    }
  } catch(e) {}
})
</script>

<template>
  <div ref="root" class="p-5 surface-card rounded-2xl">

    <div class="flex items-center justify-between mb-4">
      <h4 class="text-sm font-bold heading-text">Teaching Load</h4>
      <span class="material-symbols-outlined text-xl text-(--accent)">bar_chart</span>
    </div>

    <div class="flex flex-col gap-4">
      <div v-for="d in data" :key="d.name" class="load-row">

        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-semibold body-text truncate max-w-[55%]">{{ d.name }}</span>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold tracking-wider uppercase" :style="{ color: loadLabel(d.load).color }">
              {{ loadLabel(d.load).text }}
            </span>
            <span class="text-xs font-bold body-text">
              {{ d.load }}<span class="font-normal muted-text">/6</span>
            </span>
          </div>
        </div>

        <div class="h-1.5 rounded-full bg-(--surface-muted) overflow-hidden">
          <div
            class="h-full transition-all rounded-full bar-fill duration-600"
            :style="{ width: (d.load / 6 * 100) + '%', background: loadLabel(d.load).color }"
          ></div>
        </div>

      </div>
    </div>

  </div>
</template>