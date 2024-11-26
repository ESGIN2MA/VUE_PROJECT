<script lang="ts">
import { defineComponent } from 'vue'
import { Formation } from '@/types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'FormationList',
  setup() {
    const store = useStore()
    const router = useRouter()

    const formations = store.state.formations

    const goToFormation = (formation: Formation) => {
      router.push(`/formations/${formation.id}`)
    }

    return {
      formations,
      goToFormation
    }
  }
})

</script>

<template>
  <main>
    <h1>Formations</h1>
    <ul>
      <li v-for="formation in formations" :key="formation.id" @click="goToFormation(formation)">
        {{ formation.name }}
      </li>
    </ul>
  </main>
</template>