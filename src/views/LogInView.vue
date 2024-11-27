<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore';
import { ref, watch } from 'vue';

const store = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');

watch([email, password], () => {
	error.value = '';
});

async function login(event: MouseEvent) {
	event.preventDefault();

	try {
		store.login(email.value, password.value);

		await router.push('/');
	} catch (error_) {
		error.value = (error_ as Error).message;

		console.error(error);
	}
}
</script>

<template>
	<main>
		<h1>Login</h1>
		<form>
			<label for="email">Email</label>
			<input type="email" id="email" name="email" required v-model="email" />
			<label for="password">Password</label>
			<input type="password" id="password" name="password" required v-model="password" />
			<button id="submit" type="submit" @click="login">Login</button>
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
