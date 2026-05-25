<script setup>
defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <div class="bg-white dark:bg-[#1e293b] p-8 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-6">Recent Activity</h3>
      <div class="space-y-4">
        <div v-for="act in activities" :key="act.id" :class="['flex items-start gap-4 border-l-4 pl-4', act.border]">
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

        
      </div>
    </div>

</template>
