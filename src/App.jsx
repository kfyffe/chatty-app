import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx'


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      clientCount: 0
    };
    this.socket = null;
  }

  createNewUser = (name) => {
    const existingUser = this.state.currentUser;
    if (name !== existingUser) {
      const userChange = {
      name,
      type: 'postNotification',
      content: `${existingUser.name} changed their name to ${name}`
      }
      this.socket.send(JSON.stringify(userChange))
      this.setState({
        currentUser: {
          name: name
        }
      })
    }

  }

  createNewMessage = (currentMessage) => {
    const existingMessages = this.state.messages;
    const newMessages = existingMessages.concat(currentMessage);
    this.socket.send(JSON.stringify(currentMessage))
  }

  handleClientCount(data) {
      this.setState({
        clientCount: data.count
      })
    }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = () => {
      console.log('Connected to server')
    }
    this.socket.onmessage = (data) => {
      const parsedMessage = JSON.parse(data.data);
      let messageType = parsedMessage.type

      if (messageType === 'clientCount') {
        console.log('If statement message type: ', this)
        this.handleClientCount(parsedMessage.payload)
      } else {
        const message = this.state.messages.concat(parsedMessage)
        this.setState({
          messages: message
        })
        }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="client-count">Current people chatting: {this.state.clientCount}</p>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser} createNewMessage={this.createNewMessage} createNewUser={this.createNewUser}/>
      </div>
     );
  }
}
export default App;
