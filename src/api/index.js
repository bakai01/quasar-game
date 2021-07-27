import * as axios from 'axios'

import { random } from '../utils/random'

const instance = axios.create({
  baseURL: 'https://jservice.io/api/'
})

export const GameAPI = {
  getCategories: () => {
    return instance.get(`categories?count=5&offset=${random()}`)
      .then(resp => resp.data)
      .catch(err => alert(err))
  },
  getQuestions: (idCategory) => {
    return instance.get(`category?id=${idCategory}`)
      .then(resp => resp.data)
      .catch(err => alert(err))
  }
}
