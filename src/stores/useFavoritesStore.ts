import type { Anime } from '@/interfaces/Anime';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
	const storedFavorites: Anime[] = JSON.parse(localStorage.getItem('favorites') || '[]');
	const favorites = ref<Anime[]>(storedFavorites);

	watch(
		favorites,
		(favorites) => {
			localStorage.setItem('favorites', JSON.stringify(favorites));
		},
		{ deep: true },
	);

	function addFavorite(anime: Anime) {
		favorites.value.push(anime);
	}

	function removeFavorite(anime: Anime) {
		favorites.value = favorites.value.filter((favorite) => favorite.id !== anime.id);
	}

	function isFavorite(anime: Anime) {
		return favorites.value.some((favorite) => favorite.id === anime.id);
	}

	return { favorites, addFavorite, removeFavorite, isFavorite };
});
