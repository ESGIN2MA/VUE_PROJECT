<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore';
import { ref } from 'vue';

const store = useAuthStore();

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

async function register(event: MouseEvent) {
	event.preventDefault();

	try {
		store.register({
			username: username.value,
			email: email.value,
			password: password.value,
		});

		await router.push('/login');
	} catch (error_) {
		error.value = (error_ as Error).message;

		console.error(error);
	}
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
			<p id="error" v-if="!!error">{{ error }}</p>
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

#error {
	color: red;
	margin-top: 1rem;
}
</style>
