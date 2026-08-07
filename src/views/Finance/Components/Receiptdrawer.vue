<script setup>
import { watch } from 'vue'

const props = defineProps({
  open:    Boolean,
  receipt: Object,
  student: Object,
})
const emit = defineEmits(['close'])

// Lock body scroll when drawer is open
watch(() => props.open, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

const methodIcon = (m) => {
  if (m === 'Mobile Money')  return 'phone_iphone'
  if (m === 'Bank Transfer') return 'account_balance'
  return 'payments'
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        @click="emit('close')"
      ></div>
    </Transition>

    <!-- Drawer panel -->
    <Transition name="slide">
      <aside
        v-if="open && receipt"
        class="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col"
        style="background: var(--surface-strong); border-left: 1px solid var(--surface-border); box-shadow: var(--surface-shadow)"
      >
        <!-- Drawer header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-(--surface-border)">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-(--accent) text-(--navy) grid place-items-center">
              <span class="material-symbols-outlined text-lg">receipt_long</span>
            </div>
            <div>
              <p class="text-sm font-bold heading-text">Payment Receipt</p>
              <p class="text-xs muted-text">{{ receipt.id }}</p>
            </div>
          </div>
          <button
            @click="emit('close')"
            class="w-8 h-8 rounded-xl grid place-items-center border border-(--surface-border)
                   muted-text hover:border-(--surface-border-strong) hover:text-(--heading)
                   transition-all duration-200"
          >
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <!-- Receipt body -->
        <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          <!-- Status banner -->
          <div class="flex items-center gap-3 p-4 rounded-2xl bg-[#14362A] border border-[rgba(52,211,153,0.2)]">
            <div class="w-10 h-10 rounded-xl bg-[rgba(52,211,153,0.15)] grid place-items-center">
              <span class="material-symbols-outlined text-xl" style="color:#34D399">check_circle</span>
            </div>
            <div>
              <p class="text-sm font-bold" style="color:#34D399">Payment Confirmed</p>
              <p class="text-xs mt-0.5" style="color:#34D399;opacity:0.7">
                {{ new Date(receipt.date).toLocaleDateString('en-GH', {weekday:'long', day:'numeric', month:'long', year:'numeric'}) }}
              </p>
            </div>
          </div>

          <!-- Amount hero -->
          <div class="text-center py-4">
            <p class="text-xs muted-text font-semibold tracking-widest uppercase mb-1">Amount Paid</p>
            <p class="text-5xl font-black heading-text"
               style="font-family:'Cormorant Garamond',Georgia,serif">
              GHS {{ receipt.amount.toLocaleString('en-GH', {minimumFractionDigits:2}) }}
            </p>
          </div>

          <!-- Receipt details -->
          <div class="space-y-3 p-4 rounded-2xl bg-(--surface-muted) border border-(--surface-border)">
            <p class="text-[0.68rem] font-bold uppercase tracking-widest muted-text mb-3">Receipt Details</p>

            <div class="flex justify-between items-start py-2 border-b border-(--surface-border)">
              <span class="text-xs muted-text">Description</span>
              <span class="text-xs font-semibold body-text text-right max-w-[55%]">{{ receipt.desc }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-(--surface-border)">
              <span class="text-xs muted-text">Reference</span>
              <span class="text-xs font-mono font-semibold body-text">{{ receipt.ref }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-(--surface-border)">
              <span class="text-xs muted-text">Payment Method</span>
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-(--accent)">{{ methodIcon(receipt.method) }}</span>
                <span class="text-xs font-semibold body-text">{{ receipt.method }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-xs muted-text">Date</span>
              <span class="text-xs font-semibold body-text">
                {{ new Date(receipt.date).toLocaleDateString('en-GH', {day:'numeric',month:'short',year:'numeric'}) }}
              </span>
            </div>
          </div>

          <!-- Student details -->
          <div class="space-y-3 p-4 rounded-2xl bg-(--surface-muted) border border-(--surface-border)">
            <p class="text-[0.68rem] font-bold uppercase tracking-widest muted-text mb-3">Student Details</p>
            <div class="flex justify-between py-2 border-b border-(--surface-border)">
              <span class="text-xs muted-text">Full Name</span>
              <span class="text-xs font-semibold body-text">{{ student.name }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-(--surface-border)">
              <span class="text-xs muted-text">Student ID</span>
              <span class="text-xs font-mono font-semibold body-text">{{ student.id }}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-xs muted-text">Programme</span>
              <span class="text-xs font-semibold body-text">{{ student.program }}</span>
            </div>
          </div>

          <!-- Watermark / seal -->
          <div class="flex flex-col items-center py-4 gap-2 opacity-40">
            <div class="w-12 h-12 rounded-2xl bg-(--accent) text-(--navy) grid place-items-center">
              <span class="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <p class="text-xs muted-text font-semibold tracking-widest uppercase">EduSuite · Campus OS</p>
            <p class="text-[0.6rem] muted-text">Official Payment Record</p>
          </div>

        </div>

        <!-- Footer actions -->
        <div class="px-6 py-4 border-t border-(--surface-border) flex gap-3">
          <button class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-(--surface-border) text-sm font-semibold body-text hover:border-(--surface-border-strong) transition-all">
            <span class="material-symbols-outlined text-base">share</span>
            Share
          </button>
          <button class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-(--accent) text-(--navy) text-sm font-bold shadow-lg shadow-[#E5BA73]/20 hover:opacity-90 transition-all active:scale-95">
            <span class="material-symbols-outlined text-base">download</span>
            Download PDF
          </button>
        </div>

      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

/* Drawer slide from right */
.slide-enter-active { transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1); }
.slide-leave-active { transition: transform 0.28s cubic-bezier(0.4, 0, 1, 1); }
.slide-enter-from   { transform: translateX(100%); }
.slide-leave-to     { transform: translateX(100%); }
</style>