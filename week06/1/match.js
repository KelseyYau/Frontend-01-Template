function match(str) {
  for (let char of str) {
    if (char === "a") {
      return true
    } else {
      return false
    }
  }
}

match("yes  i was alike")