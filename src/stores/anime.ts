import type { Anime } from '@/interfaces/Anime';
import { defineStore } from 'pinia';

export const useAnimeStore = defineStore('Animes', {
	state: () => ({
		animes: [] as Anime[],
		current_anime: {} as Anime,
	}),
	getters: {
		getAnimes: (state) => state.animes,
		getAnimeById: (state) => (id: number) => state.animes.find((anime: Anime) => anime.id === id),
		getCurrentAnime: (state) => state.current_anime,
	},
	actions: {
		setAnimes(animes: Anime[]) {
			this.animes = animes;
		},
		setCurrentAnime(anime: Anime) {
			this.current_anime = anime;
		},
	},
});
