<script setup lang="ts">
import AnimeCard from '@/components/AnimeCard.vue';
import type { Anime } from '@/interfaces/Anime';
import { useAnimesStore } from '@/stores/useAnimesStore';
import { computed, onMounted, ref } from 'vue';

const animeStore = useAnimesStore();

const animes = ref<Anime[]>(animeStore.animes);
const loading = ref(animeStore.loading);
const error = ref<string | null>(null);
const sortOrder = ref<string>('');

onMounted(async () => {
	await animeStore.fetchAnimes();
	animes.value = animeStore.animes;
	loading.value = animeStore.loading;
});

const sortedAnimes = computed(() => {
	return [...animes.value].sort((a, b) => {
		switch (sortOrder.value) {
			case 'rank-asc': {
				return a.rank - b.rank;
			}
			case 'rank-desc': {
				return b.rank - a.rank;
			}
			case 'name-asc': {
				return a.title > b.title ? 1 : -1;
			}
			case 'name-desc': {
				return b.title < a.title ? -1 : 1;
			}
			case 'ep-n-asc': {
				return a.episodes - b.episodes;
			}
			case 'ep-n-desc': {
				return b.episodes - a.episodes;
			}
			default: {
				return 0;
			}
		}
	});
});
</script>

<template>
	<main>
		<div v-if="loading" class="loading">Loading animes...</div>

		<div v-else-if="error" class="error">
			{{ error }}
		</div>

		<div v-else>
			<div class="sort">
				<label for="sortOrder">Sort by : </label>
				<select id="sortOrder" class="styled-select" v-model="sortOrder">
					<option value="">-----</option>
					<option value="rank-asc">Rank Ascending</option>
					<option value="rank-desc">Rank Descending</option>
					<option value="name-asc">Name Ascending</option>
					<option value="name-desc">Name Descending</option>
					<option value="ep-n-asc">Episodes number Ascending</option>
					<option value="ep-n-desc">Episodes number Descending</option>
				</select>
			</div>

			<div v-if="sortedAnimes.length > 0" class="anime-list">
				<div v-for="anime in sortedAnimes" :key="anime.id" class="anime-item">
					<AnimeCard :anime="anime" :favoriteCard="false" />
				</div>
			</div>

			<p v-else class="no-animes">No anime found</p>
		</div>
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

.sort {
	margin-bottom: 20px;
	margin-left: 5rem;
	text-align: left;
}

.styled-select {
	padding: 10px;
	margin: 0 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: #fff;
	font-size: 16px;
	color: #333;
	outline: none;
	transition: border-color 0.3s;
}

.styled-select:focus {
	border-color: #007bff;
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
