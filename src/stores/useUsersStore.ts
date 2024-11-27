import type { IUser } from '@/interfaces/User';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUsersStore = defineStore('users', () => {
	const storedUsers: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
	const users = ref<IUser[]>(storedUsers);

	watch(
		users,
		(users) => {
			console.log('users', users);
			localStorage.setItem('users', JSON.stringify(users));
		},
		{ deep: true },
	);

	function addUser(user: IUser) {
		users.value.push(user);
	}

	function updateUser(user: IUser) {
		const index = users.value.findIndex((u) => u.email === user.email);

		if (index === -1) {
			throw new Error('User not found');
		}

		users.value[index] = user;
	}

	function deleteUser(user: IUser) {
		const index = users.value.indexOf(user);

		if (index === -1) {
			return;
		}

		users.value.splice(index, 1);
	}

	return { users, addUser, updateUser, deleteUser };
});
