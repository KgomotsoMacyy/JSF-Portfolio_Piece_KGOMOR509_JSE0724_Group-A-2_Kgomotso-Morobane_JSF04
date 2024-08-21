<template>
  <!-- Main container for the page content -->
  <div class="container bg-white text-gray-800 mx-auto p-6">
    <!-- Filters and sorting controls -->
    <div class="mt-20 flex justify-between items-center flex-wrap mb-4">
      <!-- Category selection dropdown -->
      <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <!-- Search input and button -->
      <div class="flex items-center mb-2 sm:mb-0">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border p-2 rounded-l"
        />
        <button
          @click="searchProducts"
          class="bg-white text-black border border-l-0 p-2 rounded-r"
        >
          Search
        </button>
      </div>

      <!-- Sorting dropdown -->
      <select v-model="sortOrder" class="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="default">Default</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>

    <!-- Loading indicator -->
    <Loading v-if="loading" />
    <!-- Grid of filtered products -->
    <ProductGrid :products="filteredProducts" v-else />
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Login from '../components/Login.vue'
import Loading from '../components/Loading.vue';
import ProductGrid from '../components/ProductGrid.vue';

export default {
  components: {
    Loading,
    ProductGrid
  },

  setup() {
    const products = ref([]);
    const categories = ref([]);
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const sortOrder = ref('');
    const loading = ref(true);

    const router = useRouter();
    const route = useRoute();

    const fetchProducts = async () => {
      loading.value = true;
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      products.value = data;
      loading.value = false;
    };

    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      categories.value = data;
    };

    const searchProducts = () => {
      updateQueryParams();
    };

    const updateQueryParams = () => {
      router.push({
        path: '/',
        query: {
          category: selectedCategory.value,
          search: searchQuery.value,
          sort: sortOrder.value,
        },
      });
    };

    const filteredProducts = computed(() => {
      let prods = products.value;

      if (selectedCategory.value) {
        prods = prods.filter(product => product.category === selectedCategory.value);
      }
      if (sortOrder.value === 'asc') {
        prods = prods.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === 'desc') {
        prods = prods.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === 'default') {
        prods = prods.sort((a, b) => a.id - b.id);
      }

      if (searchQuery.value) {
        prods = prods.filter(product =>
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return prods;
    });

    onMounted(() => {
      fetchProducts();
      fetchCategories();
      if (route.query.category) selectedCategory.value = route.query.category;
      if (route.query.search) searchQuery.value = route.query.search;
      if (route.query.sort) sortOrder.value = route.query.sort;
    });

    watch([selectedCategory, searchQuery, sortOrder], updateQueryParams);

    return {
      products,
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      searchProducts,
      filteredProducts
    };
  }
};
</script>