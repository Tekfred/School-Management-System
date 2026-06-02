<script setup>
defineProps({
  events: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <div class="rounded-2xl bg-[linear-gradient(135deg,#181D31,rgba(24,29,49,0.96)_48%,rgba(229,186,115,0.18))] p-5 shadow-xl shadow-slate-200/70 dark:border dark:border-[#E5BA73]/15 dark:shadow-black/20">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-white">Upcoming Events</h3>
        <button class="text-sm text-[#b8860b] dark:text-[#E5BA73] font-bold">View calendar</button>
      </div>
      <div class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          :class="['bg-white/10 border-l-4 rounded-xl p-4 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md', event.border]"
        >
          <div class="flex items-start gap-4">
            <span :class="['w-2.5 h-2.5 rounded-full mt-2', event.dot]"></span>
            <div>
              <h4 class="font-bold text-white">{{ event.Events }}</h4>
              <div class="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-300">
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
