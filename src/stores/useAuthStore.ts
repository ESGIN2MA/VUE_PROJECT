import type { Role, User } from '@/interfaces/User';
import { defineStore, MutationType } from 'pinia';
import { ref, watch } from 'vue';
import { useUsersStore } from './useUsersStore';

export const useAuthStore = defineStore('auth', () => {
	const usersStore = useUsersStore();

	const storedUser: User | null = JSON.parse(localStorage.getItem('current-user') || 'null');
	const currentUser = ref<User | null>(storedUser);

	watch(currentUser, (currentUser) => {
		localStorage.setItem('current-user', JSON.stringify(currentUser));
	});

	usersStore.$subscribe((mutation, state) => {
		if (mutation.type !== MutationType.patchObject || !currentUser.value) {
			return;
		}

		// Temporaire, gestion des utilisateurs locaux. Dans le cas ou l'on modifie un utilisateur
		// on met à jour notre propre utilisateur
		// Quand il y aura l'administration il faudra avoir un moyen de détecter quel utilisateur a été modifié
		const foundUser = state.users.find((user) => user.email === currentUser.value?.email);
		if (foundUser) {
			currentUser.value = foundUser;
		}
	});

	function register(user: Pick<User, 'email' | 'username' | 'password'>) {
		if (usersStore.users.some((u) => u.email === user.email)) {
			throw new Error('User already exists');
		}

		usersStore.addUser({
			...user,
			password: btoa(user.password),
			roles: [],
		});
	}

	function login(email: string, password: string) {
		const user = usersStore.users.find((u) => u.email === email && u.password === btoa(password));

		if (!user) {
			throw new Error('User not found');
		}

		currentUser.value = {
			...user,
			roles: [...new Set([...user.roles, 'connected'])] as Role[],
		};

		usersStore.updateUser(currentUser.value);
	}

	function logout() {
		currentUser.value = null;
	}

	return { register, login, logout, currentUser };
});
