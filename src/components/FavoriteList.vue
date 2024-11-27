<script setup lang="ts">
import AnimeCard from '@/components/AnimeCard.vue';
import 'vue3-carousel/dist/carousel.css';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { Carousel, Slide } from 'vue3-carousel';

const favoritesStore = useFavoritesStore();
</script>

<template>
	<main>
		<div v-if="favoritesStore.favorites.length > 0" class="anime-list">
			<carousel :items-to-show="favoritesStore.favorites.length / 1.2">
				<slide v-for="anime in favoritesStore.favorites" :key="anime.id">
					<AnimeCard :anime="anime" :favoriteCard="true" />
				</slide>
			</carousel>
		</div>

		<p v-else class="no-animes">No favorite anime yet..</p>
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
	padding: 10px;
	cursor: pointer;
	transition: background-color 0.3s;
}
</style>
