import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

/** Scope an animation to a component and automatically revert it on unmount. */
export function useGsap(scope, animate, dependencies = []) {
  useLayoutEffect(() => {
    const element = scope?.current || scope
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => animate(gsap, element), element)
    return () => context.revert()
  }, dependencies)
}
