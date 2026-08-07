<script setup>
import { onMounted } from 'vue'
defineProps({ items: Array })

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from('.breakdown-row', { x: 12, opacity: 0, duration: 0.4, stagger: 0.06, delay: 0.4, ease: 'power2.out' })
  } catch(e) {}
})
</script>

<template>
  <div class="surface-card rounded-3xl p-6 flex flex-col">
    <div class="flex items-center justify-between mb-5">
      <h3 class="text-sm font-bold heading-text">Fee Breakdown</h3>
      <span class="material-symbols-outlined text-xl text-(--accent)">receipt_long</span>
    </div>

    <ul class="flex-1 flex flex-col divide-y divide-(--surface-border)">
      <li
        v-for="item in items"
        :key="item.id"
        class="breakdown-row flex items-center justify-between py-3 gap-3"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <span
            class="w-2 h-2 rounded-full shrink-0"
            :class="item.paid ? 'bg-[#34D399]' : 'bg-[#F87171]'"
          ></span>
          <span class="text-sm body-text truncate">{{ item.label }}</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-sm font-bold heading-text">
            GHS {{ item.amount.toLocaleString('en-GH', {minimumFractionDigits:2}) }}
          </span>
          <span
            class="text-[0.62rem] font-bold px-2 py-0.5 rounded-full"
            :class="item.paid
              ? 'bg-[#14362A] text-[#34D399]'
              : 'bg-[#3B1212] text-[#F87171]'"
          >{{ item.paid ? 'Paid' : 'Due' }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>