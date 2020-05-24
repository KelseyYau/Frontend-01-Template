/**
 * 使用mealy状态机
 * @param {String} str 
 */
function match(str) {
  let state = start
  for (let char of str) {
    console.log(char)
    state = state(char)
  }
  return state === end
}

function start(char) {
  if (char === "a") {
    return foundB
  } else {
    return start
  }
}

function end(char) {
  return end
}

function foundB(char) {
  if (char === 'b') {
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
    return foundA3
  } else {
    return start(char)
  }
}

function foundA3(char) {
  if (char === 'a') {
    return foundB3
  } else {
    return start(char)
  }
}

function foundB3(char) {
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
    return foundA3(char)  // ab后面有可能是c
  }
}

console.log(match('来找我呀，abababababababxabababababa'))