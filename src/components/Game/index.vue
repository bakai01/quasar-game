<template>
  <div class="game">
    <div v-for="category in getQuestions" :key="category.id" class="game-row">
      <span>{{ category.title }}</span>

      <div class="game-row__right">
        <button
          v-for="question in category.clues"
          :key="question.id"
          class="game-row__btn"
          @click="emitQuestion(category.id, question.id, question.value)"
          :disabled="!question.value"
        >
          {{ question.value }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Game",
  computed: {
    ...mapGetters('storeGame', ['getQuestions'])
  },
  methods: {
    emitQuestion(categoryId, questionId, value) {
      this.$emit('choiceQuestion', { categoryId, questionId, value })
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  padding: 150px;

  &-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $blue-grey-10;

    span {
      font-size: 1.5rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    &__right {
      margin-left: 25px;
      display: flex;
    }

    &__btn {
      border: 1px solid rgb(128, 128, 128);
      font-size: 1rem;
      cursor: pointer;
      margin: 1px;
      width: 70px;
      height: 70px;
      background-color: $green-13;
      transition: all .2s linear;

      &:hover {
        background-color: darken($green-13, 3);
      }

      &:active {
        background-color: darken($green-13, 6);
      }
    }
  }
}
</style>
