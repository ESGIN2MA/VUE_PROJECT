import type { Anime } from '@/interfaces/Anime';
import axios from 'axios';
import { ref } from 'vue';

const API_URL = 'https://api.jikan.moe/v4/anime';

export const fetchAnimes = async (): Promise<Anime[]> => {
	try {
		const response = await axios.get(API_URL + '?order_by=popularity&limit=24', {
			headers: {
				accept: 'application/json',
			},
		});

		// Convert the response to an array of animes
		const animes = ref<Anime[]>(
			response.data.data.map(
				(anime: {
					mal_id: number;
					url: string;
					images: object;
					trailer: object;
					title: string;
					episodes: number;
					score: number;
					scored_by: number;
					rank: number;
					synopsis: string;
					genres: object[];
				}) => ({
					id: anime.mal_id,
					url: anime.url,
					images: anime.images,
					trailer: anime.trailer,
					title: anime.title,
					episodes: anime.episodes,
					score: anime.score,
					scored_by: anime.scored_by,
					rank: anime.rank,
					synopsis: anime.synopsis,
					genres: anime.genres,
				}),
			),
		);
		return animes.value;
	} catch (error) {
		console.error('Error fetching animes:', error);
		throw error;
	}
};

export const fetchAnimeById = async (id: string) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`, {
			headers: {
				accept: 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching anime:', error);
		throw error;
	}
};
