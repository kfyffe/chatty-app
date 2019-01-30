import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


  render() {
    const messages = this.props.messages;
    const messageComponents = messages.map((message) => {
      return <Message id={message.id} text={message} type={message.type} color={message.color}/>
    })

    return (
      <main className="messages">
        {messageComponents}
      </main>
    )
  }
}

export default MessageList;