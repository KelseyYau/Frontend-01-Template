const net = require("net")

class Request {

}

class Response {

}

const client = net.createConnection({ 
  host: 'localhost',
  port: 8901 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('GET / HTTP/1.1\r\n');
  client.write('Host: localhost/ HTTP/1.1\r\n');
  client.write('Content-Type: application/x-www-form-urlencoded\r\n');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});