<template>
  <q-page class="flex flex-center column">

    <Game @choiceQuestion="pickQuestion" />

    <q-dialog v-model="popupQuestion" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h4 text-center">cost: {{ getCurrentQuestion.value }} points</div>
          <div class="text-h4 text-center">{{ countTimer }}</div>

          <p class="popup__content">{{ getCurrentQuestion.question }}</p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="answer" autofocus @keyup.enter="closePopupQuestion" />
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn color="primary" style="padding: 0 20px 0 20px" label="OK" @click="closePopupQuestion" />
        </q-card-actions>
      </q-card>
    </q-dialog>

     <IssueCompletionNotification
      v-model="alert"
      :message="getMessage"
      @close="closeAlert"
    />

    <FetchGame v-if="!this.getQuestions.length" :isDisabled="getToggleDisableBtn" @eventFetchClick="gameStart" />
    <StopGame v-else @eventStopClick="gameStop" />

  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"

import Game from "components/Game"
import IssueCompletionNotification from "components/IssueCompletionNotification"
import FetchGame from "components/btns/FetchGame"
import StopGame from "components/btns/StopGame"

export default {
  name: "Main",
  components: { Game, IssueCompletionNotification, FetchGame, StopGame }, 
  data: () => ({
    popupQuestion: false,
    alert: false,
    answer: "",
    countTimer: 60,
    timer: null,
    categoryId: null,
    questionId: null
  }),
  methods: {
    ...mapActions("storeGame", ["fetchCategories", "fetchQuestions"]),
    ...mapMutations("storeGame", ["setCurrentQuestion", "removeQuestion", "isCorrectAnswer", "setQuestions"]),
    setTimer () {
      this.timer = setInterval(() => {
        --this.countTimer
        
        if (this.countTimer === 0) this.closePopupQuestion()
      }, 1000)
    },
    gameStart() {
      if (!this.getQuestions.length) this.fetchQuestions()
    },
    gameStop() {
      this.setQuestions(false)
    },
    pickQuestion(args) {
      this.categoryId = args.categoryId
      this.questionId = args.questionId

      this.setCurrentQuestion(args)
      this.openPopupQuestion()
      this.setTimer()
      this.removeQuestion(args)
    },
    closePopupQuestion() {
      clearInterval(this.timer)

      this.isCorrectAnswer({
        categoryId: this.categoryId,
        questionId: this.questionId,
        answer: this.answer
      })

      this.openAlert()
      this.answer = ""
      this.countTimer = 60
      this.popupQuestion = false
    },
    openPopupQuestion() {
      this.popupQuestion = true
    },
    closeAlert() {
      this.alert = false
    },
    openAlert() {
      this.alert = true
    }
  },
  computed: {
    ...mapGetters("storeGame", [
      "getToggleDisableBtn",
      "getCurrentQuestion",
      "getAnswerIsCorrect",
      "getQuestions"
    ]),
    getMessage() {
      let message = ""

       message = this.getAnswerIsCorrect
        ? `Your answer is correct! You earned: ${this.getCurrentQuestion.value} points`
        : `Your answer is wrong`

      return message
    }
  }  
}
</script>

<style lang="scss" scoped>
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
