import React from 'react';
import moment from 'moment';

import classes from './Messages.module.css';
import Message from './Message/Message';


const messages = (props) => {
    let messages;
    if(props.messages) {
        messages = (
            props.messages.map((message) => {
                return <Message
                    username={message.username}
                    messageText={message.message}
                    timestamp={moment(message.timestamp).format('D MMM yyyy H:mm')}
                    key={message.id}
                />
            })
        );
    };

    return (
        <div className={classes.Chat} id="chat">
            {messages}
        </div>
    );
}

export default messages;
