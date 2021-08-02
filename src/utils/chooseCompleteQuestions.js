export const chooseCompleteQuestions = arr => {
  const emptyArr = []

  outer: for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].clues.length; j++) {
      if (!arr[i].clues[j].value) continue outer
    }
    emptyArr.push(arr[i])
  }

  return emptyArr
}
