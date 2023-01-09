import React from "react";
import Cube3D from "./Cube3D";


export default class Cube3DProspective extends Cube3D {

  drawCube() {
    this.edges.forEach(edge => {
      const pointA = this.nodes[edge[0]];
      const pointB = this.nodes[edge[1]];
      const distance = 120;
      const zA = 1 / (distance - pointA[2]) * 100;
      const zB = 1 / (distance - pointB[2]) * 100;

      this.ctx.moveTo(pointA[0] * zA + this.xCorrection, pointA[1] * zA + this.yCorrection);
      this.ctx.lineTo(pointB[0] * zB + this.xCorrection, pointB[1] * zB + this.yCorrection);
    });
  }
}
