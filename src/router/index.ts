
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '@/views/LogInView.vue'
import { APP_ROUTES } from './routes'
import RegisterView from '@/views/RegisterView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: APP_ROUTES.HOME.path,
      name: APP_ROUTES.HOME.name,
      component: HomeView,
    },
    {
      path: APP_ROUTES.LOGIN.path,
      name: APP_ROUTES.LOGIN.name,
      component: LogInView,
    },
    {
      path: APP_ROUTES.REGISTER.path,
      name: APP_ROUTES.REGISTER.name,
      component: RegisterView,
    }
  ],
})

export default router;
