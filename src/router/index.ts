import AnimeDetail from '@/views/AnimeDetail.vue';
import LogInView from '@/views/LogInView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { APP_ROUTES } from './routes';

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
		},
		{
			path: APP_ROUTES.DETAIL.path,
			name: APP_ROUTES.DETAIL.name,
			component: AnimeDetail,
		},
	],
});

export default router;
