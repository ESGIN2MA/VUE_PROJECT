<script setup lang="ts">
import router from '@/router';
import { useAnimeStore } from '@/stores/anime';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useAnimeStore();
const myId = Number(route.params.id);
const anime = store.getAnimeById(myId);
if (anime === undefined) {
	router.back();
}

function getAnimeGenres(genres: { name: string }[] | undefined): string {
	if (genres === undefined) {
		return '';
	}
	let s = '';
	for (const v of genres) {
		s += v.name + ', ';
	}
	return s.slice(0, -3);
}

function getIdFromLink(link: string): string {
	return link.split('?')[-1];
}
</script>

<template>
	<div class="anime-page">
		<div class="anime-header">
			<img :src="anime?.images.jpg.large_image_url" class="anime-header-image" />
			<div class="anime-header-principal">
				<span id="anime-title">{{ anime?.title }}</span>
				<span id="anime-genres">Genre(s) : {{ getAnimeGenres(anime?.genres) }}</span>
				<span id="anime-episodes">{{ anime?.episodes }} episodes</span>
				<span id="anime-score">Score : {{ anime?.score }} / 10</span>
			</div>
		</div>
		<div class="anime-body">
			<div class="anime-body-text">
				<div class="anime-body-synopsis">
					<h3>Synopsis</h3>
					{{ anime?.synopsis }}
				</div>
			</div>
			<div class="anime-body-info">
				<div id="anime-trailer-yt" v-if="anime?.trailer.url != null">
					<p>
						<iframe
							width="560"
							height="315"
							:src="'https://www.youtube.com/embed/' + getIdFromLink(anime.trailer.url)"
							title=""
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						></iframe>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.anime-page {
	padding: 1% 10%;
}

.anime-header {
	display: flex;
	flex-direction: row;

	.anime-header-image {
		width: 15%;
	}
}

.anime-header-principal {
	display: flex;
	flex-direction: column;
	padding: 0 2%;

	#anime-title {
		font-size: 2.5rem;
	}

	#anime-year {
		font-size: 1.5rem;
		color: grey;
	}
}

.anime-body {
	display: flex;
	flex-direction: row;

	.anime-body-text {
		flex-basis: 80%;
	}

	.anime-body-info,
	#anime-legal {
		display: flex;
		flex-direction: column;
	}
}
</style>
