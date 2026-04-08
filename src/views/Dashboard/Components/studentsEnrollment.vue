<script setup>
import { ref } from 'vue';

// Chart data for enrollment trends
const enrollmentData = [
  { month: 'Jan', students: 1100, percent: 88 },
  { month: 'Feb', students: 1150, percent: 92 },
  { month: 'Mar', students: 1180, percent: 94 },
  { month: 'Apr', students: 1200, percent: 96 },
  { month: 'May', students: 1220, percent: 97 },
  { month: 'Jun', students: 1250, percent: 100 },
];

// State for dropdown
const selectedPeriod = ref('Last 6 months');

// Handle period change
const handlePeriodChange = (event) => {
  selectedPeriod.value = event.target.value;
};

// Calculate max value for scaling
const maxStudents = Math.max(...enrollmentData.map(d => d.students));
const minStudents = Math.min(...enrollmentData.map(d => d.students));
const range = maxStudents - minStudents;

// Function to calculate bar height percentage
const getBarHeight = (students) => {
  return ((students - minStudents) / range) * 100;
};

// Function to get bar color
const getBarColor = (index) => {
  const colors = ['#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6'];
  return colors[index] || '#3b82f6';
};
</script>

<template>
  <div class="bg-white rounded-lg p-6 shadow-sm animate-fade-in" style="animation-delay: 200ms; animation-duration: 0.5s;">
    <!-- Header with title and dropdown -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Student Enrollment</h3>
        <p class="text-sm text-gray-500">Monthly enrollment trends</p>
      </div>
      <select
        @change="handlePeriodChange"
        v-model="selectedPeriod"
        class="px-3 py-1.5 text-sm bg-gray-100 rounded-lg border-none text-gray-900 cursor-pointer hover:bg-gray-200 transition"
      >
        <option>Last 6 months</option>
        <option>Last year</option>
      </select>
    </div>

    <!-- Chart container with bar chart -->
    <div class="flex items-end justify-around h-64 gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <!-- Individual bars -->
      <div
        v-for="(data, index) in enrollmentData"
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
          <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg border border-gray-200 text-xs font-semibold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {{ data.students }} students
          </div>
        </div>

        <!-- Label -->
        <div class="text-xs font-medium text-gray-600">{{ data.month }}</div>
      </div>
    </div>

    <!-- Statistics row -->
    <div class="mt-6 grid grid-cols-3 gap-4">
      <div class="bg-blue-50 p-3 rounded-lg">
        <p class="text-xs text-gray-500">Total Growth</p>
        <p class="text-lg font-bold text-blue-600">{{ enrollmentData[enrollmentData.length - 1].students - enrollmentData[0].students }} students</p>
      </div>
      <div class="bg-blue-50 p-3 rounded-lg">
        <p class="text-xs text-gray-500">Average</p>
        <p class="text-lg font-bold text-blue-600">{{ Math.round(enrollmentData.reduce((a, b) => a + b.students, 0) / enrollmentData.length) }}</p>
      </div>
      <div class="bg-blue-50 p-3 rounded-lg">
        <p class="text-xs text-gray-500">Growth Rate</p>
        <p class="text-lg font-bold text-blue-600">{{ Math.round(((enrollmentData[enrollmentData.length - 1].students - enrollmentData[0].students) / enrollmentData[0].students) * 100) }}%</p>
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