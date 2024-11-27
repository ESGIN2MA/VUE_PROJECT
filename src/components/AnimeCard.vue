<script setup lang="ts">
import type { Anime } from '@/interfaces/Anime';
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';

const props = defineProps<{
	anime: Anime;
	favoriteCard: boolean;
}>();

const authStore = useAuthStore();

const favoritesStore = useFavoritesStore();

const anime = ref<Anime>(props.anime);

const isFavorite = computed(() => favoritesStore.isFavorite(anime.value));

function checkEpisodes() {
	if (!anime.value.episodes) {
		return 'Episode(s) : UNKNOWN';
	}
	return anime.value.episodes === 1 ? '---' : `Episode(s) : ${anime.value.episodes.toString()}`;
}

function addToFavorite() {
	favoritesStore.addFavorite(anime.value);
}

function removeFromFavorite() {
	favoritesStore.removeFavorite(anime.value);
}

function animeDetails() {
	if (!authStore.currentUser) {
		router.push('/login').catch((error: unknown) => {
			console.error('Failed to navigate to login:', error);
		});

		return;
	}

	router.push('/anime/' + anime.value.id.toString()).catch((error: unknown) => {
		console.error('Failed to navigate to anime details:', error);
	});
}
</script>

<template>
	<div v-if="props.favoriteCard" class="card-small" @click="animeDetails">
		<div class="card-img-container-small">
			<img :src="anime.images.jpg.image_url" class="card-img-top-small" />
		</div>
		<div class="card-body-small">
			<p class="card-title-small">{{ anime.title }} {{ anime.episodes === 1 ? '(MOVIE)' : '' }}</p>
		</div>
		<div class="card-trash-small" @click.stop>
			<StarSolidIcon @click="removeFromFavorite" class="btn-trash-small">Remove from favorites</StarSolidIcon>
		</div>
	</div>

	<div v-else class="card" @click="animeDetails">
		<div class="card-img-container">
			<img :src="anime.images.jpg.large_image_url" class="card-img-top" />
		</div>
		<div class="card-body">
			<p class="card-title">{{ anime.title }} {{ anime.episodes === 1 ? '(MOVIE)' : '' }}</p>
			<p class="card-text">{{ checkEpisodes() }}</p>

			<p class="card-text">Score: {{ anime.score }} / 10 | Rank: {{ anime.rank }}</p>
			<div class="card-text card-genre">
				Genre(s):
				<span>{{ anime.genres.map((genre) => genre.name).join(' / ') }}</span>
			</div>
			<div @click.stop>
				<StarSolidIcon v-if="isFavorite" @click="removeFromFavorite" class="btn trash"
					>Remove from favorites</StarSolidIcon
				>
				<StarOutlineIcon v-else @click="addToFavorite" class="btn">Add to favorites</StarOutlineIcon>
			</div>
		</div>
	</div>
</template>

<style scoped>
.card-small {
	display: flex;
	align-items: center;
	width: 400px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	padding: 1rem;
	border: 1px solid #c5c2c2;
	border-radius: 10px;
	cursor: pointer;
}

.card-small:hover {
	box-shadow: 5px 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img-container-small {
	width: 25%;
	height: 100px;
	margin-right: 0.5rem;
	flex-shrink: 0;
}

.card-img-top-small {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.card-body-small {
	width: 50%;
	flex-grow: 1;
	margin-right: 0.5rem;
}

.card-title-small {
	font-size: 1rem;
	font-weight: bold;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

.card-trash-small {
	width: 10%;
	height: 100%;
	background-color: #007bff;
	border: none;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 0.25rem;
	padding: 0.3rem;
}

.card {
	width: 15rem;
	margin: 1rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	transition: 0.3s;
}

.card:hover {
	box-shadow: 10px 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img-container {
	height: 25rem;
	overflow: hidden;
}

.card-img-top {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.card-body {
	padding: 1rem;
}

.card-title {
	font-weight: bold;
	overflow: hidden;
	height: 2rem;
	text-overflow: ellipsis;
}

.card-text {
	font-size: 1rem;
	color: #c5c2c2;
	height: auto;
	overflow: hidden;
	text-overflow: ellipsis;
	width: auto;
}

.card-genre {
	min-height: 3rem;
	font-weight: bold;
	max-height: 3rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.btn {
	width: 2rem;
	height: 2rem;
	background-color: #007bff;
	border: none;
	color: white;
	padding: 0.5rem 0.5rem;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 1rem;
	cursor: pointer;
	border-radius: 0.25rem;
	margin-left: auto;
}

.btn:hover {
	background-color: #0056b3;
}
</style>
