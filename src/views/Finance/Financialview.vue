<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const glitchActive = ref(false)

onMounted(() => {
  // Trigger glitch randomly every few seconds
  const triggerGlitch = () => {
    glitchActive.value = true
    setTimeout(() => { glitchActive.value = false }, 400)
    setTimeout(triggerGlitch, 2500 + Math.random() * 2000)
  }
  setTimeout(triggerGlitch, 1200)

  // GSAP entrance if available
  try {
    const gsap = window.gsap
    if (gsap) {
      gsap.from('.not-found-content', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
      gsap.from('.not-found-tag',     { y: 10, opacity: 0, duration: 0.5, delay: 0.2, ease: 'power2.out' })
      gsap.from('.not-found-msg',     { y: 10, opacity: 0, duration: 0.5, delay: 0.35, ease: 'power2.out' })
      gsap.from('.not-found-actions', { y: 10, opacity: 0, duration: 0.5, delay: 0.5, ease: 'power2.out' })
      gsap.from('.floating-card',     { y: 20, opacity: 0, duration: 0.6, delay: 0.6, stagger: 0.1, ease: 'power2.out' })
    }
  } catch(e) {}
})
</script>

<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden not-found-page">

    <!-- Ambient background orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <!-- Floating ghost cards for atmosphere -->
    <div class="floating-card ghost-card ghost-card-1">
      <span class="material-symbols-outlined">menu_book</span>
      <span class="ghost-label">Courses</span>
    </div>
    <div class="floating-card ghost-card ghost-card-2">
      <span class="material-symbols-outlined">school</span>
      <span class="ghost-label">Lecturers</span>
    </div>
    <div class="floating-card ghost-card ghost-card-3">
      <span class="material-symbols-outlined">dashboard</span>
      <span class="ghost-label">Dashboard</span>
    </div>

    <!-- Main content -->
    <div class="relative z-10 flex flex-col items-center max-w-lg text-center not-found-content">

      <!-- EduSuite logo mark -->
      <div class="mb-8 grid h-16 w-16 place-items-center rounded-3xl bg-[#E5BA73] text-[#181D31] shadow-lg shadow-[#E5BA73]/30">
        <span class="text-3xl material-symbols-outlined">auto_stories</span>
      </div>

      <!-- Glitchy 404 -->
      <div class="relative mb-4 select-none" :class="{ glitch: glitchActive }">
        <span class="the-404 heading-text" data-text="404">404</span>
        <span class="glitch-layer glitch-layer-1 heading-text" aria-hidden="true">404</span>
        <span class="glitch-layer glitch-layer-2 heading-text" aria-hidden="true">404</span>
      </div>

      <!-- Tag line -->
      <div class="not-found-tag inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-(--surface-border) bg-(--surface-muted) mb-5">
        <span class="w-2 h-2 rounded-full bg-[#E5BA73] animate-pulse"></span>
        <span class="text-xs font-semibold tracking-widest uppercase text-(--subtle-text)">Page not found</span>
      </div>

      <!-- Message -->
      <p class="max-w-sm mb-8 text-base leading-relaxed not-found-msg body-text">
        This page doesn't exist in EduSuite. It may have been moved, deleted, or you may have followed a broken link.
      </p>

      <!-- Actions -->
      <div class="flex flex-col items-center gap-3 not-found-actions sm:flex-row">
        <button
          @click="router.back()"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-(--surface-border) bg-(--surface-muted) text-sm font-semibold body-text hover:border-(--surface-border-strong) transition-all duration-200 hover:-translate-y-0.5"
        >
          <span class="text-base material-symbols-outlined">arrow_back</span>
          Go back
        </button>
        <RouterLink
          to="/app/dashboard"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5BA73] text-[#181D31] text-sm font-bold shadow-lg shadow-[#E5BA73]/20 hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          <span class="text-base material-symbols-outlined">home</span>
          Back to Dashboard
        </RouterLink>
      </div>

    </div>

    <!-- Bottom credit -->
    <p class="absolute text-xs tracking-wide bottom-6 muted-text">
      EduSuite · Campus OS
    </p>

  </div>
</template>

<style scoped>
.not-found-page {
  background:
    radial-gradient(circle at 20% 20%, rgba(229, 186, 115, 0.08), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.06), transparent 40%),
    var(--app-bg);
}

/* Ambient orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  opacity: 0.35;
  animation: drift 8s ease-in-out infinite alternate;
}
.orb-1 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(229, 186, 115, 0.3), transparent 70%);
  top: -80px;
  left: -80px;
  animation-delay: 0s;
}
.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%);
  bottom: -60px;
  right: -60px;
  animation-delay: -4s;
}
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(24px, 16px) scale(1.08); }
}

/* Ghost floating cards */
.ghost-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  box-shadow: var(--surface-shadow);
  backdrop-filter: blur(12px);
  opacity: 0.5;
  pointer-events: none;
}
.ghost-card .material-symbols-outlined {
  font-size: 1.1rem;
  color: var(--accent);
}
.ghost-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--subtle-text);
}
.ghost-card-1 {
  top: 18%;
  left: 6%;
  animation: floatA 6s ease-in-out infinite;
}
.ghost-card-2 {
  top: 14%;
  right: 8%;
  animation: floatB 7s ease-in-out infinite;
}
.ghost-card-3 {
  bottom: 22%;
  left: 8%;
  animation: floatA 8s ease-in-out infinite reverse;
}
@keyframes floatA {
  0%, 100% { transform: translateY(0px) rotate(-1deg); }
  50%       { transform: translateY(-12px) rotate(1deg); }
}
@keyframes floatB {
  0%, 100% { transform: translateY(0px) rotate(1deg); }
  50%       { transform: translateY(-16px) rotate(-1deg); }
}

/* Big 404 */
.the-404 {
  display: block;
  font-size: clamp(6rem, 20vw, 9rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  font-family: 'Cormorant Garamond', Georgia, serif;
}

/* Glitch layers */
.glitch-layer {
  position: absolute;
  inset: 0;
  display: block;
  font-size: clamp(6rem, 20vw, 9rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  font-family: 'Cormorant Garamond', Georgia, serif;
  opacity: 0;
  pointer-events: none;
}
.glitch-layer-1 { color: #E5BA73; }
.glitch-layer-2 { color: #60A5FA; }

/* Glitch animation triggers */
.glitch .glitch-layer-1 {
  opacity: 0.8;
  animation: glitch1 0.4s steps(2) forwards;
}
.glitch .glitch-layer-2 {
  opacity: 0.6;
  animation: glitch2 0.4s steps(2) forwards;
}
@keyframes glitch1 {
  0%   { clip-path: inset(30% 0 50% 0); transform: translate(-4px, 2px); opacity: 0.8; }
  25%  { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
  50%  { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 4px); }
  75%  { clip-path: inset(80% 0 5%  0); transform: translate(2px, -4px); }
  100% { opacity: 0; transform: translate(0, 0); }
}
@keyframes glitch2 {
  0%   { clip-path: inset(50% 0 30% 0); transform: translate(4px, -2px); opacity: 0.6; }
  25%  { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
  50%  { clip-path: inset(70% 0 10% 0); transform: translate(2px, -4px); }
  75%  { clip-path: inset(5%  0 80% 0); transform: translate(-2px, 4px); }
  100% { opacity: 0; transform: translate(0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .orb, .ghost-card, .glitch-layer { animation: none !important; }
}
</style>