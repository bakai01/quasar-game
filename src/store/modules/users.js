
const state = () => ({
  account: {
    playerName: "",
    points: 0,
    rightAnswers: 0,
    totalAnswers: 0,
    wrongAnswers: 0
  }
})

const mutations = {
  authMe: (state, payload) => {
    const data = JSON.parse(localStorage.getItem("users")) || []
    const isUserExist = data.find(user => user.playerName === payload)

    if (isUserExist) {
      state.account = { ...isUserExist }
      localStorage.setItem("currentAccount", JSON.stringify(state.account))
    }
    else {
      state.account = {
        playerName: payload,
        points: 0,
        rightAnswers: 0,
        totalAnswers: 0,
        wrongAnswers: 0
      }
      data.push(state.account)
      localStorage.setItem("users", JSON.stringify(data))
      localStorage.setItem("currentAccount", JSON.stringify(state.account))
    }
  },
  plusPoints: (state, payload) => state.account.points += payload,
  minusPoints: (state, payload) => state.account.points -= payload,
  setTotalAnswers: state => state.account.totalAnswers++,
  setRightAnswers: state => state.account.rightAnswers++,
  setWrongAnswers: state => state.account.wrongAnswers++,
}

const actions = {
  fetchAuth: ({ commit }, payload) => commit("authMe", payload),
  requestQuit: () => {
    const emptyAcc = {
      playerName: "",
      points: 0,
      rightAnswers: 0,
      totalAnswers: 0,
      wrongAnswers: 0
    }

    localStorage.setItem("currentAccount", JSON.stringify(emptyAcc))
  },
  updateCurrentAccount: ({ state }) => {
    const data = JSON.parse(localStorage.getItem("users"))

    data.forEach(user => {
      if (user.playerName === state.account.playerName) {
        user = Object.assign(user, state.account)
      }
    })

    localStorage.setItem("users", JSON.stringify(data))
    localStorage.setItem("currentAccount", JSON.stringify(state.account))
  },
  fetchPlusPoints: ({ commit, dispatch }, payload) => {
    commit("plusPoints", payload)
    dispatch("updateCurrentAccount")
  },
  fetchMinusPoints: ({ commit, dispatch }, payload) => {
    commit("minusPoints", payload)
    dispatch("updateCurrentAccount")
  },
  fetchTotalAnswers: ({ commit, dispatch }) => {
    commit("setTotalAnswers")
    dispatch("updateCurrentAccount")
  },
  fetchRightAnswers: ({ commit, dispatch }) => {
    commit("setRightAnswers")
    dispatch("updateCurrentAccount")
  },
  fetchWrongAnswers: ({ commit, dispatch }) => {
    commit("setWrongAnswers")
    dispatch("updateCurrentAccount")
  }
}

const getters = {
  getPlayerName: state => state.account.playerName,
  getPoints: state => state.account.points,
  getTotalAnswers: state => state.account.totalAnswers,
  getRightAnswers: state => state.account.rightAnswers,
  getWrongAnswers: state => state.account.wrongAnswers,
}

export const storeUsers = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
