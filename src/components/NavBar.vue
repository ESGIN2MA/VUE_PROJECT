<script setup lang="ts">
import { Role } from '@/interfaces/User';
import { useAuthStore } from '@/stores/useAuthStore';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

const isDarkMode = ref(false);

const toggleTheme = () => {
	isDarkMode.value = !isDarkMode.value;
	if (isDarkMode.value) {
		document.body.classList.add('body-dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.body.classList.remove('body-dark');
		localStorage.setItem('theme', 'light');
	}
};

onMounted(() => {
	isDarkMode.value = localStorage.getItem('theme') === 'dark';
	if (isDarkMode.value) {
		document.body.classList.add('body-dark');
	}
});
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
			<RouterLink to="/admin" class="nav-link" v-if="authStore.currentUser">Admin</RouterLink>
			<button v-if="!!authStore.currentUser" @click="authStore.logout" class="nav-link">Logout</button>
			<button @click="toggleTheme" class="theme-toggle-btn">
				<MoonIcon class="theme-toggle-btn-icon" v-if="!isDarkMode" />
				<SunIcon class="theme-toggle-btn-icon" v-else />
			</button>
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
	font-weight: 800;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	transition: background-color 0.3s;
}

.nav-link:hover {
	background-color: var(--color-background-mute);
}

.nav-link.router-link-active {
	color: black;
	background-color: #ff640a;
}

.theme-toggle-btn {
	background: none;
	border: none;
	color: white;
	cursor: pointer;
}

.theme-toggle-btn:hover {
	background-color: var(--color-background-mute);
}

.theme-toggle-btn-icon {
	height: 30px;
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
