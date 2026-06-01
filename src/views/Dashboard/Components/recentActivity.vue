<script setup>
defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <div class="rounded-2xl bg-white/90 p-5 shadow-xl shadow-slate-200/70 dark:bg-[#0f172a] dark:shadow-black/20">
      <h3 class="text-lg font-bold text-[#181D31] dark:text-white mb-5">Recent Activity</h3>
      <div class="space-y-4">
        <div v-for="act in activities" :key="act.id" :class="['flex items-start gap-4 rounded-xl border-l-4 bg-slate-50 p-3 dark:bg-slate-900', act.border]">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#181D31] shadow-sm dark:bg-slate-800 dark:text-white">
            {{ act.iconText }}
          </div>
          <div>
            <p class="text-sm text-slate-700 dark:text-gray-300">
              <span class="font-semibold">{{ act.BoldText }}</span>
              {{ act.messages }}
              <span class="font-semibold">{{ act.BoldText2 }}</span>
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-gray-400">{{ act.TimeRanges }}</p>
          </div>
        </div>

        
      </div>
    </div>

</template>
