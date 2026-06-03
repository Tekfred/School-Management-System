<script setup>
import { ref, onMounted } from 'vue'
const root = ref(null)
// static featured course; can be wired to data
onMounted(async () => {
  try {
    const gsap = window.gsap || (await import(/* @vite-ignore */ 'gsap')).default
    gsap.from(root.value, { y: 8, opacity: 0, duration: 0.45, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="rounded-xl overflow-hidden border bg-white/6 p-6 backdrop-blur">
    <h3 class="text-2xl font-bold mb-2">Computer Science 101</h3>
    <p class="text-sm text-slate-200/70 mb-4">A foundational course introducing algorithms, data structures and problem solving.</p>
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div>
        <p class="text-xs text-slate-300">Students</p>
        <p class="font-bold">320</p>
      </div>
      <div>
        <p class="text-xs text-slate-300">Modules</p>
        <p class="font-bold">8</p>
      </div>
      <div>
        <p class="text-xs text-slate-300">Completion</p>
        <p class="font-bold">92%</p>
      </div>
    </div>
    <button class="rounded-full bg-[#E5BA73] px-5 py-2 font-semibold text-black">Explore Course</button>
  </div>
</template>

<style scoped>
</style>
