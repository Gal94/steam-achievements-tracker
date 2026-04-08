import type { GameWithStats, SteamGame } from '../../types/game.js'

export const useGamesStore = defineStore('games', {
  state: () => {
    return {
      games: [] as SteamGame[],
      gamesWithStats: [] as GameWithStats[],
    }
  },
  getters: {
    totalGames: (state) => {
      return state.games.length || 0
    },
    totalGamesWithAchievementsTracked: (state) => {
      // TODO: gamesWithStats filtered with where achievement_status = loaded and unlocked_count > 0
      return 0
    },
    averageCompletion: (state) => {
      // TODO: completetion percentage of all games with condition from above
    },
    perfectGames: (state) => {
      return state.gamesWithStats.filter(
        (game) => game.achievement_status === 'loaded' && game.completion_percentage === 100
      )
    },
  },
  actions: {
    async fetchGames() {
      const response = await $fetch('/api/games')
      this.games = response.games
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGamesStore, import.meta.hot))
}
