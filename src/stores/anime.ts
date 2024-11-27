import type { Anime } from '@/interfaces/Anime';
import { defineStore } from 'pinia';

export const useAnimeStore = defineStore('Animes', {
	state: () => ({
		animes: [] as Anime[],
		favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as Anime[],
	}),
	getters: {
		getAnimes: (state) => state.animes,
		getAnimeById: (state) => (id: number) => state.animes.find((anime: Anime) => anime.id === id),
		getFavorites: (state) => state.favorites,
	},
	actions: {
		setAnimes(animes: Anime[]) {
			this.animes = animes;
		},
		addFavorite(anime: Anime) {
			this.favorites.push(anime);
		},
		removeFavorite(anime: Anime) {
			this.favorites = this.favorites.filter((favorite) => favorite.id !== anime.id);
		},
		isFavorite(anime: Anime) {
			return this.favorites.some((favorite) => favorite.id === anime.id);
		},
	},
});
