<template>
    <!-- Container for centering the form both vertically and horizontally -->
    <div class="flex justify-center items-center h-screen">
      <!-- Form container with max-width and styling -->
      <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <!-- Heading of the form -->
        <h2 class="text-center text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
        <!-- Form element that prevents the default form submission behavior -->
        <form @submit.prevent="handleLogin">
          <!-- Username input field -->
          <div>
            <!-- Label for the username input field -->
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <!-- Username input field bound to the 'username' ref variable -->
            <input 
              v-model="username" 
              id="username" 
              name="username" 
              type="text" 
              autocomplete="username" 
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
          </div>
  
          <!-- Password input field -->
          <div class="mt-4">
            <!-- Label for the password input field -->
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <!-- Password input field with dynamic type for visibility toggle -->
              <input 
                :type="passwordFieldType" 
                v-model="password" 
                id="password" 
                name="password" 
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <!-- Button to toggle password visibility -->
              <button 
                type="button" 
                @click="togglePasswordVisibility" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {{ passwordFieldType === 'password' ? 'Show' : 'Hide' }}
              </button>
            </div>
          </div>
  
          <!-- Submit button for the form -->
          <div class="mt-6">
            <button 
              type="submit" 
              :disabled="loading" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <!-- Show loading text when 'loading' is true, otherwise show 'Sign in' -->
              <span v-if="loading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
  
          <!-- Error message container -->
          <div v-if="error" class="mt-4 text-center text-red-500">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'; // Import ref for creating reactive variables
  import { useRouter } from 'vue-router'; // Import useRouter for navigation
  
  export default {
    setup() {
      // Reactive references for form inputs and state
      const username = ref(''); // Stores the username input
      const password = ref(''); // Stores the password input
      const passwordFieldType = ref('password'); // Manages visibility of the password field
      const loading = ref(false); // Indicates if the form submission is in progress
      const error = ref(null); // Stores error messages
  
      // Router instance for navigation
      const router = useRouter();
  
      // Function to toggle the visibility of the password field
      const togglePasswordVisibility = () => {
        passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
      };
  
      // Function to handle form submission
      const handleLogin = async () => {
        // Validate that username and password are provided
        if (!username.value || !password.value) {
          error.value = 'Username and password are required';
          return;
        }
  
        // Set loading state and clear previous error
        loading.value = true;
        error.value = null;
  
        try {
          // Send login request to the API
          const response = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username.value,
              password: password.value
            })
          });
  
          // Check if response is not ok and throw error
          if (!response.ok) {
            throw new Error('Login failed');
          }
  
          // Parse response JSON
          const data = await response.json();
          console.log(data); // Log response data for debugging
  
          // Store JWT token in local storage
          localStorage.setItem('jwt', data.token);
  
          // Redirect to the path stored in local storage or default to '/'
          const redirectPath = localStorage.getItem('redirectPath') || '/';
          router.push(redirectPath);
        } catch (err) {
          // Handle and display login errors
          error.value = 'Login failed. Please check your credentials.';
        } finally {
          // Reset loading state
          loading.value = false;
        }
      };
  
      // Return reactive variables and methods to be used in the template
      return {
        username,
        password,
        passwordFieldType,
        loading,
        error,
        togglePasswordVisibility,
        handleLogin
      };
    }
  };
  </script>