import React, { Component } from "react";
import "./Tetris.css";

class Cell extends Component {
  render() {
    if (this.props.cell[0] == "1")
      return <div className="tetris--cell tetris--cell--red" />;
    if (this.props.cell[0] == "2")
      return <div className="tetris--cell tetris--cell--blue" />;
    if (this.props.cell[0] == "3")
      return <div className="tetris--cell tetris--cell--green" />;
    return <div className="tetris--cell tetris--cell--empty" />;    
  }
}

export default Cell;
