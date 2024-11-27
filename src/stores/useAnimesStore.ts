import type { Anime } from '@/interfaces/Anime';
import { fetchAnimes } from '@/utils/ExternalAPI';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

export const useAnimesStore = defineStore('animes', {
	state: () => ({
		animes: [] as Anime[],
		loading: true,
		error: '',
	}),
	getters: {
		getById: (state) => (id: number) => state.animes.find((anime) => anime.id === id),
	},
	actions: {
		async fetchAnimes() {
			this.loading = true;
			try {
				this.animes = await fetchAnimes();
			} catch (error: unknown) {
				console.error('Error fetching animes:', error);
				this.error = (error as AxiosError).message;
				this.animes = [];
			} finally {
				this.loading = false;
			}
		},
	},
});
