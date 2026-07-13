<script setup>
import { ref, onMounted } from 'vue'
defineProps({ items: Array })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap)
      gsap.from(root.value?.querySelectorAll('.lecture-row'), { y: 6, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' })
  } catch(e) {}
})
</script>

<template>
  <div ref="root" class="p-5 surface-card rounded-2xl">

    <div class="flex items-center justify-between mb-4">
      <h4 class="text-sm font-bold heading-text">Upcoming Lectures</h4>
      <span class="material-symbols-outlined text-xl text-(--accent)">calendar_month</span>
    </div>

    <ul class="flex flex-col divide-y divide-(--surface-border)">
      <li
        v-for="it in items"
        :key="it.id"
        class="lecture-row flex gap-3 py-3.5 first:pt-0 last:pb-0"
      >
        <!-- Timeline dot -->
        <div class="mt-1 shrink-0 w-2.5 h-2.5 rounded-full bg-(--accent) border-2 border-(--surface-muted)"></div>

        <div>
          <p class="mb-1 text-sm font-bold body-text">{{ it.title }}</p>
          <div class="flex items-center gap-1.5 text-xs muted-text flex-wrap">
            <span class="text-sm material-symbols-outlined">person</span>
            <span class="font-medium">{{ it.lecturer }}</span>
            <span class="text-(--surface-border-strong)">·</span>
            <span class="text-sm material-symbols-outlined">schedule</span>
            <span class="font-semibold text-(--accent)">{{ it.time }}</span>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>