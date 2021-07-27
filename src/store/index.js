import Vue from 'vue'
import Vuex from 'vuex'

import { storeGame } from './modules'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      storeGame
    },
    strict: process.env.DEBUGGING
  })

  return Store
}
