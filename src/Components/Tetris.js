import React, { Component } from "react";
import Cell from "./Cell.js";

class Tetris extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="tetris">
        <div className="tetris--title">Tetris</div>
        {this.props.tetris.map(row => (
          <div className="tetris--row">
            {row.map(cell => <Cell cell={cell} />)}
          </div>
        ))}
      </div>
    );
  }
}

export default Tetris;
