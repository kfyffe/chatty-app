import React, {Component} from 'react';

class ChatBar extends Component {

  handleNewMessage = () => {
    // let newMessage = event.target.value
    // this.setState ({
    //   message: newMessage
    // })
  }

  handleKeyPress = (event) => {
    console.log('Event: ', event.key)
    if (event.key === 'Enter') {
      this.handleNewMessage();
    }
  }

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.handleKeyPress} />
      </footer>

      )
  }
}

export default ChatBar;