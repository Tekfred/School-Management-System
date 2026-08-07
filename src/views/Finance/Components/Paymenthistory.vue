<script setup>
import { ref, onMounted } from 'vue'

const props  = defineProps({ items: Array })
const emit   = defineEmits(['view-receipt'])
const filter = ref('all')

const methodIcon = (m) => {
  if (m === 'Mobile Money') return 'phone_iphone'
  if (m === 'Bank Transfer') return 'account_balance'
  return 'payments'
}

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) gsap.from('.tx-row', { y: 10, opacity: 0, duration: 0.4, stagger: 0.07, delay: 0.3, ease: 'power2.out' })
  } catch(e) {}
})
</script>

<template>
  <div class="surface-card rounded-3xl p-6">

    <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
      <div>
        <h3 class="text-sm font-bold heading-text">Payment History</h3>
        <p class="text-xs muted-text mt-0.5">{{ items.length }} transactions</p>
      </div>
      <span class="material-symbols-outlined text-xl text-(--accent)">history</span>
    </div>

    <!-- Table header -->
    <div class="hidden md:grid grid-cols-[1fr_130px_110px_90px] gap-4 px-3 pb-2 border-b border-(--surface-border)">
      <span class="text-[0.68rem] font-bold uppercase tracking-widest muted-text">Description</span>
      <span class="text-[0.68rem] font-bold uppercase tracking-widest muted-text">Method</span>
      <span class="text-[0.68rem] font-bold uppercase tracking-widest muted-text text-right">Amount</span>
      <span class="text-[0.68rem] font-bold uppercase tracking-widest muted-text text-right">Receipt</span>
    </div>

    <!-- Rows -->
    <ul class="flex flex-col divide-y divide-(--surface-border)">
      <li
        v-for="tx in items"
        :key="tx.id"
        class="tx-row md:grid md:grid-cols-[1fr_130px_110px_90px] gap-4 px-3 py-3.5 items-center
               hover:bg-(--surface-muted) rounded-xl transition-colors cursor-pointer group"
        @click="emit('view-receipt', tx)"
      >
        <!-- Description -->
        <div>
          <p class="text-sm font-semibold body-text">{{ tx.desc }}</p>
          <p class="text-xs muted-text mt-0.5">
            {{ new Date(tx.date).toLocaleDateString('en-GH', {day:'numeric',month:'short',year:'numeric'}) }}
            · {{ tx.ref }}
          </p>
        </div>

        <!-- Method -->
        <div class="flex items-center gap-1.5 mt-2 md:mt-0">
          <span class="material-symbols-outlined text-sm text-(--accent)">{{ methodIcon(tx.method) }}</span>
          <span class="text-xs body-text">{{ tx.method }}</span>
        </div>

        <!-- Amount -->
        <p class="text-sm font-black text-right mt-2 md:mt-0"
           style="font-family:'Cormorant Garamond',Georgia,serif;color:#34D399">
          +GHS {{ tx.amount.toLocaleString('en-GH', {minimumFractionDigits:2}) }}
        </p>

        <!-- Receipt button -->
        <div class="flex justify-end mt-2 md:mt-0">
          <button
            class="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg
                   border border-(--surface-border) muted-text
                   group-hover:border-(--accent) group-hover:text-(--accent)
                   transition-all duration-200"
            @click.stop="emit('view-receipt', tx)"
          >
            <span class="material-symbols-outlined text-sm">download</span>
            View
          </button>
        </div>
      </li>
    </ul>

  </div>
</template>