import { useRef } from 'react'
import { useGsap } from '../hooks/useGsap.js'

export function PageSection({ title, subtitle, children, actions }) {
  const pageRef = useRef(null)
  useGsap(pageRef, (gsap, page) => {
    const heading = page.querySelector('[data-page-heading]')
    const hero = page.querySelector('[data-animate="hero"]')
    const cards = page.querySelectorAll('.surface-card, .interactive-surface, [data-animate="card"]')
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    if (heading) intro.fromTo(heading, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 })
    if (hero) intro.fromTo(hero, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, '-=0.32')
    if (cards.length) intro.fromTo(cards, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.055 }, '-=0.28')
  }, [])

  return (
    <section ref={pageRef} className="min-h-full px-4 py-6 app-page sm:px-6 lg:px-8" data-page-root>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] accent-text">EduSuite · Campus OS</p>
          <h2 data-page-heading className="mt-1 text-3xl font-bold heading-text">{title}</h2>
          {subtitle && <p className="mt-1 text-sm muted-text">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  )
}

export function Card({ children, className = '' }) {
  return <div className={`surface-card rounded-2xl p-5 ${className}`} data-animate="card">{children}</div>
}

export function Metric({ label, value, detail }) {
  return <Card><p className="text-sm muted-text">{label}</p><p className="mt-2 text-3xl font-bold heading-text">{value}</p>{detail && <p className="mt-1 text-xs muted-text">{detail}</p>}</Card>
}

export function SectionTitle({ children }) {
  return <h3 className="mb-4 font-bold heading-text">{children}</h3>
}
