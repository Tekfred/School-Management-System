<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import image from '@/assets/images/profile_img_3.png';
import { useUiStore } from '../stores/uistore';

// Step 1: Create the state - boolean to toggle dropdown visibility
const profileDropdownOpen = ref(false);

const uiStore = useUiStore();
const router = useRouter();

// Step 2: Create function to toggle the dropdown
const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value;
};

// Step 3: Create function to handle logout
const handleLogout = () => {
  localStorage.removeItem('loggedIn');
  profileDropdownOpen.value = false; // Close dropdown after logout
  router.push('/login');
};

// Step 4: Create function to close dropdown (used for menu item clicks)
const closeDropdown = () => {
  profileDropdownOpen.value = false;
};
</script>

<template>
    <header class="bg-white shadow-sm sticky top-0 z-40">

         <!-- Header -->
    <div class="bg-white shadow-sm border-b">
     
    </div>
        <div class="px-8 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-800 ">School Overview
                <input type="search" class="w-100 bg-[#f6f6f8] border-none rounded-xl py-2 md:py-3 px-4 md:px-8 lg:px-12 focus:ring-2 focus:ring-purple-500 transition-all text-xs md:text-sm" placeholder="Search Students, Teachers....">
            </h1>

            <div class="flex gap-3 items-center">
                <span class="material-symbols-outlined items-center cursor-pointer transform translate-y-2 -translate-x-3 text-[#65758b] ">notifications</span>
                
                <!-- Step 5: Create wrapper div for profile button and dropdown (relative positioning) -->
                <div class="relative">
                  <!-- Step 6: Profile button with click handler -->
                  <button @click="toggleProfileDropdown" class="cursor-pointer flex items-center gap-3 hover:bg-gray-100 rounded-lg px-2 py-1 transition">
                    <img :src="image" alt="profile" class="w-10 h-10 rounded-full ">
                    <div class="text-gray-600 flex flex-col text-sm"> 
                      <span class="text-black font-semibold">Admin User</span> 
                      <span>Administrator</span>
                    </div>
                  </button>

                  <!-- Step 7: Dropdown menu with v-if to show/hide -->
                  <div v-if="profileDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <!-- Step 8: Dropdown menu items -->
                    <div class="py-2">
                      <!-- Profile item -->
                      <button @click="closeDropdown" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition">
                        <span class="material-symbols-outlined text-lg">account_circle</span>
                        <span>My Profile</span>
                      </button>

                      <!-- Settings item -->
                      <button @click="closeDropdown" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition">
                        <span class="material-symbols-outlined text-lg">settings</span>
                        <span>Settings</span>
                      </button>

                      <!-- Divider -->
                      <hr class="my-2">

                      <!-- Logout item -->
                      <button @click="handleLogout" class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 transition font-semibold">
                        <span class="material-symbols-outlined text-lg">logout</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
            </div>

             
            
        </div>
    </header>
</template>