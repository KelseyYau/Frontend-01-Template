/**
 * 使用mealy状态机
 * @param {String} str 
 */
function match(str) {
  let state = start
  for (let char of str) {

    state = state(char)
  }
  return state === end
}

function start(char) {
  if (char === "a") {
    return foundA
  } else {
    return start
  }
}

function end(char) {
  return end
}

function foundA(char) {
  if (char === 'b') {
    return foundB
  } else {
    return start(char)
  }
}

function foundB(char) {
  if (char === 'c') {
    return foundA2
  } else {
    return start(char)
  }
}

function foundA2(char) {
  if (char === 'a') {
    return foundB2
  } else {
    return start(char)
  }
}

function foundB2(char) {
  if (char === 'b') {
    return foundX
  } else {
    return start(char)
  }
}

function foundX(char) {
  if (char === 'x') {
    return end
  } else {
    return foundB(char)  // ab后面有可能是c
  }
}

console.log(match('giao~，abcabcabx'))