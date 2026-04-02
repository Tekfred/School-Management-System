<script setup>
import {ref,computed} from 'vue';
import { useRouter } from 'vue-router';

const name = ref('EduSuite')
const router = useRouter();

const menuSidebar = ref([
    {
        id:1,
        name: 'Dashboard',
        path:'/dashboard',
        icon:''
    },
    {
        id:2,
        name: 'Students',
        path:'/Students',
        icon:''
    },
    {
        id:3,
        name: 'Teachers',
        path:'/Teachers',
        icon:''
    },
    {
        id:4,
        name: 'Finance',
        path:'/Finance',
        icon:''
    },
    {
        id:5,
        name: 'Settings',
        path:'/Settings',
        icon:''
    }
])
</script>

<template>
    <aside v-for="menu in menuSidebar" :key="menu" class="w-52 bg-[#181D31] text-white flex flex-col">
      <div class="p-6 text-2xl font-bold text-[#E5BA73]">{{name}}</div>
      
      <nav class="flex-1 px-4 space-y-2">
        <a href="#" class="block py-2.5 px-4 rounded bg-[#5e688f] text-white">Dashboard</a>
        <a href="#" class="block py-2.5 px-4 rounded hover:bg-[#5e688f] transition">Students</a>
        <a href="#" class="block py-2.5 px-4 rounded hover:bg-[#5e688f] transition">Teachers</a>
        <a href="#" class="block py-2.5 px-4 rounded hover:bg-[#5e688f] transition">Finance</a>
      </nav>

      <button @click="logout" class="p-6 text-center hover:text-[#E5BA73] transition">
        Logout 
      </button>
    </aside>

    <router-Link></router-Link>
</template>