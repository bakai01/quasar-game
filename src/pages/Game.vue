<template>
  <q-page class="flex flex-center column">

    <div class="game">
      <div v-for="category in getQuestions" :key="category.id" class="game-row">
        <span>{{ category.title }}</span>

        <div class="game-row__right">
          <button
            v-for="question in category.clues"
            :key="question.id"
            class="game-row__btn"
            @click="pickQuestion(category.id, question.id)"
            :disabled="!question.value"
          >
            {{ question.value }}
          </button>
        </div>
      </div>
    </div>

    <q-dialog v-model="popupQuestion" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h4 text-center">cost: {{ getCurrentQuestion.value }} points</div>
          <div class="text-h4 text-center">{{ countTimer }}</div>

          <p class="popup__content">{{ getCurrentQuestion.question }}</p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus @keyup.enter="closePopupQuestion" />
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn color="primary" style="padding: 0 20px 0 20px" label="OK" @click="closePopupQuestion" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-btn
      color="black"
      label="Начать игру"
      @click="gameStart"
      :disabled="getToggleDisableBtn"
    />

  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"

export default {
  name: "PageIndex",
  data: () => ({
    popupQuestion: false,
    address: "",
    countTimer: 60,
    timer: null
  }),
  methods: {
    ...mapActions("storeGame", ["fetchCategories", "fetchQuestions"]),
    ...mapMutations("storeGame", ["setCurrentQuestion", "removeQuestion"]),
    setTimer () {
      this.timer = setInterval(() => {
        --this.countTimer
        
        if (this.countTimer === 0) this.closePopupQuestion()
      }, 1000)
    },
    gameStart() {
      if (!this.getCategories.length) {
        this.fetchQuestions()
      }
    },
    pickQuestion(categoryId, questionId) {
      const args = { categoryId, questionId }

      this.setCurrentQuestion(args)
      this.openPopupQuestion()
      this.setTimer()
      this.removeQuestion(args)
    },
    closePopupQuestion() {
      clearInterval(this.timer)
      this.address = ""
      this.countTimer = 60
      this.popupQuestion = false
    },
    openPopupQuestion() {
      this.popupQuestion = true
    }
  },
  computed: {
    ...mapGetters("storeGame", [
      "getToggleDisableBtn",
      "getCategories",
      "getQuestions",
      "getCurrentQuestion"
    ])
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

.text-h4 {
  padding-bottom: 35px;
  font-weight: 600;
  font-size: 40px;
}

.popup__content {
  text-align: center;
  width: 50%;
  font-size: 1.1rem;
  margin: 0 auto
}
</style>
