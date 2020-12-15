
import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import Message from './Message/Message'
import InputMessage from './InputMessage/InputMessage'
import Background from './assets/body-bg.png'

const { REACT_APP_TOKEN } = process.env

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

  // componentDidMount() {
  //   axios.get('https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=' + process.env)
  //     .then( response => {
  //       const messages = response.data.map( message => {
  //         return {
  //           ...message,
  //           id: uuidv4()
  //         }
  //       })   
  //       this.setState({messages: messages})
  //     })
  //     .catch(error => {
  //         console.log(error);
  //     }
  //   )
  // } 

  sendMessageHandler = (event) => {
    axios({
      url: 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'},
        'token': process.env,
      data: {
        'message': this.state.newMessage,
        'author' : 'Mora'
      } 
    })
      .then(response => {console.log(response.data);})
      .then(event => {event.target.reset()})
      .catch(error => {console.log(error)});
  };
  
  render() {
    const chatStyle = {
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'url(' + Background + ')',
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
        <InputMessage change={(event) => this.onChangeInput(event)} send={(event) => this.sendMessageHandler(event)}/>
      </div>
    );
  }
}

export default App;
