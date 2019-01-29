import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


  render() {
    const messages = this.props.messages;
    console.log('MessageList: Messages: ', messages)
    const messageComponents = messages.map((message) => {
      return <Message id={message.id} text={message} type={} />
    })

    return (
      <main className="messages">
        {messageComponents}
      </main>
    )
  }
}

export default MessageList;