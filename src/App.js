import React, { Component } from 'react';
import './App.css';
import CardDeck from "./components/CardDeck/CardDeck";

class App extends Component {


  render() {
    return (
        <div className="App">
            <CardDeck/>
        </div>
    );
  }
}

export default App;
