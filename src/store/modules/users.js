
const state = () => ({
  users: [
    {
      playerName: "",
      totalAnswers: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
      points: 0
    }
  ]
})

const mutations = {
  setPlayerName: (state, payload) => {
    localStorage.setItem("users", JSON.stringify(state.users))
    state.playerName = payload
  },
  plusPoints: (state, payload) => state.points += payload,
  minusPoints: (state, payload) => state.points -= payload,
  setTotalAnswers: state => state.totalAnswers++,
  setRightAnswers: state => state.rightAnswers++,
  setWrongAnswers: state => state.wrongAnswers++,
}

const actions = {}

const getters = {
  getPlayerName:   state => state.playerName,
  getPoints:       state => state.points,
  getTotalAnswers: state => state.totalAnswers,
  getRightAnswers: state => state.rightAnswers,
  getWrongAnswers: state => state.wrongAnswers,
}

export const storeUsers = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
