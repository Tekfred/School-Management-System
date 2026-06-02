<script setup>
defineProps({ items: Array })
</script>

<template>
  <div class="rounded-xl bg-white/6 p-4 backdrop-blur">
    <h4 class="font-bold mb-3">Top Performers</h4>
    <ul class="space-y-2">
      <li v-for="t in items" :key="t.id" class="flex justify-between text-sm">
        <span>{{ t.name }}</span>
        <span class="font-semibold">{{ t.score }}</span>
      </li>
    </ul>
  </div>
</template>
