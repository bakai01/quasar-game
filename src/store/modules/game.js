import { GameAPI } from 'src/api'

const state = () => ({
  categories: [],
  questions: [],
  toggleDisableBtn: false
})

const mutations = {
  setCategories: (state, payload) => state.categories = payload.map(category => category.id),
  setToggleDisableBtn: (state, payload) => state.toggleDisableBtn = payload,
  setQuestions: (state, payload) => {
    const question = { ...payload }
    question.clues = question.clues.slice(0, 5)
    state.questions.push(question)
  }

}

const actions = {
  fetchCategories: context => {
    context.commit('setToggleDisableBtn', true)
    GameAPI.getCategories()
      .then(data => context.commit('setCategories', data))
      .finally(() => context.commit('setToggleDisableBtn', false))
  },
  fetchQuestions: async ({ commit, state }) => {
    state.categories.forEach(category => {
      GameAPI.getQuestions(category.id)
        .then(data => {
          commit('setQuestions', data)
        })
    })
  }
}

const getters = {
  getCategories: state => state.categories,
  getToggleDisableBtn: state => state.toggleDisableBtn

}

export const storeGame = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}