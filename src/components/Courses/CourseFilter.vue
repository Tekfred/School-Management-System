<script setup>
import { ref, onMounted } from 'vue'
const root = ref(null)
const search = ref('')
const categories = ['All','Science','Business','Arts','Technology','Engineering']
const active = ref('All')

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from(root.value, { y: 8, opacity: 0, duration: 0.45, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="flex flex-col gap-4">
    <div class="surface-panel flex items-center gap-3 p-3">
      <input v-model="search" placeholder="Search courses..." class="h-11 flex-1 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-muted)] px-4 text-[var(--heading)] outline-none transition placeholder:text-slate-400 focus:border-[#E5BA73] focus:ring-4 focus:ring-[#E5BA73]/20" />
      <button class="interactive-surface rounded-xl border border-[var(--surface-border)] bg-[var(--surface-muted)] px-4 py-2 font-semibold text-[var(--heading)]">Filters</button>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button v-for="c in categories" :key="c" @click="active = c" :class="['interactive-surface rounded-full border px-3 py-1 text-sm font-bold transition', active === c ? 'border-[#E5BA73] bg-[#E5BA73] text-[#181D31] shadow-lg shadow-[#E5BA73]/20' : 'border-[var(--surface-border)] bg-[var(--surface)] text-[var(--body-text)] hover:text-[var(--heading)]']">{{ c }}</button>
    </div>
  </div>
</template>

<style scoped>
input { outline: none; }
</style>
