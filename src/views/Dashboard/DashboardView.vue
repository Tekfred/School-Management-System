<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const studentno = ref('1,250')
const teachers = ref('48')
const fees = ref('$45,000')


const router = useRouter()

const logout = () => {
  // navigate to the next page
  router.push('/')
}
</script>

<template>

    
  <div class="flex bg-gray-100 min-h-screen w-full fixed inset-0 overflow-auto ">
    

    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-semibold text-gray-800">School Overview</h1>
        <div class="text-gray-600">Welcome back, Admin</div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div class="text-gray-500 text-sm">Total Students</div>
          <div class="text-2xl font-bold">{{studentno}}</div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <div class="text-gray-500 text-sm">Active Teachers</div>
          <div class="text-2xl font-bold">{{teachers}}</div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#E5BA73]">
          <div class="text-gray-500 text-sm">Fees Collected</div>
          <div class="text-2xl font-bold">{{ fees }}</div>
        </div>
      </div>
    </main>
  </div>


</template>