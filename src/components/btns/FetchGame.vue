<template>
  <q-btn
    color="black"
    label="Start game"
    @click="clickStart"
    :disabled="isDisabled"
  />
</template>

<script>
export default {
  name: "FetchGame",
  props: {
    isDisabled: { type: Boolean, default: false }
  },
  methods: {
    clickStart() {
      this.$emit("eventFetchClick")
    }
  }

}
</script>
