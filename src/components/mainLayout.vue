<script setup>
import sidebar from '@/components/sidebar.vue';
import navbar from '@/components/navbar.vue';
import  {useUiStore} from '@/stores/uistore.js';

const uiStore = useUiStore();
</script>

<template>
    

    <div class="flex h-screen bg-gray-50">

        <sidebar />
        
        <div class="flex-1 flex flex-col overflow-hidden">
            <navbar />
            
            <main class="flex-1 overflow-auto">
                <router-view />
            </main>
        </div>
    </div>
    
</template>