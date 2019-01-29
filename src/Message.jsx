import React, {Component} from 'react';

class Message extends Component {
  render() {

    return (
      <div className="message" >
        <span className="message-username">{this.props.text.name}</span>
        <span className="message-content">{this.props.text.content}</span>
      </div>
    )
  }
}



export default Message;