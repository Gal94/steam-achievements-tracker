<template>
  <pre>{{ gamesStore.games }}</pre>
</template>

<script setup lang="ts">
const gamesStore = useGamesStore()
onMounted(async () => await gamesStore.fetchGames())
</script>

<style scoped></style>
