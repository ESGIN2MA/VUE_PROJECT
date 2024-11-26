<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Anime } from '@/interfaces/Anime'
import { useAnimeStore } from '@/stores/anime'
import { fetchAnimes } from '@/utils/ExternalAPI'
import AnimeCard from '@/components/AnimeCard.vue'

const router = useRouter()
const animeStore = useAnimeStore()

const animes = ref<Anime[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    const fetchedAnimes : Anime[] = await fetchAnimes()
    
    animeStore.setAnimes(fetchedAnimes)
    animes.value = fetchedAnimes
    
    error.value = null
  } catch (fetchError) {
    console.error('Error while loading animes :', fetchError)
    error.value = 'Unable to load anime list'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>    
    <div v-if="loading" class="loading">
      Loading animes...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="animes.length" class="anime-list">
      <div v-for="anime in animes" :key="anime.id " class="anime-item">
        <AnimeCard :anime="anime" />
      </div>
    </div>
    
    <p v-else class="no-animes">
      No anime found
    </p>
  </main>
</template>

<style scoped>
.loading, .error, .no-animes {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
}

.anime-list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.anime-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.anime-item:hover {
  background-color: #f0f0f0;
}
</style>