export interface AppRoute {
	path: string;
	name: string;
}

export const APP_ROUTES: Record<string, AppRoute> = {
	LOGIN: { path: '/login', name: 'login' },
	REGISTER: { path: '/register', name: 'register' },
	HOME: { path: '/', name: 'home' },
	DETAIL: { path: '/anime/:id', name: 'anime' },
};

export const getRoutePath = (routeName: string) => (routeName in APP_ROUTES ? APP_ROUTES[routeName].path : '/');
