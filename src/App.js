import React, { Component } from 'react';

import './App.css';
import Messages from './containers/Messages/Messages';
import InputMessage from './components/InputMessage/InputMessage';
import Background from './assets/body-bg.png';

class App extends Component {
  render() {
    return (
      <div className="App" style={{backgroundImage: `url(${Background})`}} >
        <Messages />
        <InputMessage />
      </div>
    );
  };
};

export default App;
