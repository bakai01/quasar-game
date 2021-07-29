<template>
  <q-btn
    color="black"
    label="Stop game"
    @click="clickStop"
  />
</template>

<script>
export default {
  name: "StopGame",
  methods: {
    clickStop() {
      this.$emit("eventStopClick")
    }
  }

}
</script>
