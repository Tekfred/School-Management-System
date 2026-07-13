<script setup>
import { ref, onMounted } from 'vue'
const root = ref(null)
// static hero for Learning Hub; tweak content or replace image path as needed
onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from(root.value, { y: 10, opacity: 0, duration: 0.5, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <section ref="root" class="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#181D31,rgba(24,29,49,0.96)_48%,rgba(229,186,115,0.18))] p-6 text-white shadow-[0_22px_55px_rgba(24,29,49,0.22)] dark:border-[#E5BA73]/15 dark:shadow-black/30">
    <div class="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm uppercase tracking-wider text-[#E5BA73]">Learning Hub</p>
        <h1 class="text-3xl font-bold mt-2">Discover, manage and track academic journeys.</h1>
        <p class="mt-2 text-sm text-slate-200/80">Explore knowledge across every department.</p>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div class="rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
          <p class="text-xs text-slate-200">Active Courses</p>
          <p class="text-xl font-bold">42</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
          <p class="text-xs text-slate-200">Students Enrolled</p>
          <p class="text-xl font-bold">1250</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
          <p class="text-xs text-slate-200">Completion Rate</p>
          <p class="text-xl font-bold">94%</p>
        </div>
      </div>
    </div>

    <!-- Decorative background image (use your asset if present) -->
    <div class="pointer-events-none absolute inset-0 opacity-10" style="background-image: url('/src/assets/library.jpg'); background-size: cover; background-position: center; mix-blend-mode: overlay;"></div>
  </section>
</template>

<style scoped>
section { border-radius: 16px; }
</style>
