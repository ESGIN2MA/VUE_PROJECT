<script setup lang="ts">
import FavoriteList from '@/components/FavoriteList.vue';
import AnimeList from '../components/AnimeList.vue';
</script>

<template>
	<main>
		<div class="welcome-title">
			<h1>Watch your favorites again !</h1>
		</div>
		<FavoriteList />

		<div class="welcome-title">
			<h1>Check what you didn't watch yet !</h1>
			<p>Find your next favorite anime</p>
		</div>
		<AnimeList />
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	padding: 1rem;
}

.welcome-title {
	margin-left: 5rem;
}

.welcome-title p {
	color: #c5c2c2;
}
</style>
