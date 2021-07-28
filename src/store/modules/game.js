import { GameAPI } from 'src/api'
import { findCategory } from '../../utils/findCategory'
import { sortByValue } from '../../utils/sortByValue'

const state = () => ({
  categories: [],
  questions: [],
  currentQuestion : {},
  toggleDisableBtn: false
})

const mutations = {
  setCategories: (state, payload) => state.categories = payload.map(category => category.id),
  setToggleDisableBtn: (state, payload) => state.toggleDisableBtn = payload,
  setQuestions: (state, payload) => {
    const question = { ...payload }
    question.clues = sortByValue(question.clues)
    state.questions.push(question)
  },
  setCurrentQuestion: (state, payload) => {
    const category = findCategory(state.questions, payload.categoryId)
    
    state.currentQuestion = { ...category.clues.find(question => question.id === payload.questionId) }
  }

}

const actions = {
  fetchCategories: async () => {
    const result = await GameAPI.getCategories().then(data => data)
    return result
  },
  fetchQuestions: async ({ commit, dispatch, state }) => {
    commit('setToggleDisableBtn', true)
    const categories = await dispatch('fetchCategories')
    commit('setCategories', categories)

    state.categories.forEach(category => {
      GameAPI.getQuestions(category)
        .then(data => {
          commit('setQuestions', data)
        })
        .finally(() => commit('setToggleDisableBtn', false))
    })
  }
}

const getters = {
  getCategories: state => state.categories,
  getToggleDisableBtn: state => state.toggleDisableBtn,
  getQuestions: state => state.questions

}

export const storeGame = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
