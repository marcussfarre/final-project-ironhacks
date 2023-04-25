import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import SigninView from '@/views/SigninView.vue'
import SignupView from '@/views/SignupView.vue'
import UserStore from '@/stores/user.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'sign-in',
          name: 'signIn',
          component: SigninView,
        },
        {
          path: 'sign-up',
          name: 'signUp',
          component: SignupView,
        }
      ]
    },
  ]
})

router.beforeEach((to) => {
  const userUserStore = UserStore();
  //const isLogged = userUserStore.user !== null;

  const isLogged = true;
  if (!isLogged && to.name !== 'signIn' && to.name !== 'signUp') {
    return { name: 'signIn' }
  }
})

export default router
