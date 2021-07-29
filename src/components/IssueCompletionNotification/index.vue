<template>
  <q-dialog :value="value">
    <q-card>

      <q-card-section class="q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="closeAlert" />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "IssueCompletionNotification",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    message: {
      type: String
    }
  },
  methods: {
    closeAlert() {
      this.$emit('close')
    }
  }
}
</script>
