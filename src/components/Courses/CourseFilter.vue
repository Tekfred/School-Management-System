<script setup>
import { ref, onMounted } from 'vue'
const root = ref(null)
const search = ref('')
const categories = ['All','Science','Business','Arts','Technology','Engineering']
const active = ref('All')

onMounted(async () => {
  try {
    const gsap = window.gsap || (await import(/* @vite-ignore */ 'gsap')).default
    gsap.from(root.value, { y: 8, opacity: 0, duration: 0.45, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <input v-model="search" placeholder="🔍 Search Courses........" class="flex-1 rounded-lg border p-3 bg-white/5 text-white" />
      <button class="rounded-lg bg-white/6 px-4 py-2">Filters</button>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button v-for="c in categories" :key="c" @click="active = c" :class="['px-3 py-1 rounded-full transition', active === c ? 'bg-[#E5BA73] text-black' : 'bg-white/6 text-white hover:bg-[#E5BA73] hover:text-black']">{{ c }}</button>
    </div>
  </div>
</template>

<style scoped>
input { outline: none; }
</style>
