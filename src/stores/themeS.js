import {defineStore} from 'pinia'
import {ref, watch} from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  // ✅ Defined once, used in both startup and watcher
  const applyTheme = (dark) => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  // ✅ Apply immediately on startup — watch() alone won't do this
  applyTheme(isDark.value)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // ✅ Single watch, outside nothing else — runs only when value changes
  watch(isDark, applyTheme)

  return { isDark, toggleTheme }
})