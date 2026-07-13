<script setup>
import { ref, onMounted } from 'vue'
defineProps({ items: Array })
const root = ref(null)

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap)
      gsap.from(root.value?.querySelectorAll('.avail-row'), { y: 6, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' })
  } catch (e) {}
})
</script>

<template>
  <div ref="root" class="p-5 surface-card rounded-2xl">

    <div class="flex items-center justify-between mb-4">
      <h4 class="text-sm font-bold heading-text">Availability</h4>
      <span class="material-symbols-outlined text-xl text-(--accent)">event_available</span>
    </div>

    <div class="flex flex-col gap-3">
      <div
        v-for="a in items"
        :key="a.name"
        class="avail-row p-3.5 rounded-xl bg-(--surface-muted) border border-(--surface-border)"
      >
        <p class="mb-2 text-sm font-bold body-text">{{ a.name }}</p>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="slot in a.slots"
            :key="slot"
            class="text-xs font-semibold px-3 py-1 rounded-full bg-[#3D2C0A] text-(--accent) border border-[rgba(229,186,115,0.25)] tracking-wide"
          >{{ slot }}</span>
        </div>
      </div>
    </div>

  </div>
</template>