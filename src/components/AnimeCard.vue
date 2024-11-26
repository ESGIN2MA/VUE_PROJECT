<script setup lang="ts">
import type { Anime } from '@/interfaces/Anime';
import { computed, ref } from 'vue';

const props = defineProps<{
	anime: Anime;
}>();

const anime = ref<Anime>(props.anime);
const image_url = computed(() => anime.value.images.jpg.image_url);

const checkEpisodes = () => {
	if (!anime.value.episodes) {
		return 'Episode(s) : UNKNOWN';
	}
	return anime.value.episodes === 1 ? '---' : 'Episode(s) : ' + anime.value.episodes.toString();
};
</script>

<template>
	<div class="card">
		<div class="card-img-container">
			<img :src="image_url" class="card-img-top" />
		</div>
		<div class="card-body">
			<p class="card-title">{{ anime.title }} {{ anime.episodes === 1 ? '(MOVIE)' : '' }}</p>
			<p class="card-text">{{ checkEpisodes() }}</p>

			<p class="card-text">Score: {{ anime.score }} / 10</p>
			<p class="card-text">Rank: {{ anime.rank }}</p>
			<div class="card-text card-genre">
				Genre(s):
				<span>{{ anime.genres.map((genre) => genre.name).join(' / ') }}</span>
			</div>
			<a href="#" class="btn btn-primary">Add to favorites</a>
		</div>
	</div>
</template>

<style scoped>
.card {
	width: 18rem;
	margin: 1rem;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	transition: 0.3s;
}

.card:hover {
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
	font-size: 1.25rem;
	font-weight: bold;
	overflow: hidden;
	height: 3rem;
	text-overflow: ellipsis;
}

.card-text {
	font-size: 1rem;
	color: #555;
	margin-bottom: 1rem;
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
	background-color: #007bff;
	border: none;
	color: white;
	padding: 0.5rem 1rem;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 1rem;
	margin-top: 0.5rem;
	cursor: pointer;
	border-radius: 0.25rem;
}

.btn:hover {
	background-color: #0056b3;
}
</style>
