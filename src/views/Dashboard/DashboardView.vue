<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import studentsEnrollment from '@/views/Dashboard/Components/studentsEnrollment.vue';



const activeStatus = [
  {
    id: 1,
    name: 'Total Students',
    value: '1,250',
    borderColor: 'border-blue-500',
    message: "+12 from last month",
    icon: 'groups'
   , bgcolor: '#ebf2fe'
  },
  {
    id: 2,
    name: 'Active Teachers',
    value: '48',
    borderColor: 'border-green-500',
    message: "+4 from last month",
    icon: 'school'
   , bgcolor: '#e7f7f2'
  },
  {
    id: 3,
    name: 'Fees Collected',
    value: '$45,000',
    borderColor: 'border-amber-400',
    message: "+8 from last month",
    icon: 'attach_money',
    bgcolor: '#fdf5e6'
  },
  {
    id: 4,
    name: 'Active Courses',
    value: '32',
    borderColor: 'border-red-500',
    message: "+2 from last month",
    icon: 'menu_book'
  ,  bgcolor: '#fdebee'
  }
]

const getStatusClass = (borderColor) => {
  return `border-l-4 ${borderColor}`
}

const getIconStyle = (bgcolor, borderColor) => {
  return {
    backgroundColor: bgcolor,
    color: borderColor.includes('amber') ? '#b8860b' : borderColor.split('-')[1]
  }
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
        <div v-for="active in activeStatus" :key="active.id" :class="`bg-white p-3 space-y-2 rounded-lg shadow-sm border-l-4 ${active.borderColor}`">
          <div class="flex items-center justify-between">
            <div class="text-gray-500 text-sm font-semibold">{{ active.name }}</div>
            <span class="material-symbols-outlined rounded-lg p-3 text-2xl" :style="getIconStyle(active.bgcolor, active.borderColor)">{{ active.icon }}</span>
          </div>
          
          <div class="text-2xl font-bold">{{ active.value }}</div>

          <div class="text-gray-500 text-sm font-semibold">{{ active.message }}</div>
        </div>

      </div>
    </div>

    <studentsEnrollment />
  </div>
</template>