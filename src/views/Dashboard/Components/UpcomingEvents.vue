<script setup>
defineProps({
  events: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <div class="surface-card rounded-3xl p-5 shadow-xl shadow-slate-200/70 dark:shadow-black/20">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-xl text-(--accent)">calendar_month</span>
          <h3 class="text-lg font-bold heading-text">Upcoming Events</h3>
        </div>
        <button class="text-sm font-semibold text-(--accent-strong) hover:text-(--accent) transition-colors">View calendar</button>
      </div>
      <div class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          class="border border-(--surface-border) rounded-xl p-4 bg-(--surface-muted) hover:bg-(--surface-border) transition-colors"
        >
          <div class="flex items-start gap-4">
            <span :class="['w-2.5 h-2.5 rounded-full mt-2', event.dot]"></span>
            <div>
              <h4 class="font-bold heading-text">{{ event.Events }}</h4>
              <div class="flex flex-wrap items-center gap-4 mt-3 text-sm muted-text">
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
