<script setup lang="ts">
import "@/assets/anime-detail.css"
</script>

<template>
    <div class="anime-page">
        <div class="anime-header">
            <img src="https://cdn.myanimelist.net/images/anime/1404/98182l.jpg" class="anime-header-image"><!--anime.images.jpg.large_image.url-->
            <div class="anime-header-principal">
                <span id="anime-title">anime.title_english</span>
                <span id="anime-year">anime.year</span>
                <span id="anime-genres">Genres : genre.name for genre in anime.genres</span><!-- Do a function that will split with a comma -->
                <span id="anime-themes">Themes : theme.name for theme in anime.themes</span>
                <span id="anime-episodes">anime.episodes episodes - anime.status</span>
                <span id="anime-age-rating">Age rating : anime.rating</span>
                <span id="anime-score">Score : anime.score / 10</span>
                <span id="anime-alt-titles">Alternative Titles : title for title in anime.titles (excluding title_english)</span><!-- ditto -->
                
                <!--External links? mal and trailer-->
            </div>
        </div>
        <div class="anime-body">
            <div class="anime-body-text">
                <div class="anime-body-synopsis">
                    <h3>Synopsis</h3>
                    anime.synopsis
                </div>
                <div class="anime-body-background">
                    <h3>Background</h3>
                    anime.background
                </div>
            </div>
            <div class="anime-body-info">
                <div id="anime-trailer-yt"> <!--if exists-->

                </div>
                <div id="anime-legal">
                    Studios:
                    <span id="anime-legal-studios">studio for studio in anime.studios</span>
                    Licensed by <span id="anime-legal-licensed">licensors for licensors in anime.licensors</span>
                </div>
                
            </div>
            

        </div>
    </div>

</template>
