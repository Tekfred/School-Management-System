<script setup>
defineProps({ items: Array })
</script>

<template>
  <div class="rounded-xl bg-white/6 p-4 backdrop-blur">
    <h4 class="font-bold mb-3">Upcoming Lectures</h4>
    <ul class="space-y-2">
      <li v-for="it in items" :key="it.id" class="text-sm">
        <div class="font-semibold">{{ it.title }}</div>
        <div class="text-slate-500">{{ it.lecturer }} • {{ it.time }}</div>
      </li>
    </ul>
  </div>
</template>

