import Vue from 'vue'
import Vuex from 'vuex'

import { storeGame, storeUsers } from './modules'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      storeGame,
      storeUsers
    },
    strict: process.env.DEBUGGING
  })

  return Store
}
