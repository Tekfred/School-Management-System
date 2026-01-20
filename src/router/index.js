import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' // Root redirects to login
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
        path: '/dashboard', 
        name: 'dashboard',
        component: DashboardView
    }
   
  ]
})


router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('loggedIn') // example

  if (to.path !== '/login' && !isLoggedIn) {
    next('/login') // redirect to login if not logged in
  } else {
    next() // allow navigation
  }
})
export default router