<script setup>
import { useRouter } from 'vue-router';
import studentsEnrollment from '@/views/Dashboard/Components/studentsEnrollment.vue';
import quickAction from '@/views/Dashboard/Components/quickAction.vue';
import recentActivity from './Components/recentActivity.vue';
import UpcomingEvents from './Components/UpcomingEvents.vue';
import {
  activeStatus,
  enrollmentData,
  quickActions,
  recentActivities,
  upcomingEvents,
} from './Data';

const getIconStyle = (bgcolor, borderColor) => {
  return {
    backgroundColor: bgcolor,
    color: borderColor.includes('amber') ? '#b8860b' : borderColor.split('-')[1]
  }
}
const router = useRouter()

const logout = () => {
  localStorage.removeItem('loggedIn')
  router.push('/login')
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-[#0f172a] dark:text-gray-100">

    <!-- Main Content -->
    <div class="p-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <div v-for="active in activeStatus" :key="active.id" :class="`bg-white dark:bg-[#1e293b] p-3 space-y-2 rounded-lg shadow-sm border-l-4 ${active.borderColor} animate-fade-in`" 
        :style="`animation-delay: ${(active.id - 1) * 0.15}s`">
          <div class="flex items-center justify-between">
            <div class="text-gray-500 dark:text-gray-300 text-sm font-semibold">{{ active.name }}</div>
            <span class="material-symbols-outlined rounded-lg p-3 text-2xl" :style="getIconStyle(active.bgcolor, active.borderColor)">{{ active.icon }}</span>
          </div>
          
          <div class="text-2xl font-bold dark:text-white">{{ active.value }}</div>

          <div class="text-gray-500 dark:text-gray-400 text-sm font-semibold">{{ active.message }}</div>
        </div>

      </div>
    </div>

    <!-- Enrollment and Quick Actions Row -->
    <div class="p-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Students enrollment: wider (spans 2/3) -->
        <div class="lg:col-span-2">
          <studentsEnrollment :enrollment-data="enrollmentData" />
        </div>

        <!-- Quick Actions: narrower (spans 1/3) -->
        <div class="lg:col-span-1">
          <quickAction :actions="quickActions" />
        </div>
      </div>
    </div>

    <div>
      <div class="p-8 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <recentActivity :activities="recentActivities" />

        <UpcomingEvents :events="upcomingEvents" />
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
  opacity: 0; /* ✅ cards start invisible until their delay fires */
}
</style>
