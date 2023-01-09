import { columns, rows } from "./SnakeGame";
import { Point } from "./Snake";

export function generateFreePoint(body = []) {
  // TODO enhance
  while (true) {
    const point = randomPoint();
    if (!body.find(item => point.equal(item))) {
      return point;
    }
  }
}

export function randomPoint() {
  const x = Math.floor(Math.random() * rows);
  const y = Math.floor(Math.random() * columns);
  return new Point(x, y);
}

export function generateEmptyMatrix(rows, columns) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < columns; j++) {
      matrix[i].push(0);
    }
  }
  return matrix;
}
