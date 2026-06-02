<script setup>
defineProps({ items: Array })
</script>

<template>
  <div class="rounded-xl bg-white/6 p-4 backdrop-blur">
    <h4 class="font-bold mb-3">Lecturer Availability</h4>
    <div class="space-y-2">
      <div v-for="a in items" :key="a.name">
        <div class="font-semibold">{{ a.name }}</div>
        <div class="text-sm text-slate-500">{{ a.slots.join(' • ') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>