<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  summary: Object,
  student: Object,
})

// Arc math
const SIZE   = 220
const STROKE = 14
const R      = (SIZE - STROKE) / 2
const CIRC   = 2 * Math.PI * R

const pct = computed(() => props.summary.totalPaid / props.summary.totalFees)

// Animated counter
const displayPaid = ref(0)
const displayPct  = ref(0)
const arcOffset   = ref(CIRC) // starts fully hidden

const fmt = (n) => 'GHS ' + n.toLocaleString('en-GH', { minimumFractionDigits: 2 })

const statusMap = {
  paid:    { label: 'Fully Paid',    bg: '#14362A', text: '#34D399', dot: '#34D399' },
  partial: { label: 'Partial',       bg: '#3D2C0A', text: '#E5BA73', dot: '#E5BA73' },
  overdue: { label: 'Overdue',       bg: '#3B1212', text: '#F87171', dot: '#F87171' },
}

const status = computed(() => statusMap[props.summary.status] || statusMap.partial)

onMounted(() => {
  // Native counter + arc — works even without GSAP
  const duration = 1400
  const start    = performance.now()
  const targetPaid = props.summary.totalPaid
  const targetPct  = pct.value * 100
  const targetArc  = CIRC * (1 - pct.value)

  const tick = (now) => {
    const elapsed = Math.min((now - start) / duration, 1)
    // ease out cubic
    const ease = 1 - Math.pow(1 - elapsed, 3)

    displayPaid.value  = Math.round(targetPaid  * ease)
    displayPct.value   = Math.round(targetPct   * ease)
    arcOffset.value    = CIRC - (CIRC - targetArc) * ease

    if (elapsed < 1) requestAnimationFrame(tick)
    else {
      displayPaid.value = targetPaid
      displayPct.value  = Math.round(targetPct)
      arcOffset.value   = targetArc
    }
  }

  // Short delay for entrance animation
  setTimeout(() => requestAnimationFrame(tick), 400)

  // GSAP for the card itself
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from('.hero-stat', { y: 10, opacity: 0, duration: 0.4, stagger: 0.08, delay: 0.3, ease: 'power2.out' })
    }
  } catch(e) {}
})
</script>

<template>
  <div class="surface-card rounded-3xl p-6 md:p-8 relative overflow-hidden">

    <!-- Subtle background pattern -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]"
         style="background-image: radial-gradient(circle, var(--heading) 1px, transparent 1px); background-size: 28px 28px;">
    </div>

    <div class="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">

      <!-- Arc -->
      <div class="relative shrink-0 flex items-center justify-center" :style="`width:${SIZE}px;height:${SIZE}px`">
        <svg :width="SIZE" :height="SIZE" class="-rotate-90">
          <!-- Track -->
          <circle
            :cx="SIZE/2" :cy="SIZE/2" :r="R"
            fill="none"
            stroke="var(--surface-muted)"
            :stroke-width="STROKE"
            stroke-linecap="round"
          />
          <!-- Fill -->
          <circle
            :cx="SIZE/2" :cy="SIZE/2" :r="R"
            fill="none"
            stroke="#E5BA73"
            :stroke-width="STROKE"
            stroke-linecap="round"
            :stroke-dasharray="CIRC"
            :stroke-dashoffset="arcOffset"
            style="transition: stroke-dashoffset 0.05s linear; filter: drop-shadow(0 0 8px rgba(229,186,115,0.5))"
          />
        </svg>

        <!-- Centre text -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span class="text-4xl font-black heading-text leading-none"
                style="font-family:'Cormorant Garamond',Georgia,serif">
            {{ displayPct }}%
          </span>
          <span class="text-xs muted-text font-semibold mt-1 tracking-wide">PAID</span>
          <span
            class="mt-2 text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full"
            :style="{ background: status.bg, color: status.text }"
          >{{ status.label }}</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex-1 w-full">
        <div class="mb-5">
          <p class="text-xs muted-text font-semibold tracking-widest uppercase mb-0.5">Student</p>
          <p class="text-lg font-bold heading-text">{{ student.name }}</p>
          <p class="text-xs muted-text">{{ student.id }} · {{ student.program }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Total Fees -->
          <div class="hero-stat p-4 rounded-2xl bg-(--surface-muted) border border-(--surface-border)">
            <p class="text-[0.68rem] muted-text font-semibold uppercase tracking-wider mb-1">Total Fees</p>
            <p class="text-xl font-black heading-text leading-none"
               style="font-family:'Cormorant Garamond',Georgia,serif">
              {{ 'GHS ' + summary.totalFees.toLocaleString('en-GH', {minimumFractionDigits:2}) }}
            </p>
          </div>

          <!-- Amount Paid -->
          <div class="hero-stat p-4 rounded-2xl bg-[#14362A] border border-[rgba(52,211,153,0.15)]">
            <p class="text-[0.68rem] font-semibold uppercase tracking-wider mb-1" style="color:#34D399">Amount Paid</p>
            <p class="text-xl font-black leading-none" style="color:#34D399;font-family:'Cormorant Garamond',Georgia,serif">
              GHS {{ displayPaid.toLocaleString('en-GH', {minimumFractionDigits:2}) }}
            </p>
          </div>

          <!-- Outstanding -->
          <div class="hero-stat p-4 rounded-2xl bg-[#3B1212] border border-[rgba(248,113,113,0.15)]">
            <p class="text-[0.68rem] font-semibold uppercase tracking-wider mb-1" style="color:#F87171">Outstanding</p>
            <p class="text-xl font-black leading-none" style="color:#F87171;font-family:'Cormorant Garamond',Georgia,serif">
              {{ 'GHS ' + summary.outstanding.toLocaleString('en-GH', {minimumFractionDigits:2}) }}
            </p>
            <p class="text-[0.62rem] mt-1" style="color:#F87171;opacity:0.7">
              Due {{ new Date(summary.dueDate).toLocaleDateString('en-GH', {day:'numeric',month:'short',year:'numeric'}) }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>