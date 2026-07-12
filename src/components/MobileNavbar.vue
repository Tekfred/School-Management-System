<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: 'Dashboard', icon: 'dashboard',             to: '/app/dashboard' },
  { label: 'Courses',   icon: 'menu_book',              to: '/app/students'  },
  { label: 'Lecturers', icon: 'school',                 to: '/app/teachers'  },
  { label: 'Fees',      icon: 'account_balance_wallet', to: '/app/finance'   },
]

const isActive = (item) => route.path === item.to

const iconStyle = (item) => ({
  fontVariationSettings: isActive(item)
    ? '"FILL" 1, "wght" 600, "GRAD" 0, "opsz" 24'
    : '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24'
})
</script>

<template>
  <nav class="fixed bottom-0 z-50 bg-transparent left-4 right-4 b lg:hidden">
    <div class="nav-pill flex items-center justify-around px-2 py-2 rounded-[28px]">

      <RouterLink 
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-item relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 no-underline"
      >
        <!-- Active glow pill -->
        <span v-if="isActive(item)" class="absolute inset-0 rounded-2xl bg-[#E5BA73]/15"></span>

        <!-- Icon -->
        <span
          class="material-symbols-outlined text-[22px] leading-none relative z-10 transition-all duration-200"
          :class="isActive(item) ? 'text-[#E5BA73]' : 'text-(--subtle-text)'"
          :style="iconStyle(item)"
        >{{ item.icon }}</span>

        <!-- Label -->
        <span
          class="text-[10px] font-semibold leading-none tracking-wide relative z-10 transition-all duration-200"
          :class="isActive(item) ? 'text-[#E5BA73]' : 'text-(--subtle-text)'"
        >{{ item.label }}</span>

      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.nav-pill {
  background: var(--surface);
  border: 1px solid var(--surface-border);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.nav-item:active {
  transform: scale(0.9);
}
</style>