import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jservice.io/api/'
})

export const GameAPI = {
  getCategories: () => {
    return instance.get(`categories?count=5&offset=8`)
      .then(resp => resp.data)
      .catch(err => alert(err))
  }
}