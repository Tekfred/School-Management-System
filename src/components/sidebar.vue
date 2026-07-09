<script setup>
import { ref } from 'vue';
import { useUiStore } from '@/stores/uistore';

const name1 = ref('EduSuite');
const uiStore = useUiStore();

const menuSidebar = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/app/dashboard',
    icon: 'dashboard',
  },
  {
    id: 2,
    name: 'Courses',
    path: '/app/students',
    icon: 'menu_book',
  },
  {
    id: 3,
    name: 'Lecturers',
    path: '/app/teachers',
    icon: 'school',
  },
  {
    id: 4,
    name: 'Fees',
    path: '/app/finance',
    icon: 'account_balance_wallet',
  },
  {
    id: 5,
    name: 'Settings',
    path: '/app/settings',
    icon: 'settings',
  },
];
</script>

<template>
  <aside
    class="hidden shrink-0 flex-col border-r border-white/10 bg-[#0d1528] text-white shadow-2xl shadow-[#181D31]/20 transition-all duration-300 ease-out dark:bg-[#0b1222] lg:flex"
    :class="uiStore.isSidebarOpen ? 'w-72' : 'w-24'"
  >
    <div class="p-6">
      <div class="flex items-center gap-3" :class="uiStore.isSidebarOpen ? 'justify-between' : 'justify-center'">
        <div class="flex min-w-0 items-center gap-3">
          <div class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#E5BA73] text-[#181D31]">
            <span class="material-symbols-outlined">auto_stories</span>
          </div>

          <div v-if="uiStore.isSidebarOpen" class="min-w-0">
            <p class="text-2xl font-bold text-white">{{ name1 }}</p>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#E5BA73]">Campus OS</p>
          </div>
        </div>

        <button
          type="button"
          @click="uiStore.toggleSidebar"
          class="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/10 text-slate-300 transition hover:border-white/20 hover:bg-white/15 hover:text-white"
          :aria-label="uiStore.isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <span class="material-symbols-outlined text-xl transition-transform" :class="{ 'rotate-180': !uiStore.isSidebarOpen }">keyboard_double_arrow_left</span>
        </button>
      </div>
    </div>

    <div v-if="uiStore.isSidebarOpen" class="mx-4 rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-inner shadow-white/5">
      <p class="text-sm font-semibold text-slate-300">Level 5 Student</p>
      <div class="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div class="h-full w-[68%] rounded-full bg-[#E5BA73]"></div>
      </div>
      <div class="mt-3 flex items-center justify-between text-xs font-semibold text-slate-300">
        <span>Semester progress</span>
        <span>68%</span>
      </div>
    </div>

    <div v-else class="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-sm font-bold text-[#E5BA73]">
      68%
    </div>

    <nav class="mt-6 flex-1 space-y-2" :class="uiStore.isSidebarOpen ? 'px-4' : 'px-3'">
      <router-link
        v-for="menu in menuSidebar"
        :key="menu.id"
        :to="menu.path"
        class="group relative flex items-center rounded-2xl border border-transparent font-semibold text-slate-300 transition hover:border-white/10 hover:bg-white/10 hover:text-white"
        :class="[
          uiStore.isSidebarOpen ? 'gap-3 px-4 py-3' : 'justify-center px-0 py-3',
          $route.path === menu.path ? 'bg-[#E5BA73] text-[#181D31] shadow-lg shadow-[#E5BA73]/20 hover:bg-[#E5BA73] hover:text-[#181D31]' : ''
        ]"
      >
        <span class="material-symbols-outlined text-xl">{{ menu.icon }}</span>
        <span v-if="uiStore.isSidebarOpen">{{ menu.name }}</span>
        <span
          v-else
          class="pointer-events-none absolute left-full z-50 ml-3 rounded-lg bg-[#111827] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-xl transition group-hover:opacity-100"
        >
          {{ menu.name }}
        </span>
      </router-link>
    </nav>
  </aside>
</template>
