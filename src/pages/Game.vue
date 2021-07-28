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
          <q-input dense v-model="address" autofocus @keyup.enter="closePopupQuestion" />
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn color="primary" style="padding: 0 20px 0 20px" label="OK" @click="closePopupQuestion" />
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="closeAlert" />
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

import Game from "components/Game"

export default {
  name: "Main",
  components: { Game }, 
  data: () => ({
    popupQuestion: false,
    alert: false,
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
    pickQuestion(args) {
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
      "getCategories",
      "getCurrentQuestion"
    ])
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
