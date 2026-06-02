<script setup>
// placeholder list; replace with real data or props
const items = [1,2,3,4]
</script>

<template>
  <div class="flex gap-4 overflow-x-auto py-2">
    <div v-for="i in items" :key="i" class="min-w-50 rounded-lg bg-white p-4">
      <div class="h-32 bg-gray-200 rounded mb-3"></div>
      <h4 class="font-bold">Course title</h4>
      <p class="text-sm text-slate-500">Prof. Name</p>
    </div>
  </div>
</template>

<style scoped>
:global(.dark) div[role="card"] { background: #0f172a }
</style>
