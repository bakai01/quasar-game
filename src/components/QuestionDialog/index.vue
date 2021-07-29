<template>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h4 text-center">
          cost: {{ getCurrentQuestion.value }} points
        </div>
        <div class="text-h4 text-center">{{ countTimer }}</div>

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
import { mapGetters } from "vuex"

export default {
  name: "QuestionDialog",
  data: () => ({
    answer: ""
  }),
  props: {
    countTimer: { type: Number, required: true }
  },
  computed: {
    ...mapGetters("storeGame", ["getCurrentQuestion"])
  },
  methods: {
    close() {
      if (this.$refs.answerRefName.validate()) this.$emit("close", this.answer)
    }
  },
  destroyed() {
    this.answer = ""
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
