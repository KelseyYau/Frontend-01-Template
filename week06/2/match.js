function match(str) {
  let foundA = false
  for(let char of str) {
    if (char === 'a') {
      foundA = true
    } else if (foundA && char === 'b') {
      return true
    } else {
      foundA = false
    }
  }
  return false
}

console.log(match('我爱喝ab钙奶的！！！'))