import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainLayout from '../components/mainLayout.vue'
import DashboardView from '../views/Dashboard/DashboardView.vue'

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
        path: '/app',
        component: MainLayout,
        children: [
          {
            path: 'dashboard', 
            name: 'dashboard',
            component: DashboardView
          },
          {
            path: 'students',
            name: 'students',
            component: DashboardView
          },
          {
            path: 'teachers',
            name: 'teachers',
            component: DashboardView
          },
          {
            path: 'finance',
            name: 'finance',
            component: DashboardView
          },
          {
            path: 'settings',
            name: 'settings',
            component: DashboardView
          }
        ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('loggedIn') // example

  if (to.path !== '/login' && !isLoggedIn) {
    next('/login') // redirect to login if not logged in
  } else if (to.path === '/' && isLoggedIn) {
    next('/app/dashboard') // redirect logged-in users to dashboard
  } else {
    next() // allow navigation
  }
})
export default router