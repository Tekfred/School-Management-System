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

// Function to get bar color
const getBarColor = (index) => {
  const colors = ['#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6'];
  return colors[index] || '#3b82f6';
};
</script>

<template>
  <div class="bg-white dark:bg-[#1e293b] rounded-lg p-14 shadow-sm animate-fade-in" style="animation-delay: 200ms; animation-duration: 0.5s;">
    <!-- Header with title and dropdown -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Student Enrollment</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Monthly enrollment trends</p>
      </div>
      <select
        @change="handlePeriodChange"
        v-model="selectedPeriod"
        class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-[#334155] rounded-lg border-none text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#475569] transition"
      >
        <option>Last 6 months</option>
        <option>Last year</option>
      </select>
    </div>

    <!-- Chart container with bar chart -->
    <div class="flex items-end justify-around h-50 gap-2 bg-gray-50 dark:bg-[#0f172a] p-4 rounded-lg border border-gray-200 dark:border-[#334155]">
      <!-- Individual bars -->
      <div
        v-for="(data, index) in enrollmentRecords"
        :key="index"
        class="flex flex-col items-center justify-end flex-1 h-full gap-2"
      >
        <!-- Bar -->
        <div
          class="w-full rounded-t-lg transition-all hover:shadow-lg cursor-pointer group relative"
          :style="{
            height: `${getBarHeight(data.students)}%`,
            backgroundColor: 'hsl(217, 91%, 60%)',
            minHeight: '20px',
          }"
        >
          <!-- Tooltip on hover -->
          <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white dark:bg-[#334155] px-2 py-1 rounded shadow-lg border border-gray-200 dark:border-[#475569] text-xs font-semibold text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {{ data.students }} students
          </div>
        </div>

        <!-- Label -->
        <div class="text-xs font-medium text-gray-600 dark:text-gray-300">{{ data.month }}</div>
      </div>
    </div>

    <!-- Statistics row -->
    <div class="mt-6 grid grid-cols-3 gap-4">
      <div class="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400">Total Growth</p>
        <p class="text-lg font-bold text-blue-600">{{ totalGrowth }} students</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400">Average</p>
        <p class="text-lg font-bold text-blue-600">{{ averageEnrollment }}</p>
      </div>
      <div class="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400">Growth Rate</p>
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
