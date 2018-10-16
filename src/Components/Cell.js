import React, { Component } from "react";
import "./Tetris.css";

class Cell extends Component {
  render() {
    if (this.props.cell == "0")
      return <div className="tetris--cell tetris--cell--empty" />;
    if (this.props.cell == "1")
      return <div className="tetris--cell tetris--cell--red" />;
    if (this.props.cell == "2")
      return <div className="tetris--cell tetris--cell--blue" />;
    if (this.props.cell == "3")
      return <div className="tetris--cell tetris--cell--green" />;
  }
}

export default Cell;
