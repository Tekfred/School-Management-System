<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apple from '@/assets/images/apple white.png'
import google from '@/assets/images/google3.png'
import twit from '@/assets/images/twit black.png'
const SystemName = ref("EduSuite");
const name = ref("or");

// These are your containers
const userEmail = ref("");
const password = ref("");
const errorMessage = ref("");

const toastMessage = ref("");
const toastType = ref("success");
const showToast = ref(false);


const router = useRouter();

const triggerToast = (message, type = "success") => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const handleLogin = () => {
  if (userEmail.value === "admins" && password.value === "!!EXh-dR3$") {
    // Redirect to home page
    localStorage.setItem("loggedIn", "true");

    triggerToast('Welcome to the school 🎉 "success"');

    // Use the simple path we defined in the router
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  } else {
    triggerToast("Invalid Credentials! ❌ Please check your ID and Password.");
  }
};
</script>

<template>
  <form
    @submit.prevent="handleLogin"
    class="relative max-w-114 mx-auto h-157 rounded-lg overflow-hidden form bg-[url('/public/picbg.jpg')] bg-cover bg-center"
  >
    <div
      class="absolute bg-[]  rounded-lg z-10 inset-0.5 px-12.5 py-10 flex-col"
    >
      <h1 class="text-[#181D31] text-4xl font-500 text-center tracking-widest">
        {{ SystemName }}
      </h1>
      <div
        v-if="errorMessage"
        class="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-xs text-center animate-pulse"
      >
        {{ errorMessage }}
      </div>
      <!-- <h2 class="text-[#E5BA73] font-500 text-center tracking-widest">
        {{ name }}
      </h2> -->

      <div>
        <h1 class="text-[#181D31] text-2xl font-500 text-center tracking-widest font-bold animate__animated animate__zoomIn"
        >
          Begin Your Schooling Adventure
        </h1>
        <p class="text-[#181D31] font-500 text-center tracking-widest text-[12px] relative right-22">
          Sign up with Open account
        </p>

        <span class="flex gap-5 ">
            <a href="" class="border-none outline-0 bg-[#181D31] py-1.75  w-full rounded-sm font-semibold cursor-pointer flex justify-center ring-2
             ring-[#E5BA73] hover:  animate__animated animate__zoomIn"><img :src="apple" width="30" alt="apple" /></a>
           <a href="" class="border-none outline-0 bg-[#181D31] py-1.75  w-full rounded-sm font-semibold cursor-pointer flex justify-center ring-2
            ring-[#E5BA73] animate__animated animate__zoomIn"><img :src="google" width="27" alt="google"/></a>
          <a href="" class="border-none outline-0 bg-[#181D31] py-1.75  w-full rounded-sm font-semibold cursor-pointer flex justify-center ring-2
           ring-[#E5BA73] animate__animated animate__zoomIn"><img :src="twit" width="35" alt="twitter"/></a>
        </span>

         <div class="flex justify-center mt-12">
            <p class="text-[#181D31] font-bold font-500 text-center tracking-widest animate__animated animate__zoomIn">
              {{ name }}
            </p>
          </div>
      </div>
      <div class="relative w-87 mt-4.75">
        <input
          v-model="userEmail"
          class="relative w-full p-5 bg-transparent bordor-none outine-none text-[#181D31] text-lg tracking-widest z-10 inputco"
          required="required"
        />

        <span
          class="absolute left-0 p-10 text-[1em] text-[#8f8f8f] pointer-events-none tracking-widest ease-[0.5s] inputco"
          >User ID</span
        >
        <i
          class="absolute left-0 bottom-0 w-full h-0.5 bg-[#E5BA73] rounded-sm pointer-events-none ease-[0.5s] z-9 inputcont"
        ></i>
      </div>
      <div class="relative w-87 mt-8.75">
        <input
          v-model="password"
          type="password"
          class="relative w-full p-5 bg-transparent bordor-none outine-none text-[#181D31] text-lg tracking-wider z-10 inputco"
          required="required"
        />
        <span
          class="absolute left-0 p-10 text-[1em] text-[#8f8f8f] pointer-events-none tracking-widest ease-[0.5s] inputco"
          >Password</span
        >
        <i
          class="absolute left-0 bottom-0 w-full h-0.5 bg-[#E5BA73] rounded-sm pointer-events-none ease-[0.5s] z-9 inputcont"
        ></i>
      </div>
      <div class="flex justify-between">
        <a
          href="#"
          class="my-2.5 text-[0.75em] text-[#8f8f8f] no-underline hover:text-[#E5BA73] &:nth-2:text-[#E5BA73]"
          >Forgot OTP?</a
        >
        <a
          href="#"
          class="my-2.5 text-[0.75em] text-[#8f8f8f] no-underline hover:text-[#E5BA73] &:nth-2:text-[#E5BA73]"
          >Register</a
        >
      </div>
      <button
        type="submit"
        class="border-none outline-0 bg-[#E5BA73] py-2.75 px-18.25 w-full mt-12.5 rounded-sm font-semibold cursor-pointer animate__animated animate__zoomIn"
        value="Connect"
      >
        Submit
      </button>
    </div>
  </form>

  <div
    v-if="showToast"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 "
    :class="
      toastType == 'success'
        ? 'bg-[#181D31] text-white animate__animated animate__ease-out'
        : 'big-red-600 text-white' 
         "
  >
    {{ toastMessage }}
  </div>
</template>

<style scoped>
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}
.toast-enter-to {
  opacity: 1;
  transform: translate(-50%, 0);
}
.toast-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
