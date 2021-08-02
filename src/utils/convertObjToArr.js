export const convertObjToArr = obj => {
  const emptyArr = []

  for (let key in obj) {
    if (obj[key].clues.length === 5) {
      emptyArr.push({
        id: key,
        title: obj[key].title,
        clues: [...obj[key].clues]
      })
    }
  }

  return emptyArr
}