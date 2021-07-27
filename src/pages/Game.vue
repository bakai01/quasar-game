<template>
  <q-page class="flex flex-center column">
    <h1>Whatever</h1>

    <div class="container">
      <div class="left-block">
        
      </div>
    </div>

    <q-btn
      color="black"
      label="Начать игру"
      @click="fetchQuestions"
      :disabled="getToggleDisableBtn"
    />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  methods: {
    ...mapActions('storeGame', ['fetchCategories', 'fetchQuestions'])
  },
  computed: {
    ...mapGetters('storeGame', ['getToggleDisableBtn', 'getCategories'])
  },
  mounted() {
    if (!this.getCategories.length) {
      this.fetchCategories()
    }
  }

}
</script>

<style lang="scss" scoped>

.container {

}

.left-block {

}

</style>
