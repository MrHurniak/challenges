import './App.css';

import React from "react";

import Challenges from "./challenges/Challenges";
import Navigation from "./challenges/Navigation";
import Cube3DProspective from "./challenges/3d-cube/Cube3DProspective";
import SnakeGame from "./challenges/snake/SnakeGame";
import CellularAutomation
  from "./challenges/cellural-automation/CellularAutomation";
import Cube3D from "./challenges/3d-cube/Cube3D";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.onChange.bind(this);

    let challenges = [{
      id: 1,
      name: "Rotating Cube",
      component: <Cube3D></Cube3D>
    }, {
      id: 2,
      name: "Rotating Cube with Prospective",
      component: <Cube3DProspective></Cube3DProspective>
    }, {
      id: 3,
      name: "Snake game",
      component: <SnakeGame></SnakeGame>
    }, {
      id: 4,
      name: "Cellular Automation",
      component: <CellularAutomation></CellularAutomation>
    }];

    this.state = {
      active: challenges[0],
      challenges
    }
  }

  onChange(e) {
    console.log(this.state.challenges);
    let active = this.state.challenges.find(item => item.id === e);
    console.log(active);
    this.setState({
        active
      }
    )
  }

  render() {
    return (
      <div className="App">
        <div className="main-content">
          <Challenges
            challenge={ this.state.active }></Challenges>
        </div>
        <div className="navigation">
          <Navigation challenges={ this.state.challenges }
                      active={ this.state.active }
                      onChange={ this.onChange.bind(this) }></Navigation>
        </div>
      </div>
    );
  }
}
