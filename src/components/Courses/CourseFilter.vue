<script setup>
import { ref } from 'vue'
const search = ref('')
const categories = ['All','Science','Business','Arts','Technology','Engineering']
const active = ref('All')
</script>

<template>
  <div class="flex flex-col gap-4">
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
