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
          :class="{
            rightAnswer: getIdCorrectAnswers.includes(question.id),
            wrongAnswer: getIdWrongAnswers.includes(question.id)
          }"
        >
          {{ question.value }}
        </button>
      </div>
    </div>
    <p class="game-point">Total points: {{ getPoints }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Game",
  computed: {
    ...mapGetters("storeGame", [
      "getQuestions",
      "getPoints",
      "getIdCorrectAnswers",
      "getIdWrongAnswers"
    ])
  },
  methods: {
    ...mapActions("storeGame", ["fetchClues"]),
    emitQuestion(categoryId, questionId, value) {
      this.$emit("choiceQuestion", { categoryId, questionId, value });
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
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
      border: 1px solid darken($grey-12, 11);
      font-size: 1rem;
      cursor: pointer;
      margin: 1px;
      width: 70px;
      height: 70px;
      background-color: darken($grey-12, 11);
      transition: all 0.2s linear;

      &:hover {
        background-color: darken($grey-12, 17);
      }

      &:active {
        background-color: darken($grey-12, 21);
      }
    }
  }

  &-point {
    text-align: end;
    padding-top: 25px;
  }
}

.rightAnswer {
  background-color: $green-13;

  &:hover {
    background-color: $green-13;
  }
}

.wrongAnswer {
  background-color: $pink-5;

  &:hover {
    background-color: $pink-5;
  }
}
</style>
