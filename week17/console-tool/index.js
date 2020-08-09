/*
  var tty = require("tty")
  var ttys = require("ttys")

  var stdin = ttys.stdin
  var stdout = ttys.stdout

  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  async function ask(question) {
    return new Promise((resolve, reject) =>{
      rl.question(question, (answer) => {
        resolve(answer)
      })
    })
  }

  void  async function() {
    console.log(await ask("your project name?"))
  }() 
*/

var stdin = process.stdin
var tty = require("tty")
var ttys = require("ttys")

// var stdin = ttys.stdin
var stdout = ttys.stdout

stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')

function getChar() {
  return new Promise((resolve) => {
    stdin.once('data', function(key) {
      resolve(key)
    })
  })
}

function up(n = 1) {
  stdout.write('\033['+ n +'A')
}

function down(n = 1) {
  stdout.write('\033['+ n +'B')
}

function right(n = 1) {
  stdout.write('\033['+ n +'C')
}

function left(n = 1) {
  stdout.write('\033['+ n +'D')
}

void async function () {
  stdout.write("select a style processor:\n")
  let answer = await select(["scss", "css", "less"])
  stdout.write("you selected " + answer + "\n")
  process.exit()
}()

async function select(chioces) {
  let selected = 0
  for(let i = 0; i < chioces.length; i++) {
    if (i === selected) {
      stdout.write("[*] " + chioces[i] + "\n")
    } else {
      stdout.write("[ ] " + chioces[i] + "\n")
    }
  }
  up(chioces.length)
  right()
  while(true) {
    let char = await getChar()
    if (char === "\u0003") {
      process.exit()
      break
    }
    if (char === "w" && selected > 0) {
      stdout.write(" ")
      left()
      selected --
      up()
      stdout.write("*")
      left()
    }
    if (char === "s" && selected < chioces.length - 1) {
      stdout.write(" ")
      left()
      selected ++
      down()
      stdout.write("*")
      left()
    }
    if (char === "\r") {
      down(chioces.length - selected)
      left()
      return chioces[selected]
    }
    // console.log(char.split('').map(c => c.charCodeAt(0)))
  }
}