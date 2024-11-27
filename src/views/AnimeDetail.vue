<script setup lang="ts">
import router from '@/router';
import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid';
import { PrinterIcon } from '@heroicons/vue/24/solid';
import { useAnimeStore } from '@/stores/anime';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import type { Anime } from '@/interfaces/Anime';

const route = useRoute();
const store = useAnimeStore();
const myId = Number(route.params.id);
const myAnime = store.getAnimeById(myId);
if (myAnime === undefined) {
	router.back();
}
const anime = myAnime as Anime;
const is_favorite = computed(() => store.isFavorite(anime));

function getAnimeGenres(genres: { name: string }[] | undefined): string {
	if (genres === undefined) {
		return '';
	}
	let s = '';
	for (const v of genres) {
		s += v.name + ', ';
	}
	return s.slice(0, -2);
}

function getIdFromLink(link: string): string {
	return link.split('?v=')[1].split('&')[0];
}

function printPage(){
    print();
}

const addToFavorite = () => {
	store.addFavorite(anime);
	localStorage.setItem('favorites', JSON.stringify(store.favorites));
};

const removeFromFavorite = () => {
	store.removeFavorite(anime);
	localStorage.setItem('favorites', JSON.stringify(store.favorites));
};
</script>

<template>
	<div class="anime-page">
		<div class="anime-header">
            <div class="anime-header-principal">
			    <img :src="anime?.images.jpg.large_image_url" class="anime-header-image" />
			    <div class="anime-header-infos">
			    	<span id="anime-title">{{ anime?.title }}</span>
			    	<span id="anime-genres">Genre(s) : {{ getAnimeGenres(anime?.genres) }}</span>
			    	<span id="anime-episodes">{{ anime?.episodes }} episodes</span>
			    	<span id="anime-score">Score : {{ anime?.score }} / 10</span>
			    </div>
            </div>
            <div class="anime-header-buttons">
                <StarSolidIcon v-if="is_favorite" @click="removeFromFavorite" class="btn btn-blue trash">Remove from favorites</StarSolidIcon>
			    <StarOutlineIcon v-else @click="addToFavorite" class="btn btn-blue">Add to favorites</StarOutlineIcon>
                <PrinterIcon class="btn btn-grey" @click="printPage"></PrinterIcon>
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
						<iframe
							:src="'https://www.youtube.com/embed/' + getIdFromLink(anime.trailer.url)"
							title=""
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						></iframe>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.anime-header{
    display: flex;
    justify-content: space-between;
}
.anime-page {
	padding: 1% 10%;
}

.anime-header-principal {
	display: flex;
	flex-direction: row;
    flex-basis: 60%;

	.anime-header-image {
		width: 15vw;
	}
}

.anime-header-infos {
	display: flex;
	flex-direction: column;
	padding: 0 2%;

	#anime-title {
		font-size: 3.5rem;
        text-decoration: underline;
        margin-bottom: 4%;
	}

    #anime-genres, #anime-episodes, #anime-score{
        font-size: 1.4rem;
    }

}

.anime-header-buttons{
    display: flex;
    justify-content: space-evenly;
    max-width: 6vw;
    min-width: fit-content;
    width: 6vw;
}

.anime-body {
	display: flex;
	flex-direction: row;

	.anime-body-text {
		flex-basis:70%;
        border: 1px solid gray;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        margin:1% 0;
        padding: 1%;

        h3{
            margin: 0 0 1% 0;
            padding: 0;
        }
	}

	.anime-body-info {
        flex-basis: 30%;
        min-height: 200%;
        padding: 0 0 0 5%;
		display: flex;
		flex-direction: column;

        #anime-trailer-yt iframe{
            width: 100%;
            height: fit-content;
            aspect-ratio: 16 / 9;
        }
	}
}

.btn {
	width: 2rem;
	height: 2rem;
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

.btn-blue{
    background-color: #007bff;
}

.btn-grey{
    background-color: grey;
}

.btn-grey:hover{
    background-color: slategray;
}

.btn-blue:hover {
	background-color: #0056b3;
}

@media print{
    .anime-body-info, .btn{
        display: none !important;
    }
    .anime-body-text{
        flex-basis: 100% !important;
    }
    .anime-page{
        padding: 0 !important;
    }
    #anime-title{
        font-size: 1.5rem !important;
    }
    .anime-header-image{
        width: 20vw !important;
    }
}
</style>
