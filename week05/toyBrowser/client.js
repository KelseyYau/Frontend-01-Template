const net = require("net")

class Request {
  // 参照xhr method， url = host + port + path, content-type
  // body： 键值对结构
  // headers

  // 使用构造器
  constructor(options) {
    this.method = options.method || "GET"
    this.host = options.host
    this.port = options.port || 80
    this.body = options.body || {}
    this.path = options.path || "/"
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = "application/x-www-form-urlencoded"
    }

    if (this.headers['Content-Type'] === "application/json") {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join("&")
    }
    this.headers["Content-length"] = this.bodyText.length
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
    ${Object.keys(this.headers).map(key => {return `${key}: ${this.headers[key]}`}).join('\r\n')}\r
    \r
    ${this.bodyText}`
  }

  send(connection) {
    let parser = new ResponseParser()
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }

      connection.on('data', (data) => {
        parser.receive(data.toString())
        if (parser.isFinished) {
          resolve(parser.getResponse())
        }
        connection.end()
      })

      connection.on('error', (err) =>{
        reject(err)
        connection.end()
      })
    })
  }
}

  void async function() {
    let request = new Request({
      method: 'POST',
      host: "localhost",
      port: "8901",
      path: '/',
      headers: {
        ['X-Foo2']: "customed"
      },
      body: {
        name: 'kelsey'
      }
    })

    let response = await request.send()
    console.log(response)
  }

class Response {

}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_lINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5 
    this.WAITING_HEADER_BLOCK_END = 6
    this.WATING_BODY = 7

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ""
    this.headers = {}
    this.headerName = ""
    this.headerValue = ""
    this.bodyParser = null
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished
  }
  
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }

  receiveChar(char) {
    switch(this.current) {
      case this.WAITING_STATUS_LINE:
        if (char === '\r') {
          this.current = this.WAITING_STATUS_lINE_END
        } else if (char === '\n') {
          this.current = this.WAITING_HEADER_NAME
        } else {
          this.statusLine += char
        }
        break

      case this.WAITING_STATUS_lINE_END:
        if (char === '\n') {
          this.current = this.WAITING_HEADER_NAME
        }
        break
      
      case this.WAITING_HEADER_NAME:
        if (char === ":") {
          this.current = this.WAITING_HEADER_SPACE
        } else if (char === "\r") { 
          this.current = this.WAITING_HEADER_BLOCK_END
          if (this.headers['Transfer-Encoding'] === "chunked") {
            this.bodyParser = new TrunkedBodyParser()
          }
        } else {
          this.headerName += char
        }
        break
      
      case this.WAITING_HEADER_SPACE:
        if (char === ' ') {
          this.current = this.WAITING_HEADER_VALUE
        } else {
          this.headerName += char
        }
        break
    
      case this.WAITING_HEADER_VALUE:
        if (char === '\r') {
          this.current = this.WAITING_HEADER_LINE_END
          this.headers[this.headerName] = this.headerValue
          this.headerName = ""
          this.headerValue = ""
        } else {
          this.headerValue += char
        }
        break
      
      case this.WAITING_STATUS_lINE_END:
        if (char === "\n") {
          this.current = this.WAITING_HEADER_NAME
        }
        break

      case this.WAITING_HEADER_BLOCK_END:
        if (char === "\n") {
          this.current = this.WATING_BODY
        }

      case this.WATING_BODY:
        this.bodyParser.receiveChar(char) 

      default:
        this.current = this.WAITING_HEADER_NAME
        break
    }
  }
}


class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0
    this.WAITING_LENGTH_LINE_END = 1
    this.READING_TRUNK = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4
    this.length = 0
    this.content = []
    this.isFinished = false
    this.current = this.WAITING_LENGTH
  }

  receiveChar(char) {
    switch(this.current) {
      case this.WAITING_LENGTH:
        if (char === '\r') {
          if (this.length === 0) {
            this.isFinished = true
          }
          this.current = this.WAITING_LENGTH_LINE_END
        } else {
          this.length *= 10
          this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
        }
        break

      case this.WAITING_LENGTH_LINE_END:
        if (char === "\n") {
          this.current = this.READING_TRUNK
        }
        break
      
      case this.READING_TRUNK:
        this.content.push(char)
        this.length --
        if (this.length === 0) {
          this.current = this.WAITING_NEW_LINE
        }
        break
      
      case this.WAITING_NEW_LINE:
        if (char === '\r') {
          this.current = this.WAITING_NEW_LINE_END
        }
        break
      
      case this.WAITING_NEW_LINE_END:
        if (char === '\n') {
          this.current = this.WAITING_LENGTH
        }
        break

      default:
        this.current = this.WAITING_LENGTH
        break
    }
  }
}
// const client = net.createConnection({ 
//   host: 'localhost',
//   port: 8901 }, () => {
//   // 'connect' listener.
//   // console.log('connected to server!');
//   // client.write('GET / HTTP/1.1\r\n');
//   // client.write('Host: localhost/ HTTP/1.1\r\n');
//   // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
//   // client.write('world!\r\n');
//   let request = new Request({
//     method: 'POST',
//     host: "localhost",
//     port: "8901",
//     path: '/',
//     headers: {
//       ['X-Foo2']: "customed"
//     },
//     body: {
//       name: 'kelsey'
//     }
//   })

//   // console.log(request.toString())
//   client.write(request.toString())
// });

// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });

// client.on('end', () => {
//   console.log('disconnected from server');
// });