<script setup>
defineProps({ data: Array })
</script>

<template>
  <div class="rounded-xl bg-white/6 p-4 backdrop-blur">
    <h4 class="font-bold mb-3">Teaching Load</h4>
    <div class="space-y-3">
      <div v-for="d in data" :key="d.name">
        <div class="flex justify-between text-sm mb-1"><span>{{ d.name }}</span><span>{{ d.load }}</span></div>
        <div class="h-2 bg-white/20 rounded-full"><div class="h-full bg-[#E5BA73]" :style="{ width: (d.load / 6 * 100) + '%' }"></div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>