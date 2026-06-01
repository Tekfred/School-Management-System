<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import image from '@/assets/images/profile_img_3.png';
import { useThemeStore } from '../stores/themeS';

const profileDropdownOpen = ref(false);

const themeStore = useThemeStore();
const router = useRouter();

const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value;
};

const handleLogout = () => {
  localStorage.removeItem('loggedIn');
  profileDropdownOpen.value = false;
  router.push('/login');
};

const closeDropdown = () => {
  profileDropdownOpen.value = false;
};
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-[#0b1120]/85">
    <div class="flex flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#b8860b] dark:text-[#E5BA73]">School Overview</p>
        <h1 class="mt-1 text-2xl font-bold text-[#181D31] dark:text-white">Student Command Center</h1>
      </div>

      <div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:max-w-3xl lg:justify-end">
        <label class="relative flex-1 lg:max-w-md">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">search</span>
          <input
            type="search"
            class="h-11 w-full rounded-2xl border border-slate-200 bg-[#f6f6f8] py-2 pl-12 pr-4 text-sm font-medium text-[#181D31] outline-none transition focus:border-[#E5BA73] focus:ring-4 focus:ring-[#E5BA73]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            placeholder="Search courses, assignments, lecturers..."
          >
        </label>

        <div class="flex items-center justify-between gap-3 sm:justify-end">
          <button
            type="button"
            @click="themeStore.toggleTheme"
            class="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-slate-500 transition hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
            :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <span
              class="material-symbols-outlined rounded-full p-1 text-xl transition"
              :class="themeStore.isDark ? 'text-slate-500' : 'bg-white text-amber-500 shadow-sm'"
            >light_mode</span>
            <span
              class="material-symbols-outlined rounded-full p-1 text-xl transition"
              :class="themeStore.isDark ? 'bg-[#181D31] text-white shadow-sm' : 'text-slate-400'"
            >dark_mode</span>
          </button>

          <button class="relative grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Notifications">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#E5BA73] ring-2 ring-white dark:ring-[#0b1120]"></span>
          </button>

          <div class="relative">
            <button @click="toggleProfileDropdown" class="flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-900">
              <img :src="image" alt="profile" class="h-10 w-10 rounded-full object-cover ring-2 ring-[#E5BA73]/50">
              <div class="hidden flex-col text-left text-sm sm:flex">
                <span class="font-bold text-[#181D31] dark:text-white">Audi Mensah</span>
                <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Computer Science</span>
              </div>
              <span class="material-symbols-outlined text-slate-400">expand_more</span>
            </button>

            <div v-if="profileDropdownOpen" class="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 z-50 dark:border-slate-700 dark:bg-slate-950 dark:shadow-black/20">
              <div class="py-2">
                <button @click="closeDropdown" class="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">
                  <span class="material-symbols-outlined text-lg">account_circle</span>
                  <span>Student Profile</span>
                </button>

                <button @click="closeDropdown" class="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900">
                  <span class="material-symbols-outlined text-lg">settings</span>
                  <span>Settings</span>
                </button>

                <button @click="handleLogout" class="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30">
                  <span class="material-symbols-outlined text-lg">logout</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
