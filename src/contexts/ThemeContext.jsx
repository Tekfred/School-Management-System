import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react'
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-transitioning')
    root.classList.toggle('dark', isDark)
    root.dataset.theme = isDark ? 'dark' : 'light'
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    const timer = window.setTimeout(() => root.classList.remove('theme-transitioning'), 420)
    return () => window.clearTimeout(timer)
  }, [isDark])
  const value = useMemo(
    () => ({ isDark, toggleTheme: () => setDark((dark) => !dark) }),
    [isDark],
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
