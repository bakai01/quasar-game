const emptyArr = []

export const chooseCompleteQuestions = arr => {
  outer: for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].clues.length; j++) {
      if (!arr[i].clues[j].value) continue outer
    }
    emptyArr.push(arr[i])
  }

  return emptyArr
}