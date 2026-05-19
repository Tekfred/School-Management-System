<script setup>
import { ref } from 'vue';

const events = ref([
    {
        id: 1,
        Events: 'Parent-Teacher Conference',
        Timeline: 'Feb 15, 2024',
        border: 'border-blue-500',
        dot: 'bg-blue-100',
        Time: '10:00 AM'
    },
    {
        id: 2,
        Events: 'Annual Science Fair',
        Timeline: 'Feb 20, 2024',
        border: 'border-green-500',
        dot: 'bg-green-100',
        Time: '9:00 AM'
    },
    {
        id: 3,
        Events: 'Mid-term Examinations',
        Timeline: 'Feb 25, 2024',
        border: 'border-red-500',
        dot: 'bg-red-100',
        Time: '8:00 AM'
    },
    {
        id: 4,
        Events: 'Sports Day',
        Timeline: 'Mar 1, 2024',
        border: 'border-amber-500',
        dot: 'bg-amber-100',
        Time: '7:30 AM'
    }
]);

</script>

<template>
    <div class="bg-white dark:bg-[#1e293b] p-8 rounded-lg shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Events</h3>
        <button class="text-sm text-[#E5BA73] font-medium">View calendar</button>
      </div>
      <div class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          :class="['bg-gray-50 dark:bg-[#0f172a] border-l-4 rounded-lg p-5', event.border]"
        >
          <div class="flex items-start gap-4">
            <span :class="['w-2.5 h-2.5 rounded-full mt-2', event.dot]"></span>
            <div>
              <h4 class="font-semibold text-gray-800 dark:text-white">{{ event.Events }}</h4>
              <div class="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-base">calendar_month</span>
                  {{ event.Timeline }}
                </span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-base">schedule</span>
                  {{ event.Time }}
                </span>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>

</template>
