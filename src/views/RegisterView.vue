<script setup lang="ts">
import { useUsersStore } from '@/stores/useUsersStore';
import { ref } from 'vue';

const store = useUsersStore();

const username = ref('');
const email = ref('');
const password = ref('');

function register(event: MouseEvent) {
	event.preventDefault();

	store.addUser({
		username: username.value,
		email: email.value,
		password: password.value,
	});
}
</script>

<template>
	<main>
		<h1>Register</h1>
		<form>
			<label for="username">Username</label>
			<input type="text" id="username" name="username" required v-model="username" />
			<label for="email">Email</label>
			<input type="email" id="email" name="email" required v-model="email" />
			<label for="password">Password</label>
			<input type="password" id="password" name="password" required v-model="password" />
			<button id="submit" type="submit" @click="register">Register</button>
		</form>
	</main>
</template>

<style>
form > * {
	display: block;
}

form label {
	margin-top: 1rem;
}

#submit {
	margin-top: 1rem;
}
</style>
