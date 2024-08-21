import { ref, computed, watchEffect } from 'vue';

/**
 * Composable function to manage cart state across components.
 */
export default function useCart() {
  const cart = ref([]);

  // Initialize the cart from localStorage
  const loadCart = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart.value = JSON.parse(storedCart);
    }
  };

  // Add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId);
  };

  // Get total number of items in the cart
  const cartItemCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0));

  // Sync cart with localStorage whenever it changes
  watchEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  });

  loadCart();

  return {
    cart,
    addToCart,
    removeFromCart,
    cartItemCount,
  };
}
