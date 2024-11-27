<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
</script>

<template>
	<nav class="navbar">
		<div class="logo-container">
			<RouterLink to="/">
				<span class="brand-name">My Tinder Academia</span>
			</RouterLink>
		</div>
		<div class="nav-links">
			<RouterLink to="/" class="nav-link">Home</RouterLink>
			<RouterLink to="/register" class="nav-link" v-if="!authStore.currentUser">Register</RouterLink>
			<RouterLink to="/login" class="nav-link" v-if="!authStore.currentUser">Login</RouterLink>
			<RouterLink to="/profile" class="nav-link" v-if="!!authStore.currentUser">Profile</RouterLink>
		</div>
	</nav>
</template>

<style scoped>
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	background-color: #23252b;
	color: white;
}

.logo-container {
	display: flex;
	align-items: center;
}

.logo-container a {
	display: flex;
	align-items: center;
	text-decoration: none;
}

.logo {
	width: 32px;
	height: 32px;
	margin-right: 1rem;
}

.brand-name {
	font-size: 2rem;
	font-weight: 700;
	letter-spacing: 0.1rem;
	color: #ff640a;
}

.brand-name:hover {
	color: white;
	transition: color 0.3s;
}

.nav-links {
	display: flex;
	gap: 2rem;
}

.nav-link {
	color: var(--color-text);
	text-decoration: none;
	font-weight: 500;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	transition: background-color 0.3s;
}

.nav-link:hover {
	background-color: var(--color-background-mute);
}

.nav-link.router-link-active {
	color: blue;
	background-color: lightcyan;
}

@media (max-width: 768px) {
	.navbar {
		flex-direction: column;
		padding: 1rem;
		gap: 1rem;
	}

	.nav-links {
		width: 100%;
		justify-content: center;
	}
}
</style>
