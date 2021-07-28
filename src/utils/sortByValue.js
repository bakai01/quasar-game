import { getFirstFiveElements } from './getFirstFiveElements'

export const sortByValue = arr => getFirstFiveElements(arr).sort((a, b) => a.value > b.value ? 1 : -1)
