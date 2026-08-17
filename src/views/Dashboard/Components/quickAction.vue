<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
})

function handleAction(action) {
  if (action.route) {
    router.push(action.route)
  } else {
    console.log('Quick action clicked:', action.name)
  }
}

onMounted(async () => {
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from('.qa-header', { y: 12, opacity: 0, duration: 0.5, ease: 'power3.out' })
      gsap.from('.qa-card', {
        y: 16, opacity: 0, duration: 0.45,
        stagger: 0.08, ease: 'power2.out', delay: 0.2,
      })
    }
  } catch (e) {}
})
</script>

<template>
  <div class="surface-card rounded-3xl p-6 shadow-xl shadow-slate-200/70 dark:shadow-black/20">
    <div class="qa-header flex items-center justify-between mb-5">
      <div>
        <h3 class="text-lg font-bold heading-text">Quick Actions</h3>
        <p class="text-sm muted-text mt-0.5">Frequent student tasks</p>
      </div>
      <span class="material-symbols-outlined rounded-xl bg-(--accent)/20 p-2 text-(--accent)">bolt</span>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
      <div
        v-for="action in actions"
        :key="action.id"
        @click="handleAction(action)"
        role="button"
        tabindex="0"
        class="qa-card interactive-surface surface-card rounded-2xl p-4 cursor-pointer transition-all duration-200 group"
        :style="{ animationDelay: `${(action.id - 1) * 0.1}s` }"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex items-center justify-center shadow-sm h-11 w-11 rounded-xl transition-all duration-200 group-hover:scale-110"
            :class="action.bgColor || ''"
            :style="{
              backgroundColor: action.bgHex || undefined,
              color: action.textHex || undefined,
            }"
          >
            <span
              class="material-symbols-outlined text-2xl"
              :class="action.textColor || ''"
              :style="action.textHex ? { color: action.textHex } : undefined"
            >
              {{ action.icon }}
            </span>
          </div>
          <div class="min-w-0 flex-1">
            <div class="font-bold heading-text">{{ action.name }}</div>
            <div class="text-xs muted-text">{{ action.description }}</div>
          </div>
          <span
            class="material-symbols-outlined text-lg opacity-0 text-(--subtle-text) transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1"
          >arrow_forward</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
