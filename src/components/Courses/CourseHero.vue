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
  <section ref="root" class="rounded-2xl p-6 relative overflow-hidden" style="background: linear-gradient(135deg, rgba(24,29,49,0.9), rgba(30,41,59,0.85));">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p class="text-sm uppercase tracking-wider text-[#E5BA73]">Learning Hub</p>
        <h1 class="text-3xl font-bold mt-2">Discover, manage and track academic journeys.</h1>
        <p class="mt-2 text-sm text-slate-200/80">Explore knowledge across every department.</p>
      </div>

      <div class="flex gap-4">
        <div class="rounded-xl bg-white/6 p-4 text-center backdrop-blur">
          <p class="text-xs text-slate-200">Active Courses</p>
          <p class="text-xl font-bold">42</p>
        </div>
        <div class="rounded-xl bg-white/6 p-4 text-center backdrop-blur">
          <p class="text-xs text-slate-200">Students Enrolled</p>
          <p class="text-xl font-bold">1250</p>
        </div>
        <div class="rounded-xl bg-white/6 p-4 text-center backdrop-blur">
          <p class="text-xs text-slate-200">Completion Rate</p>
          <p class="text-xl font-bold">94%</p>
        </div>
      </div>
    </div>

    <!-- Decorative background image (use your asset if present) -->
    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: url('/src/assets/library.jpg'); background-size: cover; background-position: center; mix-blend-mode: overlay;"></div>
  </section>
</template>

<style scoped>
section { border-radius: 16px; }
</style>
