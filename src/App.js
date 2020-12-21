
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { animateScroll } from 'react-scroll';

import './App.css';
import Message from './Message/Message';
import InputMessage from './InputMessage/InputMessage';
import Background from './assets/body-bg.png';

class App extends Component {
  state = {
    messages: [],
    newMessage: ""
  };

  intervalID;

  componentDidMount() {
    this.getPosts('all');
  };

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  };

  onChangeInput = (event) => { 
    this.setState({
      newMessage: event.target.value
    });
  };

  getPosts = (requestType) => {
    const token='MhIK2k2oKcfE'
    let url=`/?token=${token}`
    if(requestType !== 'all') {
      const timestampSince = moment().unix();
      url = `/?since=${timestampSince}&limit=10&token=${token}`;
    };
    axios.get(url)
      .then( response => {
        const messages = response.data.map( message => {
          return {
            username: message.author,
            message:  message.message,
            timestamp: message.timestamp,
            id: message._id
          }
        });   
        this.setState({messages: messages});
        if(requestType === 'all') {this.scrollToBottom()};
      })
      .catch(error => {console.log(error)})
      .finally( () => {
        this.intervalID = setTimeout(this.getPosts.bind(this), 3000);
        }
      )
  }

  sendMessageHandler = () => {
    axios({
      url: '/',
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
        this.scrollToBottom();
      })
      .catch(error => {console.log(error)});  
  };
  
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'chat'
    });
  };

  render() {
    let messages = (
      <div className="Chat" id="chat">
        {this.state.messages.map((message, index) => {
          return <Message
            username={message.username}
            messageText={message.message}
            timestamp={moment(message.timestamp).format('D MMM yyyy H:mm')}
            key={message.id} 
          />
        })}
      </div>
    )   

    return (
      <div className="App" style={{backgroundImage: `url(${Background})`}} >
        {messages}
        <InputMessage
          change={(event) => this.onChangeInput(event)} 
          send={() => this.sendMessageHandler()}
          value={this.state.newMessage}
        />
      </div>
    );
  };
};

export default App;
