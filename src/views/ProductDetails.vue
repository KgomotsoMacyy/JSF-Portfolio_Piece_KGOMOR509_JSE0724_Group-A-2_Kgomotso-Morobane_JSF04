<template>
  <main>
    <!-- Display error message if there's an error -->
    <div v-if="error" class="flex justify-center p-5">
      <Error :message="error" />
    </div>

    <!-- Display loading state while data is being fetched -->
    <div v-else-if="loading" class="flex justify-center p-5">
      <Loading />
    </div>

    <!-- Display product details if available -->
    <div v-else class="grid space-y-5">
      <button @click="goBack" class="bg-gray-300 text-black py-2 px-4 rounded">
        Back to Home
      </button>
      <div v-if="product" class="flex flex-col items-center bg-white border-2 border-white p-4">
        <img :src="product.image" :alt="product.title" class="object-contain h-48 mt-3 mb-3" />
        <h1 class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">{{ product.title }}</h1>
        <p class="mt-2 text-center text-gray-700 mb-3">{{ product.description }}</p>
        <h2 class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug mb-3">$ {{ product.price }}</h2>
        <div class="justify-start flex-1 mt-2 mb-3">
          <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{ product.category }}</span>
        </div>
        <p class="mt-2 text-gray-700 mb-3">⭐ {{ product.rating?.rate }}</p>
        <p class="mt-1 text-gray-700 mb-3">Reviews: {{ product.rating?.count }}</p>
        <!-- Add to Cart button -->
        <button @click="addToCart(product)" class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-75 transition duration-200">
          Add To Cart
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useCart from '../router/useCart';
import Loading from '../components/Loading.vue';

export default {
  name: 'ProductDetail',
  components: {
    Loading,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const { addToCart } = useCart();
    const product = ref(null);
    const error = ref(null);
    const loading = ref(true);

    const router = useRouter();
    const route = useRoute();

    const getProductDetails = async (productId) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { response: data, error: null };
      } catch (err) {
        return { response: null, error: err.message };
      }
    };

    const goBack = () => {
      router.push({ path: '/', query: route.query });
    };

    onMounted(async () => {
      const { response, error: fetchError } = await getProductDetails(props.id);
      if (fetchError) {
        error.value = fetchError;
      } else {
        product.value = response;
      }
      loading.value = false;
    });

    return {
      product,
      error,
      loading,
      addToCart,
      goBack,
    };
  },
};
</script>