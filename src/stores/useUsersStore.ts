import type { User } from '@/interfaces/User';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUsersStore = defineStore('users', () => {
	const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
	const users = ref<User[]>(storedUsers);

	watch(users, (users) => {
		console.log('users', users);
		localStorage.setItem('users', JSON.stringify(users));
	}, { deep: true });

	function addUser(user: User) {
		users.value.push(user);
	}

	function updateUser(user: User) {
		const index = users.value.findIndex((u) => u.email === user.email);

		if (index === -1) {
			throw new Error('User not found');
		}

		users.value[index] = user;
	}

	return { users, addUser, updateUser };
});
