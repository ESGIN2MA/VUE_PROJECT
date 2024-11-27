import { User, type IUser } from '@/interfaces/User';
import { APP_ROUTES } from '@/router/routes';
import { defineStore, MutationType } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from './useUsersStore';

export const useAuthStore = defineStore('auth', () => {
	const usersStore = useUsersStore();
	const router = useRouter();

	const storedUser: IUser | null = JSON.parse(localStorage.getItem('current-user') || 'null');
	const currentUser = ref<IUser | null>(storedUser);

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

	function register(user: Pick<IUser, 'email' | 'username' | 'password'>) {
		if (usersStore.users.some((u) => u.email === user.email)) {
			throw new Error('User already exists');
		}
		// hach
		usersStore.addUser(new User(user.email, user.username, btoa(user.password)));
	}

	function login(email: string, password: string) {
		const user = usersStore.users.find((u) => u.email === email && u.password === btoa(password));

		if (!user) {
			throw new Error('User not found');
		}
		user.isConnected = true;
		currentUser.value = user;

		usersStore.updateUser(currentUser.value);
	}

	function logout() {
		if (!currentUser.value) {
			return;
		}

		currentUser.value.isConnected = false;

		usersStore.updateUser(currentUser.value);

		currentUser.value = null;

		localStorage.removeItem('favorites');

		router.push(APP_ROUTES.LOGIN.path).catch((error: unknown) => {
			console.error('Failed to navigate', error);
		});
	}

	return { register, login, logout, currentUser };
});
