<script setup>
import { ref, onMounted } from 'vue'
defineProps({ items: Array })
const root = ref(null)

const medalIcon = (i) => i === 0 ? 'workspace_premium' : 'military_tech'
const medalColor = (i) => i === 0 ? '#E5BA73' : i === 1 ? '#9CA3AF' : '#CD7F32'

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap)
      gsap.from(root.value?.querySelectorAll('.performer-row'), { y: 8, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="p-5 surface-card rounded-2xl">

    <div class="flex items-center justify-between mb-4">
      <h4 class="text-sm font-bold heading-text">Top Performers</h4>
      <span class="material-symbols-outlined text-xl text-(--accent)">emoji_events</span>
    </div>

    <ul class="flex flex-col gap-3">
      <li
        v-for="(t, i) in items"
        :key="t.id"
        class="performer-row flex items-center gap-3 px-3 py-2.5 rounded-xl bg-(--surface-muted) hover:bg-(--app-bg-soft) transition-colors"
      >
        <span class="flex items-center text-xl" :style="{ color: medalColor(i) }">
          <span class="material-symbols-outlined">{{ medalIcon(i) }}</span>
        </span>
        <span class="flex-1 text-sm font-semibold truncate body-text">{{ t.name }}</span>
        <span class="text-base font-extrabold text-(--accent) tracking-tight">
          {{ t.score }}<span class="text-xs font-medium muted-text">/100</span>
        </span>
      </li>
    </ul>

  </div>
</template>