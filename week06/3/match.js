function match(str) {
  let foundA = false
  let foundB = false
  let foundC = false
  let foundD = false
  let foundE = false

  for (let char of str) {
    if (char === 'a') {
      foundA = true
    } else if (foundA && char === 'b') {
      foundB = true
    } else if (foundB && char === 'c') {
      foundC = true
    } else if (foundC && char === 'd') {
      foundD = true
    } else if (foundD && char === 'e') {
      foundE = true
    } else if (foundE && char === 'f')  {
      return true
    } else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    }
  }

  return
}

console.log(match('小朋友懵，跟我一起读abcdefg'))