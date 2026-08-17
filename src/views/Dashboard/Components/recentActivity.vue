<script setup>
defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <div class="surface-card rounded-3xl p-5 shadow-xl shadow-slate-200/70 dark:shadow-black/20">
      <div class="flex items-center gap-3 mb-5">
        <span class="material-symbols-outlined text-xl text-(--accent)">clock</span>
        <h3 class="text-lg font-bold heading-text">Recent Activity</h3>
      </div>
      <div class="space-y-4">
        <div v-for="act in activities" :key="act.id" :class="['flex items-start gap-4 rounded-xl border border-(--surface-border) bg-(--surface-muted) p-3 transition-colors hover:bg-(--surface-border)']">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--accent)/10 text-sm font-bold text-(--accent) shadow-sm">
            {{ act.iconText }}
          </div>
          <div>
            <p class="text-sm text-(--body-text)">
              <span class="font-semibold">{{ act.BoldText }}</span>
              {{ act.messages }}
              <span class="font-semibold">{{ act.BoldText2 }}</span>
            </p>
            <p class="mt-1 text-xs muted-text">{{ act.TimeRanges }}</p>
          </div>
        </div>
      </div>
    </div>

</template>
