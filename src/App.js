
import React, { Component } from 'react';
import './App.css';
import Message from './Message/Message'
import InputMessage from './InputMessage/InputMessage'

class App extends Component {
  
  sendMessageHandler = () => {
    console.log('Message sent')
  }
  
  render() {
    return (
      <div className="App">
        <Message username="Jean" messageText="Hey what's up" timestamp="Today..."/>
        <Message username="John" messageText="All good" timestamp="Later..."/>
        <Message username="Jane" messageText="Just chilling here" timestamp="Last..."/>
        <InputMessage send={() => this.sendMessageHandler()}/>
      </div>
    );
  }
}
export default App;
