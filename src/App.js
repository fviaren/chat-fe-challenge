
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { animateScroll } from 'react-scroll';

import './App.css';
import Message from './Message/Message';
import InputMessage from './InputMessage/InputMessage';
import Background from './assets/body-bg.png';


class App extends Component {
  
  intervalID;
  messagesEndRef = React.createRef();

  state = {
    messages: [],
    newMessage: ""
  };

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
    let url='/?token=MhIK2k2oKcfE'
    if(requestType !== 'all') {
      const timestampSince = moment().subtract(30, 'days').unix();
      url = `/?since=${timestampSince}&limit=10&token=MhIK2k2oKcfE`;
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
        this.intervalID = setTimeout(this.getPosts.bind(this), 3000);
        if(requestType === 'all') {this.scrollToBottom()};
      })
      .catch(error => {console.log(error)});
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
    const chatStyle = {
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${Background})`,
      height: '100vh'
    };

    let messages = (
      <div className="Chat" id="chat">
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
      <div className="App" style={chatStyle} >
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
