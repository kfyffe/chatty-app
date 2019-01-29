import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx'



class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []

    };
    this.socket = null;

}
createNewMessage = (currentMessage) => {
    const existingMessages = this.state.messages;
    const newMessages = existingMessages.concat(currentMessage);
    this.socket.send(JSON.stringify(currentMessage))
  }


  componentDidMount() {
  console.log("componentDidMount <App />");

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        messages: messages
      })
    }, 3000);

    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = () => {
      console.log('Connected to server')

    }
    this.socket.onmessage = (data) => {
      const parsedMessage = JSON.parse(data.data);
      console.log('Parsed Message: ', parsedMessage)
      const message = this.state.messages.concat(parsedMessage)
      this.setState({
        messages: message
      })
    }

  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser} createNewMessage={this.createNewMessage}/>
      </div>
     );
  }
}
export default App;
