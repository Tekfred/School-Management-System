<script setup>
import { onMounted, ref } from 'vue'
const chartRef = ref(null)
const dataLoaded = ref(false)
let chartInstance = null
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
  } catch (err) {
    // Chart.js not available; fallback to simple bars
    dataLoaded.value = false
  }
})
</script>

<template>
  <div class="rounded-xl bg-white/6 p-6 backdrop-blur">
    <h3 class="font-bold mb-4">Most Popular Courses</h3>
    <div v-if="dataLoaded">
      <canvas ref="chartRef" />
    </div>
    <div v-else>
      <div class="flex flex-col gap-3">
        <div>
          <div class="flex justify-between mb-1"><span>Computer Science</span><span>90</span></div>
          <div class="h-2 bg-white/20 rounded-full"><div class="h-full bg-[#E5BA73]" style="width:90%"></div></div>
        </div>
        <div>
          <div class="flex justify-between mb-1"><span>Business</span><span>65</span></div>
          <div class="h-2 bg-white/20 rounded-full"><div class="h-full bg-[#10b981]" style="width:65%"></div></div>
        </div>
        <div>
          <div class="flex justify-between mb-1"><span>Mathematics</span><span>50</span></div>
          <div class="h-2 bg-white/20 rounded-full"><div class="h-full bg-[#3b82f6]" style="width:50%"></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
