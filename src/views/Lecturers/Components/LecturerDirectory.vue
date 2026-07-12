<script setup>
import { ref, onMounted } from 'vue'
defineProps({ items: Array })
const root = ref(null)

const statusStyle = (status) => {
  if (status === 'Available') return { bg: '#14362A', text: '#34D399', dot: '#34D399' }
  if (status === 'In Class')  return { bg: '#1D3461', text: '#60A5FA', dot: '#60A5FA' }
  return                             { bg: '#2A2A2A', text: '#9CA3AF', dot: '#6B7280' }
}

onMounted(async () => {
  try {
    const gsap = window.gsap
    const cards = root.value?.querySelectorAll('.lecturer-card')
    if (cards?.length && gsap)
      gsap.from(cards, { y: 12, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <section ref="root" class="w-full">

    <!-- Header -->
    <div class="flex items-baseline gap-3 mb-5">
      <h3 class="text-lg font-bold heading-text">Lecturer Directory</h3>
      <span class="text-xs font-medium muted-text">{{ items.length }} faculty members</span>
    </div>

    <!-- Cards -->
    <div class="grid gap-3 md:grid-cols-2">
      <article
        v-for="l in items"
        :key="l.id"
        class="flex items-center gap-4 p-5 cursor-pointer lecturer-card surface-card interactive-surface rounded-2xl"
      >
        <!-- Avatar -->
        <div class="relative shrink-0">
          <img
            v-if="l.image"
            :src="l.image"
            :alt="l.name"
            class="w-13 h-13 rounded-full object-cover border-2 border-(--accent)"
          />
          <div
            v-else
            class="w-13 h-13 rounded-full bg-(--surface-muted) border-2 border-(--accent) flex items-center justify-center text-(--accent) text-2xl"
          >
            <span class="material-symbols-outlined">person</span>
          </div>
          <span
            class="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-(--card)"
            :style="{ background: statusStyle(l.status).dot }"
          ></span>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold truncate heading-text">{{ l.name }}</h4>
          <p class="text-xs muted-text mt-0.5 mb-2">{{ l.department }}</p>
          <div class="flex items-center gap-1.5 text-xs muted-text">
            <span class="text-sm material-symbols-outlined">menu_book</span>
            <span>{{ l.courses }} Courses</span>
            <span class="text-(--surface-border-strong)">·</span>
            <span class="material-symbols-outlined text-sm text-(--accent)">star</span>
            <span class="font-semibold text-(--accent)">{{ l.rating }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col items-end gap-2 shrink-0">
          <span
            class="px-3 py-1 text-xs font-semibold rounded-full"
            :style="{ background: statusStyle(l.status).bg, color: statusStyle(l.status).text }"
          >{{ l.status }}</span>
          <button class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-(--accent) text-(--navy) transition-opacity hover:opacity-80 active:scale-95">
            View Profile
          </button>
        </div>
      </article>
    </div>
  </section>
</template>