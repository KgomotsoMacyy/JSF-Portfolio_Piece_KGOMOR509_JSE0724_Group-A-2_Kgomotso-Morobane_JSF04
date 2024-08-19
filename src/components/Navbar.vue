<template>
    <nav class="fixed w-full bg-gray-300 p-4 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Brand name -->
        <a class="text-lg font-bold"
         href="/"
        ><img src="/favicon.ico"></a>
        <p class="text-lg">TakeItAll</p>
        <!-- Navigation links for larger screens -->
        <div class="flex">
          <a href="/" class="block p-2 hover:bg-gray-300">Wishlist</a>
          <a href="./" class="block p-2 hover:bg-gray-300">Cart</a>
          <a href="./" class="block p-2 hover:bg-gray-300">Login</a>
        </div>
        <!-- Menu toggle button for smaller screens -->
        <button @click="toggleMenu" class="md:hidden text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <!-- Mobile menu for smaller screens -->
      <div v-if="open" class="md:hidden mt-4 bg-gray-300">
        <a href="/" class="block p-2 hover:bg-gray-300">Wishlist</a>
        <a href="./" class="block p-2 hover:bg-gray-300">Cart</a>
        <a href="./" class="block p-2 hover:bg-gray-300">Login</a>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  /**
   * @fileoverview The Navbar component provides the navigation bar for the application.
   * It includes links for navigation and a responsive menu that toggles visibility on smaller screens.
   */
  
  export default {
    /**
     * The name of the component.
     * @type {string}
     */
    name: 'Navbar',
  
    setup() {
      /**
       * Reactive state for menu visibility.
       * @type {import('vue').Ref<boolean>}
       */
      const open = ref(false);
  
      /**
       * Toggles the visibility of the mobile menu.
       * @function
       */
      const toggleMenu = () => {
        open.value = !open.value;
      };
  
      return {
        open,
        toggleMenu,
      };
    },
  };
  </script>
  