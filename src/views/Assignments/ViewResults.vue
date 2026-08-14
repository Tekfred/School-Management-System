<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const results = ref([
  { id: 1, title: 'Data Structures - Assignment 1', grade: 'A-', date: '2026-06-04' },
  { id: 2, title: 'Database Systems - Lab', grade: 'B+', date: '2026-06-01' },
])

function goBack() {
  router.push('/app/dashboard')
}
</script>

<template>
  <div class="min-h-full px-5 py-6 sm:px-8">
    <div class="portal-card max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-bold text-[#181D31] dark:text-white">Results</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">Recent grades and feedback</p>
        </div>
        <button @click="goBack" class="rounded-full bg-[#181D31] px-3 py-1 text-sm font-semibold text-white">Back</button>
      </div>

      <div class="space-y-3">
        <div v-for="r in results" :key="r.id" class="rounded-xl border p-4 bg-white/90 dark:bg-[#0f172a]">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-[#181D31] dark:text-white">{{ r.title }}</p>
              <p class="text-xs text-slate-500">Submitted: {{ r.date }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-lg">{{ r.grade }}</p>
              <p class="text-xs text-slate-400">View details</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.portal-card { padding: 1.25rem; background: rgba(255,255,255,0.95); border-radius: 12px; }
</style>
