import { ref } from 'vue';

const isAuthenticated = ref(!!localStorage.getItem('jwt'));

export function useAuth() {
  const login = (token) => {
    localStorage.setItem('jwt', token);
    isAuthenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}