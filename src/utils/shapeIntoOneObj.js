export const shapeIntoOneObj = arr => {
  const emptyObj = {}

  arr.forEach(el => {
    if (!emptyObj[el.category_id]) {
      emptyObj[el.category_id] = {
        title: el.category.title,
        clues: [{
          id: el.id,
          question: el.question,
          answer: el.answer,
          value: el.value,
        }],
        total: el.value
      }
    } else {
      emptyObj[el.category_id].clues.push({
        id: el.id,
        question: el.question,
        answer: el.answer,
        value: el.value,
      })
      emptyObj[el.category_id].total += el.value
    }
  })

  return emptyObj
}