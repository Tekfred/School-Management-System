<script setup>
import { ref } from 'vue';

const activities = ref([
    {
        id: 1,
        iconText: 'JS',
        BoldText: 'John Smith',
        messages: ' enrolled in',
        BoldText2: 'Computer Science 101',
        TimeRanges:'2 hours ago'
    },
    {
        id: 2,
        iconText: 'SJ',
        BoldText: 'Sarah Johnson',
        messages: ' submitted payment for ',
        BoldText2: 'Term 2 Fees',
        TimeRanges:'4 hours ago'
    },
    {
        id: 3,
        iconText: 'MB',
        BoldText: 'Michael Brown',
        messages: ' completed course ',
        BoldText2: 'Mathematics Advanced',
        TimeRanges:'2 hours ago'
    },
    {
        id: 4,
        iconText: 'JW',
        BoldText: 'James Wilson',
        messages: ' registered for ',
        BoldText2: 'Science Fair 2024',
        TimeRanges:'8 hours ago'
    },
    {
        id: 5,
        iconText: 'ED',
        BoldText: 'Emily Davis',
        messages: ' updated profile',
        BoldText2: 'Profile',
        TimeRanges:'2 hours ago'
    }
]);

</script>

<template>
    <div class="bg-white dark:bg-[#1e293b] p-8 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-6">Recent Activity</h3>
      <div class="space-y-4">
        <div v-for="act in activities" :key="act.id" class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            {{ act.iconText }}
          </div>
          <div>
            <p class="text-gray-800 dark:text-gray-300">
              <span class="font-semibold">{{ act.BoldText }}</span>
              {{ act.messages }}
              <span class="font-semibold">{{ act.BoldText2 }}</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ act.TimeRanges }}</p>
          </div>
        </div>
<section>

</section>
      </div>
    </div>

</template>
