<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const activeStatus = [
  {
    id: 1,
    name: 'Total Students',
    value: '1,250',
    borderColor: 'border-blue-500'
  },
  {
    id: 2,
    name: 'Active Teachers',
    value: '48',
    borderColor: 'border-green-500'
  },
  {
    id: 3,
    name: 'Fees Collected',
    value: '$45,000',
    borderColor: 'border-amber-400'
  },
  {
    id: 4,
    name: 'Active Courses',
    value: '32',
    borderColor: 'border-red-500'
  }
]

const getStatusClass = (borderColor) => {
  return `border-l-4 ${borderColor}`
}
// const studentno = ref('1,250')
// const teachers = ref('48')
// const fees = ref('$45,000')
// const courses = ref('32')


const router = useRouter()

const logout = () => {
  localStorage.removeItem('loggedIn')
  router.push('/login')
}
</script>

<template>
  <div class=" bg-gray-50">
   

    <!-- Main Content -->
    <div class="p-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="active in activeStatus" :key="active.id" :class="`bg-white p-6 rounded-lg shadow-sm border-l-4 ${active.borderColor}`">
          <div class="text-gray-500 text-sm font-semibold">{{ active.name }}</div>
          <div class="text-2xl font-bold">{{ active.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>