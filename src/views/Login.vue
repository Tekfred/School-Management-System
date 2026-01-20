<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const SystemName = ref('EduManager') 
const name = ref('Sign In')

// These are your containers
const userEmail = ref("");
const password = ref("");

const router = useRouter();

const handleLogin = () => {
  if (userEmail.value === 'admin' && password.value === '!!EXH-dR3$') {
    // Redirect to home page
    localStorage.setItem('loggedIn', 'true');
    
    // Use the simple path we defined in the router
    router.push("/dashboard"); 
  } else {
    alert("Invalid credentials");
  }
}
</script>

<template>
  <form
    @submit.prevent="handleLogin"
    class="relative max-w-md mx-auto h-124 bg-[#5e688f] rounded-lg overflow-hidden formx"
  >
    <div
      class="absolute bg-[#181D31] rounded-lg z-10 inset-0.5 px-12.5 py-10 flex-col"
    >

    <h1 class="text-[#E5BA73] text-3xl font-500 text-center tracking-widest">
        {{SystemName}}
      </h1>
      <h2 class="text-[#E5BA73] font-500 text-center tracking-widest">
        {{name}}
      </h2>
      <div class="relative w-75 mt-8.75">
        <input
          v-model="userEmail"
          class="relative w-full p-10 bg-transparent bordor-none outine-none text-white text-lg tracking-wider z-10 inputco"
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
      <div class="relative w-75 mt-8.75">
        <input
          v-model="password" type="password"
          class="relative w-full p-10 bg-transparent bordor-none outine-none text-white text-lg tracking-wider z-10 inputco"
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
        class="border-none outline-0 bg-[#E5BA73] py-2.75 px-18.25 w-full mt-2.5 rounded-sm font-semibold cursor-pointer"
        value="Connect"
      >
        Submit
      </button>
    </div>
  </form>
</template>
