import React from "react";
import Tetris from "./Components/Tetris.js";
import "./App.css";
import {startingArray} from './TetrisArrays.js';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tetris: startingArray
    };
  }

  render() {
    return (
      <div className="App">
        <Tetris tetris={this.state.tetris} />
      </div>
    );
  }
}