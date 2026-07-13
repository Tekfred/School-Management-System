<script setup>
import { onMounted, ref } from 'vue'
const chartRef = ref(null)
const dataLoaded = ref(false)
let chartInstance = null
const root = ref(null)
onMounted(async () => {
  try {
    const Chart = (await import('chart.js/auto')).default
    const ctx = chartRef.value.getContext('2d')
    chartInstance = new Chart(ctx, {
      type: 'bar', // visual horizontal ranking via indexAxis
      data: {
        labels: ['Computer Science','Business','Mathematics'],
        datasets: [{
          label: 'Popularity',
          data: [90, 65, 50],
          backgroundColor: ['#E5BA73','#10b981','#3b82f6']
        }]
      },
      options: { indexAxis: 'y', responsive: true }
    })
    dataLoaded.value = true
    try {
      const gsap = window.gsap
      if (gsap) gsap.from(root.value, { y: 6, opacity: 0, duration: 0.45, ease: 'power2.out' })
    } catch(e) {}
  } catch (err) {
    // Chart.js not available; fallback to simple bars
    dataLoaded.value = false
    try {
      const gsap = window.gsap
      if (gsap) gsap.from(root.value, { y: 6, opacity: 0, duration: 0.45, ease: 'power2.out' })
    } catch(e) {}
  }
})
</script>

<template>
  <div ref="root" class="surface-card p-6">
    <h3 class="heading-text mb-4 font-bold">Most Popular Courses</h3>
    <div v-if="dataLoaded">
      <canvas ref="chartRef" />
    </div>
    <div v-else>
      <div class="flex flex-col gap-3">
        <div>
          <div class="mb-1 flex justify-between text-sm"><span>Computer Science</span><span>90</span></div>
          <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div class="h-full rounded-full bg-[#E5BA73]" style="width:90%"></div></div>
        </div>
        <div>
          <div class="mb-1 flex justify-between text-sm"><span>Business</span><span>65</span></div>
          <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div class="h-full rounded-full bg-[#10b981]" style="width:65%"></div></div>
        </div>
        <div>
          <div class="mb-1 flex justify-between text-sm"><span>Mathematics</span><span>50</span></div>
          <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div class="h-full rounded-full bg-[#3b82f6]" style="width:50%"></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
