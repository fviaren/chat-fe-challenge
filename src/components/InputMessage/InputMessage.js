import React, { Component } from 'react';
import './InputMessage.css';
import { postMessage } from '../../Functions/API';
import { scrollToBottom } from '../../Functions/Utils';

class InputMessage extends Component {
    state = {
        currentMessageText: ''
    }

    onChangeInput = (event) => { 
        this.setState({currentMessageText: event.target.value});
    };

    sendMessageHandler = (event) => {
        console.log(this.state.currentMessageText)
        postMessage(event.target.value, 'Me')
        this.setState({currentMessageText: ''});
        scrollToBottom();
    }
    
    render() {
        return (
            <div className="InputContainer">
                <div className="InputBlock">
                    <input 
                        className="MessageField" 
                        type="text"
                        placeholder="Message"
                        onChange={(event) => this.onChangeInput(event)}
                        value={this.state.currentMessageText}
                    />
                    <button 
                        className="SendButton" 
                        onClick={(event) => this.sendMessageHandler(event)}  
                        >Send</button>
                </div>
            </div>
        )
    }
}

export default InputMessage;