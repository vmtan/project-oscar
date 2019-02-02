import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import GameBoard from './components/game-board.component';
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Project Oscar'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <GameBoard />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
