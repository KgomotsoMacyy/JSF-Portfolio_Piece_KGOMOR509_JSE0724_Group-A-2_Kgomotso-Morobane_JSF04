<template>
  <nav class="fixed w-full bg-gray-300 p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <a class="text-lg font-bold" href="/"><img src="/favicon.ico"></a>
      <p class="text-lg">TakeItAll</p>
      <div class="flex">
        <a href="/" class="block p-2 hover:bg-gray-300">Wishlist</a>
        <a href="/cart" class="block p-2 hover:bg-gray-300">Cart ({{ cartItemCount }})</a>
        <a @click="handleAuthAction" class="block p-2 hover:bg-gray-300 cursor-pointer">
          {{ isAuthenticated ? 'Logout' : 'Login' }}
        </a>
      </div>
      <button @click="toggleMenu" class="md:hidden text-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>
    </div>
    <div v-if="open" class="md:hidden mt-4 bg-gray-300">
      <a href="/wishlist" class="block p-2 hover:bg-gray-300">Wishlist</a>
      <a href="/cart" class="block p-2 hover:bg-gray-300">Cart ({{ cartItemCount }})</a>
      <a @click="handleAuthAction" class="block p-2 hover:bg-gray-300 cursor-pointer">
        {{ isAuthenticated ? 'Logout' : 'Login' }}
      </a>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useCart from '../router/useCart';

export default {
  name: 'Navbar',
  setup() {
    const open = ref(false);
    const router = useRouter();
    const { cartItemCount } = useCart();

    // Check if the user is authenticated (JWT exists in localStorage)
    const isAuthenticated = computed(() => !!localStorage.getItem('jwt'));

    const toggleMenu = () => {
      open.value = !open.value;
    };

    const handleAuthAction = () => {
      if (isAuthenticated.value) {
        // Logout: Remove the JWT from localStorage and redirect to the home page
        localStorage.removeItem('jwt');
        router.push('/');
      } else {
        // Login: Redirect to the login page
        router.push('/login');
      }
    };

    return {
      open,
      toggleMenu,
      cartItemCount,
      isAuthenticated,
      handleAuthAction,
    };
  },
};
</script>