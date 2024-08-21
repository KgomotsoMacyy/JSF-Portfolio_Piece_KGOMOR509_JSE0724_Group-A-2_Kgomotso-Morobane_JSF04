import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Path to Home.vue
import ProductDetail from '../views/ProductDetails.vue'; // Path to ProductDetails.vue
import Login from '../components/Login.vue'; // Path to Login.vue
import Cart from '../views/Cart.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetail, props: true },
  { path: '/login', component: Login },  // Add the login route
  { path: '/cart', component: Cart },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


