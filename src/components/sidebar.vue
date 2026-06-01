<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name1 = ref('EduSuite');
const router = useRouter();

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

const logout = () => {
  localStorage.removeItem('loggedIn');
  router.push('/login');
};
</script>

<template>
  <aside class="hidden w-72 shrink-0 flex-col bg-[#181D31] text-white shadow-2xl shadow-[#181D31]/20 lg:flex">
    <div class="p-6">
      <div class="flex items-center gap-3">
        <div class="grid h-11 w-11 place-items-center rounded-2xl bg-[#E5BA73] text-[#181D31]">
          <span class="material-symbols-outlined">auto_stories</span>
        </div>
        <div>
          <p class="text-2xl font-bold text-white">{{ name1 }}</p>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#E5BA73]">Campus OS</p>
        </div>
      </div>
    </div>

    <div class="mx-4 rounded-2xl border border-white/10 bg-white/10 p-4">
      <p class="text-sm font-semibold text-slate-300">Level 5 Student</p>
      <div class="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div class="h-full w-[68%] rounded-full bg-[#E5BA73]"></div>
      </div>
      <div class="mt-3 flex items-center justify-between text-xs font-semibold text-slate-300">
        <span>Semester progress</span>
        <span>68%</span>
      </div>
    </div>

    <nav class="mt-6 flex-1 px-4 space-y-2">
      <router-link
        v-for="menu in menuSidebar"
        :key="menu.id"
        :to="menu.path"
        class="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        :class="{ 'bg-[#E5BA73] text-[#181D31] shadow-lg shadow-[#E5BA73]/20 hover:bg-[#E5BA73] hover:text-[#181D31]': $route.path === menu.path }"
      >
        <span class="material-symbols-outlined text-xl">{{ menu.icon }}</span>
        {{ menu.name }}
      </router-link>
    </nav>

    <div class="p-4">
      <button @click="logout" class="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
        <span class="material-symbols-outlined text-xl">logout</span>
        Logout
      </button>
    </div>
  </aside>
</template>
