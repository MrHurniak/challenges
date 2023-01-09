import React from "react";
import './Navigation.css';

export default class Navigation extends React.Component {

  onSelect(e, id) {
    e.preventDefault();
    this.props.onChange(id);
  }

  render() {
    return (<div>
      <div className="heading">
        <h3>Challenges ({ this.props.challenges?.length || 0 })</h3>
      </div>
      <div className="elementList">
        { this.props.challenges.map(challenge =>
          <li key={ challenge.id }
              className={ "item " + (challenge.id === this.props.active.id ? "selected" : "") }
              onClick={ (e) => this.onSelect(e, challenge.id) }
          >{ challenge.name }</li>
        ) }
      </div>
    </div>)
  }
}
