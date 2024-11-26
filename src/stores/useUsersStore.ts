import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface User {
	email: string;
	username: string;
	password: string;
}

export const useUsersStore = defineStore('users', () => {
	const users = ref<User[]>([]);

	function addUser(user: User) {
		if (users.value.some((u) => u.email === user.email)) {
			throw new Error('User already exists');
		}

		user.password = btoa(user.password);

		users.value.push(user);
	}

	return { addUser };
});
