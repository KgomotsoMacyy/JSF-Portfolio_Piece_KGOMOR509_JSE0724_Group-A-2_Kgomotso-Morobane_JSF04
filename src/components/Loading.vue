<template>
  <div class="flex items-center justify-center min-h-screen">
    <!-- Loading indicator -->
    <div v-if="loading" class="flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>

    <!-- Main content -->
    <div v-else class="text-lg text-green-600">
      <ProductGrid />
      <!-- Render your data or components here -->
    </div>
  </div>
</template>

<script>
import ProductGrid from './ProductGrid.vue';

export default {
  data() {
    return {
      loading: true, // initial loading state
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      // Simulate a data fetch with a timeout
      setTimeout(() => {
        this.loading = false; // Data loaded, turn off loading state
      }, 2000); // 2 seconds delay
    },
  },
};
</script>