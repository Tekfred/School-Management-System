<script setup>
import { ref, onMounted } from 'vue'
defineProps({ items: Array })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap
    const cards = root.value?.querySelectorAll('article')
    if (cards && cards.length && gsap) gsap.from(cards, { y: 10, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <section ref="root">
    <h3 class="text-lg font-bold mb-4">Lecturer Directory</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <article v-for="l in items" :key="l.id" class="bg-white dark:bg-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl transition">
        <div class="flex items-center gap-4">
          <img v-if="l.image" :src="l.image" alt="avatar" class="w-16 h-16 rounded-full object-cover" />
          <div v-else class="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">👨🏾‍🏫</div>
          <div class="flex-1">
            <h4 class="font-bold text-lg">{{ l.name }}</h4>
            <p class="text-sm text-slate-500">{{ l.department }}</p>
            <div class="mt-2 text-sm text-slate-500">{{ l.courses }} Courses • <span class="text-yellow-500">★ {{ l.rating }}</span></div>
          </div>
          <div class="text-sm text-slate-500 text-right">
            <div class="mb-2">Status</div>
            <div :class="['px-3 py-1 rounded-full text-xs font-semibold', l.status === 'Available' ? 'bg-green-100 text-green-800' : l.status === 'In Class' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800']">{{ l.status }}</div>
            <button class="mt-3 w-full rounded-md bg-[#E5BA73] text-black px-3 py-2">View Profile</button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
img { width: 64px; height: 64px; border-radius: 9999px; }
</style>