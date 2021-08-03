<template>
  <div class="stats">
    <p><strong>Your name:</strong> {{ getPlayerName }}</p>
    <p><strong>Total points:</strong> {{ getPoints }}</p>
    <p><strong>Total answered questions:</strong> {{ getTotalAnswers }}</p>
    <p><strong>Right answers:</strong> {{ getRightAnswers }}</p>
    <p><strong>Wrong answers:</strong> {{ getWrongAnswers }}</p>

    <q-btn color="black" label="Quit" @click="quitAcc" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Stats",
  computed: {
    ...mapGetters("storeUsers", [
      "getPlayerName",
      "getPoints",
      "getTotalAnswers",
      "getRightAnswers",
      "getWrongAnswers"
    ])
  },
  methods: {
    ...mapActions("storeUsers", ["requestQuit"]),
    quitAcc() {
      this.requestQuit()
      this.$router.push("/auth").catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.stats {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
}
</style>
