<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
})

function handleAction(action) {
  if (action.route) {
    // navigate to a route; if route doesn't exist yet, this will fail in runtime — used as example
    router.push(action.route)
  } else {
    console.log('Quick action clicked:', action.name)
  }
}

</script>

<template>
  <div class="rounded-2xl bg-white/90 p-5 shadow-xl shadow-slate-200/70 dark:bg-[#0f172a] dark:shadow-black/20">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-bold text-[#181D31] dark:text-white">Quick Actions</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">Frequent student tasks</p>
      </div>
      <span class="material-symbols-outlined rounded-xl bg-[#E5BA73]/20 p-2 text-[#b8860b]">bolt</span>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
      <div
        v-for="action in actions"
        :key="action.id"
        @click="handleAction(action)"
        role="button"
        tabindex="0"
        class="group rounded-xl p-4 text-left cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md dark:ring-1 dark:ring-white/10"
        :class="['animate-pop-in', action.bgColor ? action.bgColor : '']"
        :style="{
          ...(action.bgHex ? { backgroundColor: action.bgHex } : {}),
          animationDelay: `${(action.id - 1) * 0.15}s`
        }"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 shadow-sm">
            <span
              :class="['material-symbols-outlined', action.textColor ? action.textColor : '']"
              :style="action.textHex ? { color: action.textHex } : null"
              class="text-2xl"
            >
              {{ action.icon }}
            </span>
          </div>
          <div class="min-w-0">
            <div :style="action.textHex ? { color: action.textHex } : null" class="font-bold">{{ action.name }}</div>
            <div class="text-xs font-medium text-slate-500 dark:text-slate-600">{{ action.description }}</div>
          </div>
          <span class="material-symbols-outlined ml-auto text-lg opacity-0 transition group-hover:opacity-60">arrow_forward</span>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-pop-in {
  animation: popIn 0.45s ease-out forwards;
  opacity: 0;
}
</style>
