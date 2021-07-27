<template>
  <q-page class="flex flex-center column">
    <h1>Whatever</h1>

    <div class="container">
      <div class="left-block">
        <div v-for="category in getQuestions" :key="category.id">{{ category.title }}</div>
      </div>

      <div class="right-block">
        <div v-for="questionArr in getQuestions" :key="questionArr.id">
          <button v-for="question in questionArr.clues" :key="question.id" :label="question.value" color="primary">
            {{ question.value }}
          </button>
        </div>
      </div>
    </div>

    <q-btn
      color="black"
      label="Начать игру"
      @click="gameStart"
      :disabled="getToggleDisableBtn"
    />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  methods: {
    ...mapActions('storeGame', ['fetchCategories', 'fetchQuestions']),
    gameStart() {
      if (!this.getCategories.length) {
        this.fetchQuestions()
      }
      console.log(this.getQuestions)
    }
  },
  computed: {
    ...mapGetters('storeGame', ['getToggleDisableBtn', 'getCategories', 'getQuestions'])
  },

}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: row;
}

.left-block {
  display: flex;
  flex-direction: column;
}

.right-block {  
  display: flex;
  flex-direction: column;
}

</style>
