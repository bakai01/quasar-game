<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="q-header">
      <q-toolbar>

        <q-toolbar-title class="absolute-center" >
          Quasar App
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
          label="Игра"
        />
        <q-tab
          @click="$router.push('/stats').catch(err => {})"
          label="Статистика"
        />
      </q-tabs>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
}
</script>

<style lang="scss" scoped>
  .q-header {
    padding: 15px;
  }
</style>
