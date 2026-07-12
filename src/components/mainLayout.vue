<script setup>
import sidebar from '@/components/sidebar.vue'
import navbar from '@/components/navbar.vue'
import MobileNavbar from '@/components/MobileNavbar.vue'
import { useUiStore } from '@/stores/uistore.js'

const uiStore = useUiStore()
</script>

<template>
  <div class="flex h-screen app-shell">

    <sidebar />

    <div class="flex flex-col flex-1 overflow-hidden">
      <navbar />

      <!-- pb-24 on mobile so content clears the floating bottom nav -->
      <main class="flex-1 pb-24 overflow-auto lg:pb-0">
        <router-view />
      </main>
    </div>

    <!-- Floating mobile bottom navbar -->
    <MobileNavbar class="" />

  </div>
</template>