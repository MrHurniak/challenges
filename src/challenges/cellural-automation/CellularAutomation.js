import React from "react";


const rows = 500;
const columns = 500;
const generationProbability = .25;
const scale = 2;

export default class CellularAutomation extends React.Component {

  delay = 100;

  init() {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix.push([]);
      for (let j = 0; j < columns; j++) {
        matrix[i].push(Math.random() < generationProbability ? 1 : 0);
      }
    }
    this.matrix = matrix;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "green";
    let counter = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (this.matrix[i][j] === 1) {
          this.ctx.fillRect(i * scale, j * scale, scale, scale);
          counter++;
        }
      }
    }

    if (counter === 0) {
      console.log("STOP");
      return;
    }

    this.next();
  }

  next() {
    const newMatrix = [];
    for (let i = 0; i < rows; i++) {
      newMatrix.push([]);
      for (let j = 0; j < columns; j++) {
        let count = 0;
        if (i - 1 > -1) {
          count += (j - 1 > -1) ? this.matrix[i - 1][j - 1] : 0;
          count += this.matrix[i - 1][j];
          count += (j + 1 < columns) ? this.matrix[i - 1][j + 1] : 0;
        }
        if (i + 1 < rows) {
          count += (j - 1 > -1) ? this.matrix[i + 1][j - 1] : 0;
          count += this.matrix[i + 1][j];
          count += (j + 1 < columns) ? this.matrix[i + 1][j + 1] : 0;
        }
        count += (j - 1 > -1) ? this.matrix[i][j - 1] : 0;
        count += (j + 1 < columns) ? this.matrix[i][j + 1] : 0;
        newMatrix[i].push(this.isAlive(count) ? 1 : 0, this.matrix[i][j]);
      }
    }
    this.matrix = newMatrix;
  }

  isAlive(count, state) {
    if (state === 1) {
      return count === 2
        ||count === 3;
    }
    return count === 3;

  }

  componentDidMount() {
    this.canvas = document.getElementById("mainCanvas");
    this.canvas.width = this.canvas.parentNode.parentElement.clientWidth * 0.95;
    this.canvas.height = this.canvas.parentNode.parentElement.clientHeight * 0.95;

    this.ctx = this.canvas.getContext("2d");

    this.init();

    this.intervalId = setInterval(() => this.draw(), this.delay);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return(
      <canvas id="mainCanvas"></canvas>
    )
  }
}
