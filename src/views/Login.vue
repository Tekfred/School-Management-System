<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import apple from '@/assets/images/apple white.png';
import google from '@/assets/images/google3.png';
import twit from '@/assets/images/twit black.png';

const SystemName = ref('EduSuite');
const appleLink = ref('https://account.apple.com/en-us/');
const googleLink = ref('https://support.google.com/mail/answer/8494?hl=en&co=GENIE.Platform%3DDesktop');
const twitLink = ref('https://twitter.com/i/flow/login');

const userEmail = ref('');
const password = ref('');

const toastMessage = ref('');
const toastType = ref('success');
const showToast = ref(false);

const heroStats = [
  { value: '1,250', label: 'Students' },
  { value: '48', label: 'Teachers' },
  { value: '32', label: 'Courses' },
];

const router = useRouter();

onMounted(() => {
  const gsap = window.gsap;

  if (!gsap) return;

  gsap.from('.logo', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.login-card', {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.15,
  });

  gsap.from('.hero-copy', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.25,
  });

  gsap.from('.stat-card', {
    y: 24,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.55,
  });
});

const triggerToast = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const handleLogin = () => {
  if (userEmail.value === 'admins' && password.value === '!!qwertyk3y') {
    localStorage.setItem('loggedIn', 'true');
    triggerToast('Welcome to EduSuite');

    setTimeout(() => {
      router.push('/app/dashboard');
    }, 900);
  } else {
    triggerToast('Invalid credentials. Please check your ID and password.', 'error');
  }
};
</script>

<template>
  <main class="min-h-screen bg-[var(--background)] text-[var(--text)]">
    <div class="grid min-h-screen lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
      <section class="relative hidden overflow-hidden lg:block">
        <img src="/bg-uni1.jpg" alt="Sunlit university library" class="absolute inset-0 h-full w-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-br from-[#181D31]/65 via-[#181D31]/25 to-[#E5BA73]/20"></div>
        <div class="particles" aria-hidden="true">
          <span v-for="item in 14" :key="item" :style="{ '--delay': `${item * 0.35}s`, '--left': `${8 + item * 6}%` }"></span>
        </div>

        <div class="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">
          <div class="logo flex items-center gap-4">
            <div class="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gold)] text-[var(--navy)] shadow-xl">
              <span class="material-symbols-outlined">auto_stories</span>
            </div>
            <div>
              <p class="display-font text-4xl font-bold text-white">{{ SystemName }}</p>
              <p class="text-xs font-bold uppercase tracking-[0.24em] text-[#F7E5C8]">Campus Experience</p>
            </div>
          </div>

          <div class="max-w-2xl">
            <p class="hero-copy text-sm font-bold uppercase tracking-[0.28em] text-[#F7E5C8]">Learning Environment</p>
            <h1 class="hero-copy mt-4 text-6xl font-bold leading-none text-white xl:text-7xl">
              Learning Never Exhausts The Mind
            </h1>
            <p class="hero-copy mt-5 text-lg font-medium text-white/80">- Leonardo da Vinci</p>
            <p class="hero-copy mt-6 max-w-xl text-base leading-7 text-white/75">
              Warm spaces, calm progress, and every academic tool in one premium student dashboard.
            </p>
          </div>

          <div class="grid max-w-xl grid-cols-3 gap-4">
            <div v-for="stat in heroStats" :key="stat.label" class="stat-card rounded-2xl border border-white/20 bg-white/15 p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,.16)] backdrop-blur-xl">
              <p class="text-2xl font-extrabold">{{ stat.value }}</p>
              <p class="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/70">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div class="w-full max-w-md">
          <div class="logo mb-8 flex items-center gap-4 lg:hidden">
            <div class="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gold)] text-[var(--navy)] shadow-xl">
              <span class="material-symbols-outlined">auto_stories</span>
            </div>
            <div>
              <p class="display-font text-4xl font-bold text-[var(--navy)]">{{ SystemName }}</p>
              <p class="text-xs font-bold uppercase tracking-[0.22em] text-[var(--muted)]">Campus Experience</p>
            </div>
          </div>

          <form
            @submit.prevent="handleLogin"
            class="login-card rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_25px_50px_rgba(0,0,0,.08)] backdrop-blur-xl sm:p-8"
          >
            <div>
              <p class="text-sm font-bold uppercase tracking-[0.22em] text-[#b8860b]">Login</p>
              <h2 class="mt-3 text-5xl font-bold leading-none text-[var(--navy)]">Enter EduSuite</h2>
              <p class="mt-4 text-sm leading-6 text-[var(--muted)]">
                Continue from campus experience into your learning environment and dashboard.
              </p>
            </div>

            <div class="mt-7 grid grid-cols-3 gap-3">
              <a :href="appleLink" class="grid h-12 place-items-center rounded-2xl bg-[var(--navy)] shadow-sm ring-1 ring-[var(--gold)]/50 transition hover:-translate-y-0.5 hover:shadow-md">
                <img :src="apple" class="h-6 w-6 object-contain" alt="Apple">
              </a>
              <a :href="googleLink" class="grid h-12 place-items-center rounded-2xl bg-[var(--navy)] shadow-sm ring-1 ring-[var(--gold)]/50 transition hover:-translate-y-0.5 hover:shadow-md">
                <img :src="google" class="h-6 w-6 object-contain" alt="Google">
              </a>
              <a :href="twitLink" class="grid h-12 place-items-center rounded-2xl bg-[var(--navy)] shadow-sm ring-1 ring-[var(--gold)]/50 transition hover:-translate-y-0.5 hover:shadow-md">
                <img :src="twit" class="h-7 w-7 object-contain invert" alt="X">
              </a>
            </div>

            <div class="my-7 flex items-center gap-4">
              <span class="h-px flex-1 bg-slate-200"></span>
              <span class="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">or use student ID</span>
              <span class="h-px flex-1 bg-slate-200"></span>
            </div>

            <div class="space-y-5">
              <label class="block">
                <span class="text-sm font-bold text-[var(--text)]">User ID</span>
                <input
                  v-model="userEmail"
                  required
                  class="mt-2 h-13 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 text-[var(--navy)] outline-none transition placeholder:text-slate-400 focus:border-[var(--gold)] focus:ring-4 focus:ring-[#E5BA73]/20"
                  placeholder="admins"
                >
              </label>

              <label class="block">
                <span class="text-sm font-bold text-[var(--text)]">Password</span>
                <input
                  v-model="password"
                  type="password"
                  required
                  class="mt-2 h-13 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 text-[var(--navy)] outline-none transition placeholder:text-slate-400 focus:border-[var(--gold)] focus:ring-4 focus:ring-[#E5BA73]/20"
                  placeholder="Enter password"
                >
              </label>
            </div>

            <div class="mt-4 flex items-center justify-between text-sm font-semibold">
              <a href="#" class="text-[var(--muted)] transition hover:text-[#b8860b]">Forgot OTP?</a>
              <a href="#" class="text-[#b8860b] transition hover:text-[var(--navy)]">Register</a>
            </div>

            <button
              type="submit"
              class="mt-8 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--gold)] font-extrabold text-[var(--navy)] shadow-[0_18px_35px_rgba(229,186,115,.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(229,186,115,.42)]"
            >
              <span>Login to Dashboard</span>
              <span class="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </form>

          <p class="mt-5 text-center text-xs font-semibold text-[var(--muted)]">
            Demo access: User ID <span class="text-[var(--navy)]">admins</span>
          </p>
        </div>
      </section>
    </div>

    <div
      v-if="showToast"
      class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-6 py-3 text-sm font-bold shadow-xl transition-all duration-300"
      :class="toastType === 'success' ? 'bg-[var(--navy)] text-white' : 'bg-red-600 text-white'"
    >
      {{ toastMessage }}
    </div>
  </main>
</template>

<style scoped>
.particles span {
  animation: floatParticle 8s ease-in-out infinite;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 999px;
  height: 5px;
  left: var(--left);
  position: absolute;
  top: 14%;
  width: 5px;
  animation-delay: var(--delay);
}

@keyframes floatParticle {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  25% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateY(78vh);
  }
}
</style>
