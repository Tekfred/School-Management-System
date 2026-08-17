<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const results = ref([
  { id: 1, title: 'Data Structures - Assignment 1', grade: 'A-', date: '2026-06-04', course: 'CS 302', points: '48/50', feedback: 'Excellent work on binary trees implementation.' },
  { id: 2, title: 'Database Systems - Lab', grade: 'B+', date: '2026-06-01', course: 'CS 318', points: '34/40', feedback: 'Good normalization, watch the joins.' },
  { id: 3, title: 'Software Engineering - Sprint 1', grade: 'A', date: '2026-05-28', course: 'CS 330', points: '92/100', feedback: 'Outstanding sprint demo!' },
])

const gradeColors = {
  'A': { bg: 'bg-emerald-100 dark:bg-emerald-950/50', text: 'text-emerald-700 dark:text-emerald-300', ring: 'ring-emerald-200 dark:ring-emerald-800/60' },
  'A-': { bg: 'bg-green-100 dark:bg-green-950/50', text: 'text-green-700 dark:text-green-300', ring: 'ring-green-200 dark:ring-green-800/60' },
  'B+': { bg: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-700 dark:text-amber-300', ring: 'ring-amber-200 dark:ring-amber-800/60' },
  'B': { bg: 'bg-orange-100 dark:bg-orange-950/50', text: 'text-orange-700 dark:text-orange-300', ring: 'ring-orange-200 dark:ring-orange-800/60' },
  'B-': { bg: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-700 dark:text-amber-300', ring: 'ring-amber-200 dark:ring-amber-800/60' },
  'C': { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-700 dark:text-red-300', ring: 'ring-red-200 dark:ring-red-800/60' },
}

const gradeStyle = (grade) => gradeColors[grade] || gradeColors['B']

const totalResults = computed(() => results.value.length)
const avgGradePoints = computed(() => {
  const gradeMap = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C': 2.0, 'C+': 2.3, 'C-': 1.7, 'D': 1.0, 'F': 0 }
  const total = results.value.reduce((sum, r) => sum + (gradeMap[r.grade] || 0), 0)
  return (total / results.value.length).toFixed(2)
})

function goBack() {
  router.push('/app/dashboard')
}

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from('.vr-header', { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out' })
      gsap.from('.vr-summary', {
        y: 18, opacity: 0, duration: 0.45,
        stagger: 0.1, ease: 'power2.out', delay: 0.2,
      })
      gsap.from('.vr-row', {
        y: 12, opacity: 0, duration: 0.4,
        stagger: 0.06, ease: 'power2.out', delay: 0.4,
      })
    }
  } catch (e) {}
})
</script>

<template>
  <div class="min-h-full px-4 py-5 sm:px-6 lg:px-8">
    <!-- Header -->
    <header class="vr-header flex items-center justify-between mb-5 sm:mb-6 flex-wrap gap-3">
      <div class="flex items-center gap-3">
        <button
          @click="goBack"
          class="flex items-center justify-center h-10 w-10 rounded-xl bg-(--surface-muted) border border-(--surface-border) muted-text hover:bg-(--surface-border) transition-all"
        >
          <span class="material-symbols-outlined text-base">arrow_back</span>
        </button>
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-(--accent) mb-1">Academics</p>
          <h1 class="text-2xl font-black heading-text" style="font-family: 'Cormorant Garamond', Georgia, serif">View Results</h1>
        </div>
      </div>
      <button
        @click="goBack"
        class="primary-action inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
      >
        <span class="material-symbols-outlined text-base">dashboard</span>
        Back to Dashboard
      </button>
    </header>

    <!-- Summary stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
      <div
        v-for="stat in [
          { label: 'Total Results', value: totalResults, icon: 'assignment', color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Avg. Grade Point', value: avgGradePoints, icon: 'star', color: 'text-(--accent)' },
          { label: 'Highest Grade', value: 'A', icon: 'emoji_events', color: 'text-emerald-600 dark:text-emerald-400' }
        ]"
        :key="stat.label"
        class="vr-summary surface-card rounded-2xl p-4 sm:p-5 text-center"
      >
        <span class="material-symbols-outlined text-2xl mb-2" :class="stat.color">{{ stat.icon }}</span>
        <p class="text-2xl font-black heading-text">{{ stat.value }}</p>
        <p class="text-xs muted-text mt-0.5">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Results list -->
    <div class="surface-card rounded-3xl p-6 overflow-hidden">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-xl text-(--accent)">grade</span>
          <div>
            <h3 class="font-bold heading-text">Assignment Results</h3>
            <p class="text-sm muted-text">{{ results.length }} results found</p>
          </div>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-(--surface-muted) muted-text">
          Sorted by date
        </span>
      </div>

      <div class="space-y-3">
        <div
          v-for="r in results"
          :key="r.id"
          class="vr-row group border border-(--surface-border) rounded-xl p-4 bg-(--surface-muted) hover:bg-(--surface) transition-all duration-200"
        >
          <div class="flex items-center gap-4">
            <!-- Grade badge -->
            <div
              class="flex items-center justify-center shrink-0 w-14 h-14 rounded-2xl font-black text-lg border-2"
              :class="gradeStyle(r.grade).bg + ' ' + gradeStyle(r.grade).text + ' ' + gradeStyle(r.grade).ring"
            >
              {{ r.grade }}
            </div>

            <div class="flex-1 min-w-0">
              <p class="font-bold heading-text">{{ r.title }}</p>
              <div class="flex flex-wrap items-center gap-3 mt-1 text-xs">
                <span class="flex items-center gap-1 muted-text">
                  <span class="material-symbols-outlined text-xs">school</span>
                  {{ r.course }}
                </span>
                <span class="flex items-center gap-1 muted-text">
                  <span class="material-symbols-outlined text-xs">calendar_month</span>
                  {{ r.date }}
                </span>
                <span class="flex items-center gap-1 muted-text">
                  <span class="material-symbols-outlined text-xs">score</span>
                  {{ r.points }}
                </span>
              </div>
              <p v-if="r.feedback" class="text-xs muted-text mt-2 italic">
                "{{ r.feedback }}"
              </p>
            </div>

            <!-- View details -->
            <div class="flex shrink-0">
              <button
                class="flex items-center justify-center h-9 w-9 rounded-xl text-(--subtle-text) hover:text-(--accent) hover:bg-(--surface-border) transition-all opacity-0 group-hover:opacity-100"
              >
                <span class="material-symbols-outlined text-sm">visibility</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .vr-row:focus-within {
    border-color: var(--accent);
  }
}
</style>
