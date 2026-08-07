<script setup>
import { ref, onMounted, computed } from 'vue'
import { feesData } from './Components/feesdata.js'
import FeesHeroCard from './Components/Feesherocard.vue'
import FeesBreakdown from './Components/Feesbreakdown.vue'
import PaymentHistory from './Components/Paymenthistory.vue'
import UpcomingPayments from './Components/Upcomingpayments.vue'
import ReceiptDrawer from './Components/Receiptdrawer.vue'

const root         = ref(null)
const selectedReceipt = ref(null)
const drawerOpen   = ref(false)

const openReceipt = (tx) => {
  selectedReceipt.value = tx
  drawerOpen.value = true
}
const closeReceipt = () => {
  drawerOpen.value = false
  setTimeout(() => { selectedReceipt.value = null }, 320)
}

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (!gsap) return
    gsap.from('.fees-header', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
    gsap.from('.fees-section', {
      y: 24, opacity: 0, duration: 0.55, stagger: 0.1,
      ease: 'power2.out', delay: 0.15
    })
  } catch(e) {}
})
</script>

<template>
  <div ref="root" class="min-h-full p-5 md:p-7 space-y-6 pb-28 lg:pb-8">

    <!-- Header -->
    <header class="fees-header pt-2">
      <p class="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-(--accent) mb-1">
        FINANCIAL CENTRE
      </p>
      <div class="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-3xl font-black tracking-tight heading-text leading-none"
              style="font-family:'Cormorant Garamond',Georgia,serif">
            Fees & Payments
          </h1>
          <p class="text-sm muted-text mt-1">{{ feesData.student.semester }}</p>
        </div>
        <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-(--accent) text-(--navy) text-sm font-bold shadow-lg shadow-[#E5BA73]/20 hover:opacity-90 transition-all hover:-translate-y-0.5 active:scale-95">
          <span class="material-symbols-outlined text-base">add_card</span>
          Make Payment
        </button>
      </div>
    </header>

    <!-- Hero + Breakdown -->
    <div class="fees-section grid gap-5 lg:grid-cols-[1fr_340px]">
      <FeesHeroCard :summary="feesData.summary" :student="feesData.student" />
      <FeesBreakdown :items="feesData.breakdown" />
    </div>

    <!-- History + Upcoming -->
    <div class="fees-section grid gap-5 lg:grid-cols-[1fr_320px]">
      <PaymentHistory :items="feesData.history" @view-receipt="openReceipt" />
      <UpcomingPayments :items="feesData.upcoming" />
    </div>

  </div>

  <!-- Receipt Drawer -->
  <ReceiptDrawer
    :open="drawerOpen"
    :receipt="selectedReceipt"
    :student="feesData.student"
    @close="closeReceipt"
  />
</template>