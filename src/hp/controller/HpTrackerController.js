import React, { Component } from 'react';

// Data Model
import CombatUnit from 'hp/model/CombatUnit.js';

// Components
import UnitFrameComponent from 'hp/view/UnitFrameComponent.js';

// State hack
let HpTrackerState = {
  units: [],
  nameBuffer: "",
  healthBuffer: 0,
  log: []
};


class HpTrackerController extends Component {
  constructor(props) {
    super(props);

    this.state = HpTrackerState;
  }

  componentWillUnmount() {
    HpTrackerState = this.state;
  }

  nameTextBoxListener(event) {
    this.setState({nameBuffer: event.target.value});
  }

  healthTextBoxListener(event) {
    this.setState({healthBuffer: event.target.value});
  }

  healthInputListener(i, event) {
    const tmp = this.state.units;
    tmp[i].setBuffer(event.target.value);
    this.setState({units: tmp});
  }

  changeHealthCallback(i) {
    this.changeHealth(i, this.state.units[i].buffer);
  }

  addNewUnit() {
    let newUnits = this.state.units;
    newUnits.push(new CombatUnit(this.state.nameBuffer, this.state.healthBuffer));
    this.setState({units: newUnits});
  }

  removeUnit(index) {
    this.state.units.splice(index, 1);
    this.forceUpdate();
  }

  changeHealth(index, value) {
    // Check the value
    const number = Number(value);
    if (isNaN(number)) return;

    // Change hp
    this.state.units[index].changeHealth(number);

    // Log it
    let oldLog = this.state.log;
    oldLog.push({
      name: this.state.units[index].getName(),
      delta: value
    });
    this.setState({log: oldLog});
  }

  render() {
    const unitFrames = this.state.units.map((combatUnit, i) => {
      return <UnitFrameComponent 
        key={i} 
        data={combatUnit} 
        healthInputListener={this.healthInputListener.bind(this, i)}
        changeHealthCallback={this.changeHealthCallback.bind(this, i)}
        removeCallback={this.removeUnit.bind(this, i)} />
    });

    return (
      <div>
        <h1>Hp Tracker</h1>
        <div>
          <h3>Name</h3>
          <input type='text' onChange={this.nameTextBoxListener.bind(this)} />
          <h3>Health</h3>
          <input type='number' onChange={this.healthTextBoxListener.bind(this)} />
          <br />
          <button type='button' onClick={this.addNewUnit.bind(this)}>Add Unit</button>
        </div>
        <div>
          {unitFrames}
        </div>
      </div>
    );
  }
}

export default HpTrackerController;
export {
  HpTrackerState
}