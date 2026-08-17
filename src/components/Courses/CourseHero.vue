<script setup>
import { ref, onMounted } from 'vue'
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from(root.value, { y: 12, opacity: 0, duration: 0.5, ease: 'power2.out' })
      gsap.from('.hero-stat', {
        y: 8, opacity: 0, duration: 0.4, stagger: 0.06, delay: 0.25,
        ease: 'power2.out',
      })
    }
  } catch (e) {}
})
</script>

<template>
  <section ref="root" class="surface-card rounded-3xl border border-(--surface-border) p-6 text-(--body-text)">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-(--accent)">Learning Hub</p>
        <h1 class="text-3xl font-bold mt-2 heading-text" style="font-family: 'Cormorant Garamond', Georgia, serif">
          Discover, manage and track academic journeys.
        </h1>
        <p class="mt-2 text-sm muted-text">Explore knowledge across every department.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="hero-stat text-center rounded-xl border border-(--surface-border) bg-(--surface-muted) px-4 py-3">
          <p class="text-xs muted-text font-semibold uppercase tracking-wider">Active Courses</p>
          <p class="text-2xl font-black mt-1 heading-text">42</p>
        </div>
        <div class="hero-stat text-center rounded-xl border border-(--surface-border) bg-(--surface-muted) px-4 py-3">
          <p class="text-xs muted-text font-semibold uppercase tracking-wider">Students Enrolled</p>
          <p class="text-2xl font-black mt-1 heading-text">1,250</p>
        </div>
        <div class="hero-stat text-center rounded-xl border border-(--surface-border) bg-(--surface-muted) px-4 py-3">
          <p class="text-xs muted-text font-semibold uppercase tracking-wider">Completion Rate</p>
          <p class="text-2xl font-black mt-1 heading-text">94%</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  border-radius: 1.25rem;
}
</style>
