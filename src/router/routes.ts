import LogInView from "@/views/LogInView.vue"

export const APP_ROUTES: Record<string, AppRoute> = {
    LOGIN: { path: "/login", name: "login" },
    REGISTER: { path: "/register", name: "register" },
    HOME: { path: "/", name: "home" }
}


export const getRoutePath = (routeName: string) => APP_ROUTES[routeName]?.path || "/";

export interface AppRoute {
    path: string,
    name: string,
}
