<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import image from '@/assets/images/profile_img_3.png'
import { useThemeStore } from '../stores/themeS'

const profileDropdownOpen = ref(false)
const themeStore = useThemeStore()
const router     = useRouter()
const route      = useRoute()

// Dynamic page title based on current route
const pageTitles = {
  '/app/dashboard': 'Student Command Center',
  '/app/students':  'Courses',
  '/app/teachers':  'Lecturers',
  '/app/finance':   'Fees & Payments',
  '/app/settings':  'Settings',
  '/app/submit':    'Submit Work',
  '/app/results':   'View Results',
}
const pageTitle = () => pageTitles[route.path] ?? 'EduSuite'

const toggleProfileDropdown = () => { profileDropdownOpen.value = !profileDropdownOpen.value }
const closeDropdown         = () => { profileDropdownOpen.value = false }
const handleLogout = () => {
  localStorage.removeItem('loggedIn')
  profileDropdownOpen.value = false
  router.push('/login')
}
</script>

<template>
  <!-- Fixed extra > removed from header tag -->
  <header class="sticky top-0 z-40 border-b border-(--surface-border) bg-(--surface)/88 shadow-[0_10px_30px_rgba(24,29,49,0.05)] backdrop-blur-xl dark:bg-(--app-bg-soft)/88 dark:shadow-black/20">
    <div class="flex items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">

      <!-- Left: page title -->
      <div class="min-w-0">
        <p class="accent-text text-[0.65rem] font-bold uppercase tracking-[0.18em] hidden sm:block">School Overview</p>
        <h1 class="text-lg font-bold leading-tight truncate heading-text md:text-xl lg:text-2xl">
          {{ pageTitle() }}
        </h1>
      </div>

      <!-- Right: search + controls — always single row -->
      <div class="flex items-center gap-2 md:gap-3 shrink-0">

        <!-- Search — hidden on mobile, visible md+ -->
        <label class="relative hidden md:block md:w-56 lg:w-80">
          <span class="absolute text-lg -translate-y-1/2 material-symbols-outlined left-3 top-1/2 text-slate-400">search</span>
          <input
            type="search"
            class="h-10 w-full rounded-2xl border border-(--surface-border) bg-(--surface-muted) py-2 pl-10 pr-4 text-sm font-medium text-(--heading) outline-none transition placeholder:text-slate-400 focus:border-[#E5BA73] focus:ring-4 focus:ring-[#E5BA73]/20 dark:placeholder:text-slate-500"
            placeholder="Search courses, assignments..."
          />
        </label>

        <!-- Mobile search icon (opens nothing for now — placeholder) -->
        <button class="grid h-10 w-10 place-items-center rounded-2xl border border-(--surface-border) bg-(--surface-muted) text-slate-500 transition hover:border-(--surface-border-strong) md:hidden">
          <span class="text-xl material-symbols-outlined">search</span>
        </button>

        <!-- Theme toggle -->
        <button
          type="button"
          @click="themeStore.toggleTheme"
          class="flex items-center gap-0.5 rounded-full border border-(--surface-border) bg-(--surface-muted) p-1 text-slate-500 transition hover:border-(--surface-border-strong)"
          :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <span
            class="p-1 text-lg transition rounded-full material-symbols-outlined"
            :class="themeStore.isDark ? 'text-slate-500' : 'bg-(--surface) text-(--accent) shadow-sm'"
          >light_mode</span>
          <span
            class="p-1 text-lg transition rounded-full material-symbols-outlined"
            :class="themeStore.isDark ? 'bg-(--accent) text-(--navy) shadow-sm' : 'text-slate-400'"
          >dark_mode</span>
        </button>

        <!-- Notifications -->
        <button
          class="relative grid h-10 w-10 place-items-center rounded-full border border-(--surface-border) bg-(--surface-muted) text-slate-600 transition hover:border-(--surface-border-strong) dark:text-slate-300"
          aria-label="Notifications"
        >
          <span class="text-xl material-symbols-outlined">notifications</span>
          <span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#E5BA73] ring-2 ring-white dark:ring-[#0b1120]"></span>
        </button>

        <!-- Profile -->
        <div class="relative">
          <button
            @click="toggleProfileDropdown"
            class="flex cursor-pointer items-center gap-2 rounded-2xl border border-transparent px-1.5 py-1 transition hover:border-(--surface-border) hover:bg-(--surface-muted)"
          >
            <img :src="image" alt="profile" class="h-9 w-9 rounded-full object-cover ring-2 ring-[#E5BA73]/50 md:h-10 md:w-10">
            <!-- Name hidden on mobile -->
            <div class="flex-col hidden text-sm text-left lg:flex">
              <span class="font-bold heading-text">Audi Mensah</span>
              <span class="text-xs font-medium muted-text">Computer Science</span>
            </div>
            <span class="text-lg material-symbols-outlined text-slate-400">expand_more</span>
          </button>

          <!-- Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="profileDropdownOpen"
              v-click-outside="closeDropdown"
              class="absolute right-0 z-50 w-52 mt-2 overflow-hidden rounded-2xl border border-(--surface-border) bg-(--surface-strong) shadow-(--surface-shadow)"
            >
              <div class="py-1.5">
                <button @click="closeDropdown" class="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-semibold body-text transition hover:bg-(--surface-muted)">
                  <span class="text-lg material-symbols-outlined text-(--accent)">account_circle</span>
                  Student Profile
                </button>
                <button @click="closeDropdown" class="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-semibold body-text transition hover:bg-(--surface-muted)">
                  <span class="text-lg material-symbols-outlined text-(--accent)">settings</span>
                  Settings
                </button>
                <div class="my-1 h-px bg-(--surface-border)"></div>
                <button @click="handleLogout" class="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-left text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30">
                  <span class="text-lg material-symbols-outlined">logout</span>
                  Logout
                </button>
              </div>
            </div>
          </Transition>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
.dropdown-enter-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.dropdown-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; }
.dropdown-enter-from,
.dropdown-leave-to     { opacity: 0; transform: translateY(-6px) scale(0.97); }
</style>