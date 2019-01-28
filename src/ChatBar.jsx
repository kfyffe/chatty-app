import React, {Component} from 'react';

class ChatBar extends Component {


  handleNewMessage = (event) => {
     const value = event.target.value;
     const currentMessage = {username: this.props.user.name, content: value, id: this.props.user.id}
     this.props.createNewMessage(currentMessage);
     event.target.value = '';

  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleNewMessage(event);
    }
  }

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" type="text" name="messageInput" onKeyDown={this.handleKeyPress} />
      </footer>

      )
  }
}

export default ChatBar;