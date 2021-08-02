<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h4 text-center">
        cost: {{ getCurrentQuestion.value }} points
      </div>
      <div :class="{ red: timeWillRunOutSoon }" class="text-h4 text-center">
        Осталось: {{ `${countTimer} ${wordSecond}` }}
      </div>

      <p class="popup__content">{{ getCurrentQuestion.question }}</p>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        dense
        v-model="answer"
        autofocus
        @keyup.enter="close"
        :rules="[val => !!val || 'Field is required']"
        ref="answerRefName"
      />
    </q-card-section>

    <q-card-actions align="center" class="text-primary">
      <q-btn
        color="primary"
        style="padding: 0 20px 0 20px"
        label="OK"
        @click="close"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { whichWord } from "../../utils/whichWord"

export default {
  name: "QuestionDialog",
  data: () => ({
    answer: "",
    countTimer: 15,
    timer: null,
    wordSecond: "секунд",
    timeWillRunOutSoon: false
  }),
  computed: {
    ...mapGetters("storeGame", ["getCurrentQuestion"])
    // TODO wordSecond = computed
  },
  methods: {
    ...mapMutations("storeGame", ["setTimeOver"]),
    close() {
      if (this.$refs.answerRefName.validate()) {
        clearInterval(this.timer);
        this.$emit("close", this.answer);
      }
    },
    setTimer() {
      this.timer = setInterval(() => {
        --this.countTimer;
        this.wordSecond = whichWord(this.countTimer)

        if (this.countTimer === 0) this.timeIsOver();
        if (this.countTimer <= 10) this.setTimeWillRunOutSoon();
      }, 1000);
    },
    timeIsOver() {
      clearInterval(this.timer);
      this.$emit("over", this.answer);
      this.setTimeOver();
    },
    setTimeWillRunOutSoon() {
      this.timeWillRunOutSoon = true;
    }
  },
  beforeDestroy() {
    this.answer = "";
    this.timeWillRunOutSoon = false;
  },
  mounted() {
    this.setTimer();
  }
};
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
  margin: 0 auto;
}

.red {
  color: red;
}
</style>
