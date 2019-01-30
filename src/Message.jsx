import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.type === "incomingMessage") {
      return (
          <div className="message" >
            <span className="message-username" style={{color: this.props.color}}>{this.props.text.name}</span>
            <span className="message-content">{this.props.text.content}</span>
          </div>

        )
    } else if (this.props.type === "incomingNotification") {
        return(
          <div className="message system">
            {this.props.text.content}
          </div>
        )
    } else {
       // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + this.props.type);
      }
  }

}

export default Message;