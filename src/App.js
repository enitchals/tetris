import React from "react";
import Tetris from "./Components/Tetris.js";
import "./App.css";
import {startingArray} from './TetrisArrays.js';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tetris: startingArray,
      speed: 100,
      go: false,
      timer: null,
      score: 0,
      falling: true,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
}

  go() {
    // this.drop();
    this.setState({go: true});
    this.setState({timer: setInterval(() => this.drop(), this.state.speed)});
  }

  pause() {
    this.setState({go: false});
    clearInterval(this.state.timer);
  }
  
  drop(){
    let positions = this.getPositions();
    const blockType = this.state.tetris[positions[0][0]][positions[0][1]];
    const newPositions = positions.map(position => {
      return [position[0]+1, position[1]];
    })
    const tetris = this.state.tetris.slice(0);
    positions.forEach(position => {
      tetris[position[0]].splice(position[1], 1, "00");
    });
    newPositions.forEach(position => {
      if (tetris[position[0]+1][position[1]].slice(1) == "D"){
        tetris[position[0]].splice(position[1], 1, blockType);
        this.stopDrop();
        return;
      }
      tetris[position[0]].splice(position[1], 1, blockType);
    });
    if (this.state.falling == true) this.setState({tetris});
  }

  stopDrop(){
    this.pause();
    this.setState({falling: false})
    let positions = this.getPositions();
    const tetris = this.state.tetris;
    positions.forEach(position => {
      const blockType = tetris[position[0]][position[1]];
      const newBlockType = blockType.slice(0,1)+"D";
      tetris[position[0]].splice(position[1],1,newBlockType);
      console.log(tetris);
    })
  }

  gameOver(){
    clearInterval(this.state.timer);
    window.alert(`Game Over! \n SCORE: ${this.state.score}`);
  }

  getPositions(){
    const rows = this.state.tetris.length;
    const columns = this.state.tetris[0].length;
    const positions = [];
    for (let i=0; i<rows; i++){
      if (positions.length == 4) break;
      for (let j=0; j<columns; j++){
        if (this.state.tetris[i][j][1] == "F") {
          positions.push([i,j]);
        }
      }
    }
    return positions;
  }

  handleKeyPress = (e) => {
    console.log("hello");
    switch(e.keyCode){
      case 32:
        if (!this.state.go) this.go(this.state.timer);
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <Tetris tetris={this.state.tetris} />
      </div>
    );
  }
}