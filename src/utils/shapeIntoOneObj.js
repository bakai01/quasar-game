const emptyObj = {}

export const shapeIntoOneObj = arr => {
  arr.forEach(el => {
    if (!emptyObj[el.category_id]) {
      emptyObj[el.category_id] = { title: el.category.title }
      emptyObj[el.category_id].clues = []
      emptyObj[el.category_id].clues.push({
        question: el.question,
        answer: el.answer,
        value: el.value,
      })
    }
    else {
      emptyObj[el.category_id].clues.push({
        question: el.question,
        answer: el.answer,
        value: el.value,
      })
    }
  })

  return emptyObj
}