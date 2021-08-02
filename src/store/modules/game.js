import { GameAPI } from 'src/api'
import { findCategory } from '../../utils/findCategory'
import { modifyLine } from '../../utils/modifyLine'
import { shapeIntoOneObj } from '../../utils/shapeIntoOneObj'
import { convertObjToArr } from '../../utils/convertObjToArr'
import { chooseCompleteQuestions } from '../../utils/chooseCompleteQuestions'
import { getFiveRandomItems } from '../../utils/getFiveRandomItems'

const state = () => ({
  questions: [],
  currentQuestion: {},
  toggleDisableBtn: false,
  answerIsCorrect: null,
  playerName: "",
  totalAnswers: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
  points: 0,
})

const mutations = {
  setToggleDisableBtn: (state, payload) => state.toggleDisableBtn = payload,
  setQuestions: (state, payload) => {
    if (!payload) state.questions = []

    else {
      const cluObj = shapeIntoOneObj(payload)

      const cluArr = convertObjToArr(cluObj)

      const newArr = chooseCompleteQuestions(cluArr)
      state.questions = [...getFiveRandomItems(newArr)]
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

    if (modifyLine(rightAnswer) === modifyLine(payload.answer)) state.answerIsCorrect = true
    else state.answerIsCorrect = false
  },
  setTimeOver: state => state.answerIsCorrect = 'over',
  setPlayerName: (state, payload) => {
    state.playerName = payload
  },
  plusPoints: (state, payload) => state.points += payload,
  minusPoints: (state, payload) => state.points -= payload,
  setTotalAnswers: state => state.totalAnswers++,
  setRightAnswers: state => state.rightAnswers++,
  setWrongAnswers: state => state.wrongAnswers++,

}

const actions = {
  fetchClues: ({ commit }) => {
    commit('setToggleDisableBtn', true)
    GameAPI.getClues().then(data => commit('setQuestions',data)).finally(() => commit('setToggleDisableBtn', false))
  }
}

const getters = {
  getToggleDisableBtn: state => state.toggleDisableBtn,
  getQuestions: state => state.questions,
  getCurrentQuestion: state => state.currentQuestion,
  getAnswerIsCorrect: state => state.answerIsCorrect,
  getPoints: state => state.points,
  getPlayerName: state => state.playerName,
  getTotalAnswers: state => state.totalAnswers,
  getRightAnswers: state => state.rightAnswers,
  getWrongAnswers: state => state.wrongAnswers,

}

export const storeGame = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
