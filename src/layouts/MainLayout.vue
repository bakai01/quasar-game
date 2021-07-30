<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="q-header">
      <q-toolbar>

        <q-toolbar-title class="absolute-center" >
          Quasar Game
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-tabs class="absolute-center">
        <q-tab 
          @click="$router.push('/game').catch(err => {})"
          label="Game"
        />
        <q-tab
          @click="$router.push('/stats').catch(err => {})"
          label="Stats"
        />
      </q-tabs>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'MainLayout',
  methods: {
    ...mapMutations('storeGame', ['setPlayerName'])
  },
  mounted() {
    if (!localStorage.getItem('playerName')) {
      this.$router.push('/auth')
    }
    else {
      this.setPlayerName(localStorage.getItem('playerName'))
      this.$router.push('/game').catch(err => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-header {
    padding: 15px;
  }
</style>
