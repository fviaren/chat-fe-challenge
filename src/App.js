
import React, { Component } from 'react';
import './App.css';
import Message from './Message/Message'
import InputMessage from './InputMessage/InputMessage'
import Background from './assets/body-bg.png'

class App extends Component {
  state = {
    messages: [
      {id: "skdj", username: "Jean", messageText: "Hey what's up", timestamp: "Today..." },
      {id: "sdjask", username: "John", messageText: "All good", timestamp: "Later..." },
      {id: "qjhbas", username: "Jane", messageText: "Just chilling here", timestamp: "Last..." },
      {id: "dkjhs", username: "", messageText: "okok", timestamp: "Just now..." }
    ],
    newMessage: ""
  }

  onChangeInput = (event) => { 
    this.setState({
        newMessage: event.target.value
      })
  }

  sendMessageHandler = () => {
    console.log(this.state.newMessage)
  }
  
  render() {
    const chatStyle = {
      backgroundImage: 'url(' + Background + ')',
      fontColor: 'blue'

    }

    let messages = (
      <div>
        {this.state.messages.map((message, index) => {
          return <Message
          username={message.username}
          messageText={message.messageText}
          timestamp={message.timestamp}
          key={message.id} />
        })}
      </div>
    )
    
    return (
      <div className="App" style={chatStyle}>
        {messages}
        <InputMessage change={(event) => this.onChangeInput(event)} send={() => this.sendMessageHandler()}/>
      </div>
    );
  }
}

export default App;
