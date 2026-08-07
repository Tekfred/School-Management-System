<script setup>
import { computed } from 'vue'
defineProps({ items: Array })

const isUrgent = (due) => {
  const days = (new Date(due) - new Date()) / (1000 * 60 * 60 * 24)
  return days <= 14
}

const dueLabel = (due) => {
  const days = Math.ceil((new Date(due) - new Date()) / (1000 * 60 * 60 * 24))
  if (days < 0)  return 'Overdue'
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  return `${days} days left`
}
</script>

<template>
  <div class="surface-card rounded-3xl p-6">
    <div class="flex items-center justify-between mb-5">
      <h3 class="text-sm font-bold heading-text">Upcoming Payments</h3>
      <span class="material-symbols-outlined text-xl text-(--accent)">event_upcoming</span>
    </div>

    <ul class="flex flex-col gap-3">
      <li
        v-for="item in items"
        :key="item.label"
        class="flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200"
        :class="isUrgent(item.due)
          ? 'bg-[#3B1212] border-[rgba(248,113,113,0.2)]'
          : 'bg-(--surface-muted) border-(--surface-border)'"
      >
        <div>
          <p class="text-sm font-semibold"
             :class="isUrgent(item.due) ? 'text-[#F87171]' : 'body-text'">
            {{ item.label }}
          </p>
          <p class="text-xs mt-0.5 font-medium"
             :class="isUrgent(item.due) ? 'text-[#F87171] opacity-70' : 'muted-text'">
            {{ dueLabel(item.due) }}
          </p>
        </div>
        <p class="text-sm font-black shrink-0 ml-3"
           :class="isUrgent(item.due) ? 'text-[#F87171]' : 'heading-text'"
           style="font-family:'Cormorant Garamond',Georgia,serif">
          GHS {{ item.amount.toLocaleString('en-GH', {minimumFractionDigits:2}) }}
        </p>
      </li>
    </ul>

    <!-- Pay now CTA -->
    <button class="w-full mt-4 py-3 rounded-2xl bg-(--accent) text-(--navy) text-sm font-bold
                   shadow-lg shadow-[#E5BA73]/20 hover:opacity-90 transition-all hover:-translate-y-0.5 active:scale-95">
      Pay Outstanding Balance
    </button>
  </div>
</template>