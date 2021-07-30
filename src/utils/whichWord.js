export const whichWord = num => {
  let word
  if (num <= 14 && num >= 11) word = "секунд"
  else if (num % 10 === 1) word = "секунда"
  else if (num % 10 === 4 || num % 10 === 3 || num % 10 === 2) word = "секунды"
  else word = "секунд"
  return word
}