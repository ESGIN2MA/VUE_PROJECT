import type { Anime } from '@/interfaces/Anime';
import { fetchAnimes } from '@/utils/ExternalAPI';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

export const useAnimesStore = defineStore('animes', () => {
	const animes = ref<Anime[]>([]);
	const loading = ref(false);
	const error = ref('');

	onMounted(async () => {
		loading.value = true;

		animes.value = await fetchAnimes().catch((error_: unknown) => {
			console.error('Error fetching animes:', error);

			error.value = (error_ as AxiosError).message;

			return [];
		});

		loading.value = false;
	});

	function getById(id: number) {
		return animes.value.find((anime) => anime.id === id);
	}

	return { animes, loading, error, getById };
});
