import { columns, rows } from "./SnakeGame";

export class Snake {
  body = [];

  constructor(point) {
    this.body.push(point);
  }

  get length() {
    return this.body.length;
  }

  next(direction) {
    let point = this.body[this.body.length - 1];
    let x = point.x;
    let y = point.y;

    switch (direction.direction) {
      case "UP": y -= 1; break;
      case "DOWN": y += 1; break;
      case "LEFT": x -= 1; break;
      case "RIGHT": x += 1; break;
    }

    let head = new Point(x, y);
    if (this.isStepBack(head)) {
      direction.reverse();
      return;
    }

    this.body.push(head);
    this.body.shift();
  }

  grow() {
    this.body.unshift(new Point(this.body[0].x, this.body[0].y));
  }

  isStepBack(head) {
    const length = this.body.length;
    if (length < 2) {
      return false;
    }
    const beforeHead = this.body[this.body.length - 2];

    return beforeHead.equal(head);
  }

  toString() {
    return `Snake[${this.body}]`;
  }
}


export class Direction {
  constructor() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case "ArrowUp":
          this._direction = "UP"; break;
        case "ArrowDown":
          this._direction = "DOWN"; break;
        case "ArrowLeft":
          this._direction = "LEFT"; break;
        case "ArrowRight":
          this._direction = "RIGHT"; break;
      }
    });
  }

  reverse() {
    switch (this.direction) {
      case "UP":
        this._direction = "DOWN"; break;
      case "DOWN":
        this._direction = "UP"; break;
      case "LEFT":
        this._direction = "RIGHT"; break;
      case "RIGHT":
        this._direction = "LEFT"; break;
    }
  }

  get direction() {
    return this._direction;
  }
}

export class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set x(x) {
    this._x = (x + rows) % rows;
  }

  set y(y) {
    this._y = (y + columns) % columns;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  equal(another) {
    return another?.x === this.x
      && another?.y === this.y;
  }

  toString() {
    return `Point[x:${this.x};y${this.y}]`;
  }
}
