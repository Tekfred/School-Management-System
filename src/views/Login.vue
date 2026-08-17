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
const showPassword = ref(false);

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
  <main class="min-h-screen bg-(--background) text-(--text)">
    <div class="grid min-h-screen lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
      <section class="relative hidden overflow-hidden lg:block">
        <img src="/bg-uni1.jpg" alt="Sunlit university library" class="absolute inset-0 object-cover w-full h-full">
        <div class="absolute inset-0 bg-linear-to-br from-[#181D31]/65 via-[#181D31]/25 to-[#E5BA73]/20"></div>
        <div class="particles" aria-hidden="true">
          <span v-for="item in 14" :key="item" :style="{ '--delay': `${item * 0.35}s`, '--left': `${8 + item * 6}%` }"></span>
        </div>

        <div class="relative z-10 flex flex-col justify-between min-h-screen p-10 xl:p-14">
          <div class="flex items-center gap-4 logo">
            <div class="grid h-12 w-12 place-items-center rounded-2xl bg-(--gold) text-(--navy) shadow-xl">
              <span class="material-symbols-outlined">auto_stories</span>
            </div>
            <div>
              <p class="text-4xl font-bold text-white display-font">{{ SystemName }}</p>
              <p class="text-xs font-bold uppercase tracking-[0.24em] text-[#F7E5C8]">Campus Experience</p>
            </div>
          </div>

          <div class="max-w-2xl">
            <p class="hero-copy text-sm font-bold uppercase tracking-[0.28em] text-[#F7E5C8]">Learning Environment</p>
            <h1 class="mt-4 text-6xl font-bold leading-none text-white hero-copy xl:text-7xl">
              Learning Never Exhausts The Mind
            </h1>
            <p class="mt-5 text-lg font-medium hero-copy text-white/80">- Leonardo da Vinci</p>
            <p class="max-w-xl mt-6 text-base leading-7 hero-copy text-white/75">
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

      <section class="flex items-center justify-center min-h-screen px-5 py-10 sm:px-8">
        <div class="w-full max-w-md">
          <div class="flex items-center gap-4 mb-8 logo lg:hidden">
            <div class="grid h-12 w-12 place-items-center rounded-2xl bg-(--gold) text-(--navy) shadow-xl">
              <span class="material-symbols-outlined">auto_stories</span>
            </div>
            <div>
              <p class="display-font text-4xl font-bold text-(--navy)">{{ SystemName }}</p>
              <p class="text-xs font-bold uppercase tracking-[0.22em] text-(--muted)">Campus Experience</p>
            </div>
          </div>

          <form
            @submit.prevent="handleLogin"
            class="login-card rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_25px_50px_rgba(0,0,0,.08)] backdrop-blur-xl sm:p-8"
          >
            <div>
              <p class="text-sm font-bold uppercase tracking-[0.22em] text-[#b8860b]">Login</p>
              <h2 class="mt-3 text-5xl font-bold leading-none text-(--navy)">Enter EduSuite</h2>
              <p class="mt-4 text-sm leading-6 text-(--muted)">
                Continue from campus experience into your learning environment and dashboard.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3 mt-7">
              <a :href="appleLink" class="grid h-12 place-items-center rounded-2xl bg-(--navy) shadow-sm ring-1 ring-(--gold)/50 transition hover:-translate-y-0.5 hover:shadow-md">
                <img :src="apple" class="object-contain w-6 h-6" alt="Apple">
              </a>
              <a :href="googleLink" class="grid h-12 place-items-center rounded-2xl bg-(--navy) shadow-sm ring-1 ring-(--gold)/50 transition hover:-translate-y-0.5 hover:shadow-md">
                <img :src="google" class="object-contain w-6 h-6" alt="Google">
              </a>
              <a :href="twitLink" class="grid h-12 place-items-center rounded-2xl bg-(--navy) shadow-sm ring-1 ring-(--gold)/50 transition hover:-translate-y-0.5 hover:shadow-md">
                <img :src="twit" class="object-contain h-7 w-7 invert" alt="X">
              </a>
            </div>

            <div class="flex items-center gap-4 my-7">
              <span class="flex-1 h-px bg-slate-200"></span>
              <span class="text-xs font-bold uppercase tracking-[0.18em] text-(--muted)">or use student ID</span>
              <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="space-y-5">
              <label class="block">
                <span class="text-sm font-bold text-(--text)">User ID</span>
                <input
                  v-model="userEmail"
                  required
                  class="mt-2 h-13 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 text-(--navy) outline-none transition placeholder:text-slate-400 focus:border-(--gold) focus:ring-4 focus:ring-[#E5BA73]/20"
                  placeholder="admins"
                >
              </label>

              <label class="block">
                <span class="text-sm font-bold text-(--text)">Password</span>
                <div class="relative mt-2">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="h-13 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 pr-12 text-(--navy) outline-none transition placeholder:text-slate-400 focus:border-(--gold) focus:ring-4 focus:ring-[#E5BA73]/20"
                    placeholder="Enter password"
                  >
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-(--muted) hover:text-(--gold) transition-colors"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <span v-if="showPassword" class="text-xl  material-symbols-outlined">visibility_off</span>
                    <span v-else class="text-xl material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </label>
            </div>

            <div class="flex items-center justify-between mt-4 text-sm font-semibold">
              <a href="#" class="text-(--muted) transition hover:text-[#b8860b]">Forgot OTP?</a>
              <a href="#" class="text-[#b8860b] transition hover:text-(--navy)">Register</a>
            </div>

            <button
              type="submit"
              class="mt-8 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-(--gold) font-extrabold text-(--navy) shadow-[0_18px_35px_rgba(229,186,115,.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(229,186,115,.42)]"
            >
              <span>Login to Dashboard</span>
              <span class="text-xl material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <p class="mt-5 text-center text-xs font-semibold text-(--muted)">
            Demo access: User ID <span class="text-(--navy)">admins</span>
          </p>
        </div>
      </section>
    </div>

    <div
      v-if="showToast"
      class="fixed z-50 px-6 py-3 text-sm font-bold transition-all duration-300 -translate-x-1/2 shadow-xl bottom-6 left-1/2 rounded-2xl"
      :class="toastType === 'success' ? 'bg-(--navy) text-white' : 'bg-red-600 text-white'"
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
