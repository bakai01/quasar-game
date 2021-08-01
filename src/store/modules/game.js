import { GameAPI } from 'src/api'
import { findCategory } from '../../utils/findCategory'
import { modifyLine } from '../../utils/modifyLine'

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
      state.questions = [...payload]
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
    const cluObj = {}
    const cluArr = []
    const newArr = []

    GameAPI.getClues().then(data => {
      data.forEach(el => {
        if (!cluObj[el.category_id]) {
          cluObj[el.category_id] = { title: el.category.title }
          cluObj[el.category_id].clues = []
          cluObj[el.category_id].clues.push({
            question: el.question,
            answer: el.answer,
            value: el.value,
          })
        }
        else {
          cluObj[el.category_id].clues.push({
            question: el.question,
            answer: el.answer,
            value: el.value,
          })
        }
      })

      for (let key in cluObj) {
        if (cluObj[key].clues.length === 5) {
          cluArr.push({
            id: key,
            title: cluObj[key].title,
            clues: [...cluObj[key].clues]
          })
        }
      }


      outer: for (let i = 0; i < cluArr.length; i++) {
        for (let j = 0; j < cluArr[i].clues.length; j++) {
          if (!cluArr[i].clues[j].value) continue outer
        }
        newArr.push(cluArr[i])
      }

      commit('setQuestions', newArr.sort(() => 0.5 - Math.random()).slice(0, 5))
    })
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
