<script setup>
defineProps({
  events: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <div class="rounded-2xl bg-white/90 p-5 shadow-xl shadow-slate-200/70 dark:bg-[#0f172a] dark:shadow-black/20">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-[#181D31] dark:text-white">Upcoming Events</h3>
        <button class="text-sm text-[#b8860b] dark:text-[#E5BA73] font-bold">View calendar</button>
      </div>
      <div class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          :class="['bg-slate-50 dark:bg-slate-900 border-l-4 rounded-xl p-4 transition hover:-translate-y-0.5 hover:shadow-md', event.border]"
        >
          <div class="flex items-start gap-4">
            <span :class="['w-2.5 h-2.5 rounded-full mt-2', event.dot]"></span>
            <div>
              <h4 class="font-bold text-[#181D31] dark:text-white">{{ event.Events }}</h4>
              <div class="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500 dark:text-gray-400">
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
