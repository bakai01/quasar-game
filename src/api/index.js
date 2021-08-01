import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jservice.io/api/'
})

export const GameAPI = {
  getClues: () => {
    return instance.get(`clues`)
      .then(resp => resp.data)
      .catch(err => alert(err))
  }
}
