import React, { Component } from 'react';
import { scrollToBottom } from '../../Functions/Utils';
import { getMessages, postMessage } from '../../Functions/API';

import Messages from '../../components/Messages/Messages';
import InputMessage from '../../components/InputMessage/InputMessage';
import Background from '../../assets/body-bg.png';
import './Chat.css';

class Chat extends Component {
    state = {
        messages: [],
        currentMessageText: ''
    };

    intervalID;

    componentDidMount() {
        this.getMyMessages('all', 'True')
    };

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    };

    shouldComponentUpdate( nextProps, nextState ) {
        return nextState.messages !== this.state.messages || nextState.currentMessageText !== this.state.currentMessageText;
    }

    getMyMessages = (RequestType, scroll) => {
        getMessages(RequestType).then(messages => {
            this.setState({ messages });
            this.setRefreshTimeout();
            if (scroll === "True") {
                scrollToBottom();
            }
        });
    };

    setRefreshTimeout = () => {
        this.intervalID = setTimeout(this.getMyMessages.bind(this), 3000);
    }

    onChangeInput = (event) => { 
        this.setState({currentMessageText: event.target.value});
    };

    sendMessageHandler = (user) => {
        postMessage(this.state.currentMessageText, user).then(() => {
            this.setState({currentMessageText: ''});
            this.getMyMessages('all', 'True');
            scrollToBottom();
        })
        
    }
    
    render() {
        let messages;
        if (this.state.messages) {
            messages = <Messages messages={this.state.messages}/>
        }
        return (
        <div className="Chat" style={{backgroundImage: `url(${Background})`}} >
            {messages}            
            <InputMessage 
                clicked={() => this.sendMessageHandler('Me')}
                changed={(event) => this.onChangeInput(event)}
                value={this.state.currentMessageText}
            />
        </div>
        );
    };
    };

export default Chat;
