import AnimeView from '@/views/AnimeView.vue';
import LogInView from '@/views/LogInView.vue';
import RegisterView from '@/views/RegisterView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
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
			meta: {
				requiresAuth: false, // true nécessite auth
			},
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
			meta: {
				requiresAuth: false, // true nécessite auth
			},
		},
		{
			path: APP_ROUTES.PROFILE.path,
			name: APP_ROUTES.PROFILE.name,
			component: UserProfileView,
			meta: {
				requiresAuth: false, // true nécessite auth
			},
		},
		{
			path: APP_ROUTES.DETAIL.path,
			name: APP_ROUTES.DETAIL.name,
			component: AnimeView,
			meta: {
				requiresAuth: false, // true nécessite auth
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		const token = localStorage.getItem('token');
		if (token) {
			// L'utilisateur est authentifié
			next();
		} else {
			// L'utilisateur n'est pas authentifié, on redirige vers la page de connexion
			next(APP_ROUTES.LOGIN.path);
		}
	} else {
		// Route sans authentification
		next();
	}
});

export default router;
