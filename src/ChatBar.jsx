import React, {Component} from 'react';

class ChatBar extends Component {


  handleNewMessage = (event) => {
     const value = event.target.value;
     const currentMessage = {name: this.props.user.name, content: value, id: this.props.user.id}
     console.log('currentMessage: ', currentMessage)
     this.props.createNewMessage(currentMessage);
     event.target.value = '';

  }

  handleMsgKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleNewMessage(event);
    }
  }

  handleNewUser = (event) => {
    const name = event.target.value;
    this.props.createNewUser(name);
  }

  handleUserKeyPress = (event) => {
    if (event.key === 'Enter') {
    this.handleNewUser(event);
    }
  }

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyDown={this.handleUserKeyPress} onBlur={this.handleNewUser} defaultValue={this.props.user.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" type="text" name="messageInput" onKeyDown={this.handleMsgKeyPress} />
      </footer>

      )
  }
}

export default ChatBar;