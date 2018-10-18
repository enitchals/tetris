import React from "react";
import Tetris from "./Components/Tetris.js";
import "./App.css";
import {startingArray, blocks} from './TetrisArrays.js';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tetris: startingArray,
      speed: 600,
      go: false,
      timer: null,
      score: 0,
      falling: true,
      blockType: "1F",
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
    let canDrop = true;
    const newPositions = positions.map(position => {
      if (position[0] == 23){
        canDrop = false;
      }
      if (position[0]<23){
        if (this.state.tetris[position[0]+1][position[1]].slice(1) == "D"){
          console.log("look out!");
          canDrop = false;
        }
      }
      if (canDrop){
        return [position[0]+1, position[1]];
      }
    })
    if (canDrop) this.updatePositions(positions, newPositions);
    if (!canDrop) this.stopDrop();
  }

  stopDrop(){
    this.pause();
    let positions = this.getPositions();
    const tetris = this.state.tetris;
    const newBlockType = this.state.blockType.slice(0,1)+"D";
    positions.forEach(position => {
      tetris[position[0]].splice(position[1],1,newBlockType);
    })
    this.setState({tetris});
    this.newBlock();
    this.go();
  }

  newBlock(){
    const newBlock = blocks[Math.floor(Math.random()*7)];
    const blockTypes = ["1F", "2F", "3F"];
    const blockType = blockTypes[Math.floor(Math.random()*3)];
    this.setState({blockType});
    this.updatePositions([], newBlock);
  }

  updatePositions(oldPositions, newPositions){
    const tetris = this.state.tetris;
    oldPositions.forEach(position => {
      tetris[position[0]].splice(position[1], 1, "00");
    });
    newPositions.forEach(position => {
      tetris[position[0]].splice(position[1], 1, this.state.blockType);
    });
    this.setState({tetris});
  }

  moveLeft(){
    let positions = this.getPositions();
    let canMoveLeft = true;
    const newPositions = positions.map(position => {
      if (position[1] == 0) {
        canMoveLeft = false;
      }
      if (position[1]>0){
        if (this.state.tetris[position[0]][position[1]-1].slice(1) == "D"){
          canMoveLeft = false;
        }
      }
      if (canMoveLeft) {
        return [position[0], position[1]-1];
      }
    });
    if (canMoveLeft) this.updatePositions(positions, newPositions);
  }
  moveRight(){
    let positions = this.getPositions();
    let canMoveRight = true;
    const newPositions = positions.map(position => {
      if (position[1] == 9) {
        canMoveRight = false;
      }
      if (position[1]<9){
        if (this.state.tetris[position[0]][position[1]+1].slice(1) == "D"){
          canMoveRight = false;
        }
      }
      if (canMoveRight) {
        return [position[0], position[1]+1];
      }
    });
    if (canMoveRight) this.updatePositions(positions, newPositions);
  }

  rotate(){
    let positions = this.getPositions();
    let canRotate = true;
    // do some magic here to figure out the new positions
    // possibly set canRotate to false, if needed
  }

  checkForLoss(){
    for (let i=0; i<4; i++){
      for (let j=0;j<10; j++){
        if (this.state.tetris[i][j].splice(1) == "D") this.gameOver();
      }
    }
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
    switch(e.keyCode){
      case 32:
        if (!this.state.go) this.go(this.state.timer);
        break;
      case 37:
        this.moveLeft();
        break;
      case 39:
        this.moveRight();
        break;
      case 38:
        this.rotate();
        break;
      case 40:
        this.drop();
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