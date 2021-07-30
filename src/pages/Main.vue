<template>
  <q-page class="flex flex-center column">

    <Game @choiceQuestion="pickQuestion" />

    <q-dialog v-model="popupQuestion" persistent>
      <QuestionDialog @close="closePopupQuestion" @over="closePopupQuestion" />
    </q-dialog>

    <IssueCompletionNotification
      :message="getMessage"
      @close="closeAlert"
      :alert="alert"
    />

    <FetchGame
      v-show="!this.getQuestions.length"
      :isDisabled="getToggleDisableBtn"
      @eventFetchClick="gameStart"
    />

    <StopGame
      v-show="this.getQuestions.length"
      @eventStopClick="gameStop"
    />

  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"

import Game from "components/Game"
import QuestionDialog from "components/QuestionDialog"
import IssueCompletionNotification from "components/IssueCompletionNotification"
import FetchGame from "components/btns/FetchGame"
import StopGame from "components/btns/StopGame"

export default {
  name: "Main",
  components: { Game, IssueCompletionNotification, FetchGame, StopGame, QuestionDialog }, 
  data: () => ({
    popupQuestion: false,
    alert: false,
    categoryId: null,
    questionId: null,
    value: 0
  }),
  methods: {
    ...mapActions("storeGame", ["fetchCategories", "fetchQuestions"]),
    ...mapMutations("storeGame", [
      "setCurrentQuestion", 
      "removeQuestion", 
      "isCorrectAnswer", 
      "setQuestions", 
      "plusPoints", 
      "minusPoints",
      "setTotalAnswers",
      "setRightAnswers",
      "setWrongAnswers",
      "setTimeOver"
    ]),
    gameStart() {
      if (!this.getQuestions.length) this.fetchQuestions()
    },
    gameStop() {
      this.setQuestions(false)
    },
    pickQuestion(args) {
      this.categoryId = args.categoryId
      this.questionId = args.questionId
      this.value      = args.value

      this.setCurrentQuestion(args)
      this.openPopupQuestion()
      this.removeQuestion(args)
    },
    incrementToStats() {
      if (this.getAnswerIsCorrect) {
        this.plusPoints(this.value)
        this.setTotalAnswers()
        this.setRightAnswers()
      }
      else {
        this.minusPoints(this.value)
        this.setTotalAnswers()
        this.setWrongAnswers()
      }
    },
    closePopupQuestion(answer) {

      this.isCorrectAnswer({
        categoryId: this.categoryId,
        questionId: this.questionId,
        answer
      })

      this.incrementToStats()

      this.openAlert()
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

      if (this.getAnswerIsCorrect === 'over') message = `Time is over!`
      else if (this.getAnswerIsCorrect) message = `Your answer is correct! You earned: ${this.getCurrentQuestion.value} points`
      else message = `Your answer is wrong! You've a minus: ${this.getCurrentQuestion.value} points`

      return message
    }
  }  
}
</script>
