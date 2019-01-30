// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

console.log(WebSocket)

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

  ws.on('message', function incoming (message) {
    let clientMessage = JSON.parse(message);
    clientMessage.id = uuidv4();
    console.log('Server Side clientMessage: ', clientMessage)

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
    console.log(messageWithId);


    wss.broadcast(messageWithId);


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
