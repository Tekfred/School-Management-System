import { useLayoutEffect, useRef } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { gsap } from 'gsap'
import { useTheme } from '../contexts/ThemeContext.jsx'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const thumb = useRef(null)
  useLayoutEffect(() => {
    gsap.set(thumb.current, { x: isDark ? 32 : 0 })
  }, [])
  const handleToggle = () => {
    const nextIsDark = !isDark
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.set(thumb.current, { x: nextIsDark ? 32 : 0 })
    else gsap.to(thumb.current, { x: nextIsDark ? 32 : 0, duration: 0.42, ease: 'elastic.out(1, 0.72)', overwrite: 'auto' })
    toggleTheme()
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="theme-toggle relative flex h-10 w-[72px] items-center justify-between rounded-full border border-(--surface-border) bg-(--surface-muted) p-1"
    >
      <span className={`theme-toggle-thumb absolute left-1 top-1 grid h-8 w-8 place-items-center rounded-full bg-(--surface-strong) text-(--accent-strong) shadow-sm`} ref={thumb} aria-hidden="true" />
      <span className={`relative z-10 grid h-8 w-8 place-items-center ${!isDark ? 'text-(--accent-strong)' : 'text-(--subtle-text)'}`}><FiSun /></span>
      <span className={`relative z-10 grid h-8 w-8 place-items-center ${isDark ? 'text-(--accent-strong)' : 'text-(--subtle-text)'}`}><FiMoon /></span>
    </button>
  )
}
