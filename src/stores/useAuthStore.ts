import type { Role, User } from '@/interfaces/User';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useUsersStore } from './useUsersStore';

export const useAuthStore = defineStore('auth', () => {
	const userStore = useUsersStore();

	const storedUser: User | null = JSON.parse(localStorage.getItem('current-user') || 'null');
	const currentUser = ref<User | null>(storedUser);

	watch(currentUser, (currentUser) => {
		localStorage.setItem('current-user', JSON.stringify(currentUser));
	});

	function register(user: Pick<User, 'email' | 'username' | 'password'>) {
		if (userStore.users.some((u) => u.email === user.email)) {
			throw new Error('User already exists');
		}

		userStore.addUser({
			...user,
			password: btoa(user.password),
			roles: [],
		});
	}

	function login(email: string, password: string) {
		const user = userStore.users.find((u) => u.email === email && u.password === btoa(password));

		if (!user) {
			throw new Error('User not found');
		}

		currentUser.value = {
			...user,
			roles: [...new Set([...user.roles, 'connected'])] as Role[],
		};

		userStore.updateUser(currentUser.value);
	}

	function logout() {
		currentUser.value = null;
	}

	return { register, login, logout, currentUser };
});
