import React, { Component } from 'react';
import moment from 'moment';

import classes from './Messages.module.css';
import Message from '../../components/Message/Message';
import { scrollToBottom } from '../../Functions/Utils';
import { getMessages } from '../../Functions/API';

class Messages extends Component {
    state = {
        messages: []
    };

    intervalID;

    componentDidMount() {
        let messages = getMessages('all');
        this.setState({messages: messages});
        console.log(this.state)
        scrollToBottom()
        this.setRefreshTimeout()
    };

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    };

    getLastMessages = () => {
        const lastMessages = getMessages()
        this.setState({messages: lastMessages});
        this.setRefreshTimeout()
    };

    setRefreshTimeout = () => {
        this.intervalID = setTimeout(this.getLastMessages.bind(this), 3000);
    }

    render() {
        let messages;
        if(this.state.messages) {
            messages = (    
                this.state.messages.map((message) => {
                    return <Message
                    username={message.username}
                    messageText={message.message}
                    timestamp={moment(message.timestamp).format('D MMM yyyy H:mm')}
                    key={message.id} 
                    />
                })
            )
        }
        
        return (
            <div className={classes.Chat} id="chat">
                {messages}
            </div>
            
        );
    }
}

export default Messages;