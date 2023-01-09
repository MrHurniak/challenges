import React from "react";
import './SnakeGame.css';
import { Direction, Snake } from "./Snake";
import { generateEmptyMatrix, generateFreePoint } from "./Helpers";

export const rows = 20;
export const columns = 20;
export const scale = 20;

export default class SnakeGame extends React.Component {

  delay = 250;
  field;
  direction = new Direction();
  snake = new Snake(generateFreePoint());
  ballPoint;

  increaseDelay() {
    this.delay = this.delay - this.delay * this.snake.length / (rows * columns * 10);
  }

  updateField() {
    this.field = generateEmptyMatrix(rows, columns);
    this.field[this.ballPoint.x][this.ballPoint.y] = 2;

    const body = [...this.snake.body];
    for (let item of body) {
      const cell = this.field[item.x][item.y];
      if (cell === 0) {
        this.field[item.x][item.y] = 1;
        continue;
      }
      if (cell === 2) {
        this.snake.grow();
        this.ballPoint = null;
        this.increaseDelay();
        continue;
      }
      if (cell === 1) {
        console.log("GAME OVER");
        throw new Error("Snake bite itself at point " + item);
      }
    }
  }

  draw() {
    this.snake.next(this.direction);
    if (!this.ballPoint) {
      this.ballPoint = generateFreePoint(this.snake.body);
    }

    this.updateField();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let cell = this.field[i][j];
        if (cell === 1) {
          this.ctx.fillStyle = "black";
        } else if (cell === 2) {
          this.ctx.fillStyle = "red";
        } else {
          this.ctx.fillStyle = "white";
        }

        this.ctx.fillRect(i * scale, j * scale, scale, scale);
      }
    }
  }

  componentDidMount() {
    this.canvas = document.getElementById("mainCanvas");
    this.canvas.width = rows * scale;
    this.canvas.height = columns * scale;
    this.ctx = this.canvas.getContext("2d");

    this.intervalId = setInterval(() => this.draw(), this.delay);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <canvas id="mainCanvas"></canvas>
    )
  }
}
