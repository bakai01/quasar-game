import { GameAPI } from 'src/api'
import { findCategory } from '../../utils/findCategory'
import { modifyLine } from '../../utils/modifyLine'
import { shapeIntoOneObj } from '../../utils/shapeIntoOneObj'
import { convertObjToArr } from '../../utils/convertObjToArr'
import { getFiveRandomItems } from '../../utils/getFiveRandomItems'

const state = () => ({
  questions: [],
  currentQuestion: {},
  toggleDisableBtn: false,
  answerIsCorrect: null,
  idCorrectAnswers: [],
  idWrongAnswers: []
})

const mutations = {
  setToggleDisableBtn: (state, payload) => state.toggleDisableBtn = payload,
  setQuestions: (state, payload) => {
    if (!payload) {
      state.questions = []
      state.currentQuestion = {}
      state.answerIsCorrect = null
      state.idCorrectAnswers = []
      state.idWrongAnswers = []
    } else {
      const cluObj = shapeIntoOneObj(payload)
      const cluArr = convertObjToArr(cluObj)
      state.questions = [...getFiveRandomItems(cluArr)]
    }
  },
  setCurrentQuestion: (state, payload) => {
    const category = findCategory(state.questions, payload.categoryId)
    state.currentQuestion = { ...category.clues.find(question => question.id === payload.questionId) }
  },
  removeQuestion: (state, payload) => {
    state.questions.find(category => {
      if (category.id === payload.categoryId) {
        category.clues.find(question => {
          if (question.id === payload.questionId) question.value = null
        })
      }
    })
  },
  isCorrectAnswer: (state, payload) => {
    const category = findCategory(state.questions, payload.categoryId)
    const rightAnswer = category.clues.find(question => question.id === payload.questionId).answer
    if (modifyLine(rightAnswer) === modifyLine(payload.answer)) {
      state.answerIsCorrect = true
      state.idCorrectAnswers.push(payload.questionId)
    } else {
      state.answerIsCorrect = false
      state.idWrongAnswers.push(payload.questionId)
    }
  },
  setTimeOver: state => state.answerIsCorrect = 'over'

}

const actions = {
  fetchClues: async ({ commit }) => {
    commit('setToggleDisableBtn', true)
    const result = await GameAPI.getClues();
    commit('setQuestions', result)
    commit('setToggleDisableBtn', false)
  }
}

const getters = {
  getToggleDisableBtn: state => state.toggleDisableBtn,
  getQuestions: state => state.questions,
  getCurrentQuestion: state => state.currentQuestion,
  getAnswerIsCorrect: state => state.answerIsCorrect,
  getIdCorrectAnswers: state => state.idCorrectAnswers,
  getIdWrongAnswers: state => state.idWrongAnswers,
}

export const storeGame = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
