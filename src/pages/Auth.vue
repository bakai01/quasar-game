<template>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your Name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="name"
          autofocus
          :rules="[val => !!val || 'Field is required']"
          @keyup.enter="playGame"
          ref="playerRefName"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="GO" @click="playGame" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    prompt: true,

    name: ""
  }),
  methods: {
    ...mapActions("storeUsers", ["fetchAuth"]),
    ...mapGetters("storeGame", ["getQuestions"]),
    ...mapActions("storeGame", ["fetchClues"]),
    playGame() {
      if (this.$refs.playerRefName.validate()) {
        this.fetchAuth(this.name);
        this.$router.push("/game").catch(err => {});
      }
    }
  },
  mounted() {
    if (!this.getQuestions.length) this.fetchClues();
  }
};
</script>
