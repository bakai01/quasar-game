
const state = () => ({
  users: [
    {
      playerName: "ZXC Dead inside 1000 - 7, Как же ты слаб))",
      points: 5000,
      rightAnswers: 10,
      totalAnswers: 10,
      wrongAnswers: 0
    },
    {
      playerName: "Alan",
      totalAnswers: 1,
      rightAnswers: 1,
      wrongAnswers: 0,
      points: 400
    },
    {
      playerName: "Petya",
      totalAnswers: 3,
      rightAnswers: 2,
      wrongAnswers: 1,
      points: 600
    },
    {
      playerName: "Bart",
      totalAnswers: 7,
      rightAnswers: 5,
      wrongAnswers: 2,
      points: 2500
    },
    {
      playerName: "Alesia",
      totalAnswers: 10,
      rightAnswers: 2,
      wrongAnswers: 8,
      points: 50000
    },
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
