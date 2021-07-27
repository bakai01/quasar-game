import { GameAPI } from 'src/api'

const state = () => ({
  categories: [],

})

const mutations = {
  setCategories: (state, payload) => state.categories = [ ...payload ]

}

const actions = {
  fetchCategories: context => {
    GameAPI.getCategories()
      .then(data => context.commit('setCategories', data))
  }
}

const getters = {
  getCategories: state => state.categories

}

export const storeGame = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}