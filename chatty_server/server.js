// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

console.log(WebSocket);

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// Broadcast to all.
wss.broadcast = function broadcast(messageWithId) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageWithId);
          console.log('Data received')
        }
      });
    };

wss.on('connection', (ws) => {
  console.log('Client connected');

//color generator for each instance/person name
  const userColors = ['#0074D9', '#3D9970', '#FFDC00', '#B10DC9', '#39CCCC', '#FF851B', '#01FF70', '#F012BE', '#85144b']
  let randomColor = userColors[Math.floor(Math.random()*userColors.length)];
  ws.color = randomColor;

  wss.clients.forEach(client => {
    let clientCount = {
      type: 'clientCount',
      payload: {
        count: wss.clients.size,
      }
    }

      client.send(JSON.stringify(clientCount))
  })

  ws.on('message', function incoming (message) {
    let clientMessage = JSON.parse(message);
    clientMessage.id = uuidv4(); //random id is generated and added to clientMessage object
    clientMessage.color = ws.color; //text color is randomly selected add added to clientMessage object

    switch(clientMessage.type){
      case "postMessage":
        clientMessage.type = "incomingMessage"
        break;
      case "postNotification":
        clientMessage.type = "incomingNotification"
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + clientMessage.type);
    }

    const messageWithId = JSON.stringify(clientMessage);

    wss.broadcast(messageWithId);

  });

  // callback for when a client closes the socket (closes browser window). Number of people chatting gets reduced.
  ws.on('close', () => {
    console.log('Client disconnected')
    wss.clients.forEach(client => {
      let clientCount = {
        type: 'clientCount',
        payload: {
          count: wss.clients.size
        }
      }

      client.send(JSON.stringify(clientCount))
    })

  });
});
