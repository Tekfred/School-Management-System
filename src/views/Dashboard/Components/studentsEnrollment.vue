<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  enrollmentData: {
    type: Array,
    default: () => [],
  },
});

// State for dropdown
const selectedPeriod = ref('Last 6 months');

// Handle period change
const handlePeriodChange = (event) => {
  selectedPeriod.value = event.target.value;
};

// Calculate max value for scaling
const enrollmentRecords = computed(() => props.enrollmentData);
const maxStudents = computed(() => Math.max(...enrollmentRecords.value.map(d => d.students), 0));
const minStudents = computed(() => Math.min(...enrollmentRecords.value.map(d => d.students), 0));
const range = computed(() => maxStudents.value - minStudents.value);
const totalGrowth = computed(() => {
  if (enrollmentRecords.value.length < 2) return 0;

  return enrollmentRecords.value[enrollmentRecords.value.length - 1].students - enrollmentRecords.value[0].students;
});
const averageEnrollment = computed(() => {
  if (!enrollmentRecords.value.length) return 0;

  const total = enrollmentRecords.value.reduce((sum, item) => sum + item.students, 0);
  return Math.round(total / enrollmentRecords.value.length);
});
const growthRate = computed(() => {
  if (enrollmentRecords.value.length < 2 || !enrollmentRecords.value[0].students) return 0;

  return Math.round((totalGrowth.value / enrollmentRecords.value[0].students) * 100);
});

// Function to calculate bar height percentage
const getBarHeight = (students) => {
  if (!range.value) return 100;

  return ((students - minStudents.value) / range.value) * 100;
};

</script>

<template>
  <div class="rounded-2xl bg-white/90 p-5 shadow-xl shadow-slate-200/70 animate-fade-in dark:bg-[#0f172a] dark:shadow-black/20" style="animation-delay: 200ms; animation-duration: 0.5s;">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-bold text-[#181D31] dark:text-white">Academic Momentum</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Monthly study progress trend</p>
      </div>
      <select
        @change="handlePeriodChange"
        v-model="selectedPeriod"
        class="px-3 py-1.5 text-sm bg-slate-100 dark:bg-[#1e293b] rounded-lg border-none text-[#181D31] dark:text-gray-100 cursor-pointer hover:bg-slate-200 dark:hover:bg-[#334155] transition"
      >
        <option>Last 6 months</option>
        <option>Last year</option>
      </select>
    </div>

    <div class="flex h-56 items-end justify-around gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-[#334155] dark:bg-[#111827]">
      <div
        v-for="(data, index) in enrollmentRecords"
        :key="index"
        class="flex flex-col items-center justify-end flex-1 h-full gap-2"
      >
        <div
          class="group relative w-full rounded-t-xl bg-gradient-to-t from-[#181D31] via-blue-500 to-[#E5BA73] transition-all hover:shadow-lg"
          :style="{
            height: `${getBarHeight(data.students)}%`,
            minHeight: '20px',
            animationDelay: `${index * 0.08}s`,
          }"
        >
          <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white dark:bg-[#334155] px-2 py-1 rounded shadow-lg border border-slate-200 dark:border-[#475569] text-xs font-semibold text-[#181D31] dark:text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {{ data.students }}% progress
          </div>
        </div>

        <div class="text-xs font-bold text-slate-500 dark:text-gray-300">{{ data.month }}</div>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-3 gap-4">
      <div class="rounded-xl bg-blue-50 p-3 dark:bg-blue-950/40">
        <p class="text-xs text-slate-500 dark:text-gray-400">Total Growth</p>
        <p class="text-lg font-bold text-blue-600">{{ totalGrowth }}%</p>
      </div>
      <div class="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
        <p class="text-xs text-slate-500 dark:text-gray-400">Average</p>
        <p class="text-lg font-bold text-blue-600">{{ averageEnrollment }}</p>
      </div>
      <div class="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30">
        <p class="text-xs text-slate-500 dark:text-gray-400">Growth Rate</p>
        <p class="text-lg font-bold text-blue-600">{{ growthRate }}%</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
