<script setup>
import sidebar from '@/components/sidebar.vue';
import navbar from '/components/navbar.vue';
</script>

<template>
    

    <section>
        <sidebar />
        <navbar />

        
        <router-view />
    </section>
    
</template>