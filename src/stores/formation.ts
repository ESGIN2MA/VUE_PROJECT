import { defineStore } from 'pinia'

export const useFormationStore = defineStore("Formations", {
  state: () => ({
      formations: [] as string[],
  }),
  getters: {
      getFormations: (state) => state.formations,
      // getFormation: (state) => (id: string) => state.formations.find((Formation: Formation) => Formation.id === id)
  },
  actions: {
      addFormation(formation: string) {
          this.formations.push(formation)
      },
  },
})