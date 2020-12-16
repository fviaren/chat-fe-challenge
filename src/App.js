
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './App.css';
import Message from './Message/Message';
import InputMessage from './InputMessage/InputMessage';
import Background from './assets/body-bg.png';


class App extends Component {
  
  state = {
    messages: [
    ],
    newMessage: ""
  };

  onChangeInput = (event) => { 
    this.setState({
        newMessage: event.target.value
      });
  };

  getPosts = () => {
    axios.get('https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=MhIK2k2oKcfE')
      .then( response => {
        const messages = response.data.map( message => {
          return {
            username: message.author,
            message: message.message,
            timestamp: message.timestamp,
            id: message._id
          }
        });   
        this.setState({messages: messages});
      })
      .catch(error => {
          console.log(error);
      }
    );
  }
  
  refreshScreen = () => {
    this.getPosts()
  }

  componentDidMount() {
    this.getPosts()
  };

  sendMessageHandler = () => {
    axios({
      url: 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'token': 'MhIK2k2oKcfE'},
      data: {
        'message': this.state.newMessage,
        'author' : 'Me'
      } 
    }).then( response => {
        const message = response.data;
        const newMessage = {
            username: message.author,
            messageText: message.message,
            timestamp: message.timestamp,
            id: message._id
        };
        const messages = [...this.state.messages, newMessage];
        this.setState({messages: messages});
        this.setState({newMessage: ''});
      })
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
          messageText={message.message}
          timestamp={moment(message.timestamp).format('D MMM yyyy H:mm')}
          key={message.id} />
        })}
      </div>
    )
    
    return (
      <div className="App" style={chatStyle}>
        {messages}
        <InputMessage 
          change={(event) => this.onChangeInput(event)} 
          send={() => this.sendMessageHandler()}
          value={this.state.newMessage}
        />
      </div>
    );
  }
}

export default App;
