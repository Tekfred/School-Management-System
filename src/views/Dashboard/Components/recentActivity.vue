<script setup>
defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <div class="rounded-2xl bg-[linear-gradient(135deg,#181D31,rgba(24,29,49,0.96)_48%,rgba(229,186,115,0.18))] p-5 shadow-xl shadow-slate-200/70 dark:border dark:border-[#E5BA73]/15 dark:shadow-black/20">
      <h3 class="text-lg font-bold text-white mb-5">Recent Activity</h3>
      <div class="space-y-4">
        <div v-for="act in activities" :key="act.id" :class="['flex items-start gap-4 rounded-xl border-l-4 bg-white/10 p-3 backdrop-blur', act.border]">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white shadow-sm">
            {{ act.iconText }}
          </div>
          <div>
            <p class="text-sm text-slate-200">
              <span class="font-semibold">{{ act.BoldText }}</span>
              {{ act.messages }}
              <span class="font-semibold">{{ act.BoldText2 }}</span>
            </p>
            <p class="mt-1 text-xs text-slate-400">{{ act.TimeRanges }}</p>
          </div>
        </div>

        
      </div>
    </div>

</template>
