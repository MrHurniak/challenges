import React from "react";
import "./Cube3D.css";

export default class Cube3D extends React.Component {

  nodes = [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1],
    [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]];

  edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
  ];

  animationDelay = 20;

  ctx;
  canvas;

  constructor(props) {
    super(props);
    this.state = {
      rotation: {
        x: true,
        y: true,
        z: true,
        speed: {
          min: 1,
          max: 100,
          current: 10,
        }
      }
    }
  }

  scale(factor0, factor1, factor2) {
    this.nodes.forEach(function (node) {
      node[0] *= factor0;
      node[1] *= factor1;
      node[2] *= factor2;
    });
  }

  rotateCuboid(angleX = 0, angleY = 0, angleZ = 0) {
    const sinX = Math.sin(angleX);
    const cosX = Math.cos(angleX);
    const sinY = Math.sin(angleY);
    const cosY = Math.cos(angleY);
    const sinZ = Math.sin(angleZ);
    const cosZ = Math.cos(angleZ);


    this.nodes.forEach(function (node) {
      const x = node[0];
      const y = node[1];
      const z = node[2];

      node[0] = x * (cosZ * cosY) + y * (cosZ * sinY * sinX - sinZ * cosX) + z * (cosZ * sinY * cosX + sinZ * sinZ);
      node[1] = x * (sinZ * cosY) + y * (sinZ * sinY * sinX + cosZ * cosX) + z * (sinZ * sinY * cosX - cosZ * sinX);
      node[2] = x * (-sinY) + y * (cosY * sinX) + z * (cosX * cosY);
    });
  }

  drawCube() {
    this.edges.forEach(edge => {
      const pointA = this.nodes[edge[0]];
      const pointB = this.nodes[edge[1]];

      this.ctx.moveTo(pointA[0] + this.xCorrection, pointA[1] + this.yCorrection);
      this.ctx.lineTo(pointB[0] + this.xCorrection, pointB[1] + this.yCorrection);
    });
  }

  draw() {
    const rotation = this.state.rotation;
    let rotationSpeed = rotation.speed.current / 1000;
    this.rotateCuboid(
      rotation.x ? rotationSpeed : 0,
      rotation.y ? rotationSpeed : 0,
      rotation.z ? rotationSpeed : 0);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();

    this.drawCube();

    this.ctx.stroke();
    this.ctx.closePath();
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.canvas = document.getElementById("cubeCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.canvas.parentElement.clientWidth - 5;
    this.canvas.height = this.canvas.parentElement.clientHeight - 5;

    this.xCorrection = this.canvas.width / 2;
    this.yCorrection = this.canvas.height / 2;

    const min = Math.min(this.canvas.width, this.canvas.height) / 100;
    console.log("min", min);
    this.scale(min, min, min);

    this.intervalId = setInterval(() => this.draw(), this.animationDelay);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  onSpeedChange(event) {
    const value = event.target.value;
    console.log('speed', value);
    this.state.rotation.speed.current = value / this.state.rotation.speed.max;
    this.setState({
      rotation: {
        ...this.state.rotation,
        speed: {
          ...this.state.rotation.speed,
          current: value,
        }
      }
    })
  }

  onAxisChange(e) {
    this.setState({
      rotation: {
        ...this.state.rotation,
        ...e
      }
    });
  }

  render() {
    const rotation = this.state.rotation;
    console.log('rotation', rotation);
    return (
      <div className="content">
        <div className="canvas-container">
          <canvas id="cubeCanvas"></canvas>
        </div>
        <div className="controls-container">
          <div className="control">
            <label form="x">X axis</label>
            <input type="checkbox" id="x" name="x"
                   checked={ rotation.x }
                   onChange={ () => this.onAxisChange({ x: !rotation.x }) }/>
          </div>
          <div className="control">
            <label form="y">Y axis</label>
            <input type="checkbox" id="y" name="y"
                   checked={ rotation.y }
                   onChange={ () => this.onAxisChange({ y: !rotation.y }) }/>
          </div>
          <div className="control">
            <label form="z">Z axis</label>
            <input type="checkbox" id="z" name="z"
                   checked={ rotation.z }
                   onChange={ () => this.onAxisChange({ z: !rotation.z }) }/>
          </div>
          <div className="control">
            <label form="speed">Speed</label>
            <input type="range" id="speed"
                   min={ rotation.speed.min }
                   max={ rotation.speed.max }
                   value={ rotation.speed.current }
                   onChange={ e => this.onSpeedChange(e) }/>
          </div>
        </div>
      </div>
    );
  }
}
