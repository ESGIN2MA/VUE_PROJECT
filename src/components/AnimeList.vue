<script setup lang="ts">
import AnimeCard from '@/components/AnimeCard.vue';
import { useAnimesStore } from '@/stores/useAnimesStore';

const animeStore = useAnimesStore();
</script>

<template>
	<main>
		<div v-if="animeStore.loading" class="loading">Loading animes...</div>

		<div v-else-if="!!animeStore.error" class="error">
			{{ animeStore.error }}
		</div>

		<div v-else-if="animeStore.animes.length > 0" class="anime-list">
			<div v-for="anime in animeStore.animes" :key="anime.id" class="anime-item">
				<AnimeCard :anime="anime" :favoriteCard="false" />
			</div>
		</div>

		<p v-else class="no-animes">No anime found</p>
	</main>
</template>

<style scoped>
.loading,
.error,
.no-animes {
	text-align: center;
	padding: 20px;
}

.error {
	color: red;
}

.anime-list {
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.anime-item {
	cursor: pointer;
	transition: background-color 0.3s;
}
</style>
