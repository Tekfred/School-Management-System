<script setup>
import {ref, } from 'vue';
import { useRouter } from 'vue-router';

const name1 = ref('EduSuite')
const router = useRouter();

const menuSidebar = [
    {
        id:1,
        name: 'Dashboard',
        path:'/app/dashboard',
        icon:''
    },
    {
        id:2,
        name: 'Students',
        path:'/app/students',
        icon:''
    },
    {
        id:3,
        name: 'Teachers',
        path:'/app/teachers',
        icon:''
    },
    {
        id:4,
        name: 'Finance',
        path:'/app/finance',
        icon:''
    },
    {
        id:5,
        name: 'Settings',
        path:'/app/settings',
        icon:''
    }
]

const logout = () => {
  localStorage.removeItem('loggedIn');
  router.push('/login');
}

</script>

<template>
    <aside class="w-60 bg-[#181D31] text-white flex flex-col">
      <div class="p-6 text-2xl font-bold text-[#E5BA73]">{{name1}}</div>
      
      <nav class="flex-1 px-4 space-y-2">
        <router-link v-for="menu in menuSidebar" :key="menu.id" :to="menu.path" class="block py-2.5 px-4 rounded hover:bg-[#5e688f] font-semibold transition" :class="{ 'bg-[#5e688f]': $route.path === menu.path }"
        > <span>{{ menu.icon }}</span>
          {{menu.name}}


        </router-link>
      </nav>

      <button @click="logout" class="p-6 text-center hover:text-[#E5BA73] transition">
        Logout 
      </button>
    </aside>
</template>