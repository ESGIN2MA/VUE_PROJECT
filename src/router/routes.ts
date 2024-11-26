export const APP_ROUTES: Record<string, AppRoute> = {
	HOME: { path: '/', name: 'home' },
	LOGIN: { path: '/login', name: 'login' },
	REGISTER: { path: '/register', name: 'register' },
	PROFILE: { path: "/profile", name: "profile" }
};

export const getRoutePath = (routeName: string) => (routeName in APP_ROUTES ? APP_ROUTES[routeName].path : '/');

export interface AppRoute {
	path: string;
	name: string;
}
