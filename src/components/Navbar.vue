<template>
    <nav class="fixed w-full bg-gray-300 p-4 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Brand name -->
        <a class="text-lg font-bold"
         href="/"
        ><img src="/public/favicon.ico"></a>
        <p class="text-lg">TakeItAll</p>
        <!-- Navigation links for larger screens -->
        <div class="hidden md:flex hover:pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
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
        <a href="/" class="block p-2 hover:bg-gray-300">wishlist</a>
        <a href="./" class="block p-2 hover:bg-gray-300">cart</a>
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
  