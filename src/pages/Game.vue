<template>
  <q-page class="flex flex-center column">
    <h1>Game</h1>

    <q-btn
      color="black"
      label="Начать игру"
      @click="fetchCategories"
    />
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  methods: {
    ...mapActions('storeGame', ['fetchCategories'])
  },

}
</script>
