import React, { Component } from 'react';

// Data Model
import CombatUnit from 'hp/model/CombatUnit.js';
import CombatLog from 'res/combatLog.js';

// Components
import UnitFrameComponent from 'hp/view/UnitFrameComponent.js';

// State hack
let HpTrackerState = {
  units: [],
  nameBuffer: "",
  healthBuffer: 0,
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
    CombatLog.log.push({
      name: this.state.units[index].getName(),
      delta: value
    });

    // Force re-render
    this.forceUpdate();
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
        <div className = "popup">
            <div className="floatCenter">
                <div className="halfWidth">
                    <h3><label>Name</label></h3>
                    <input type='text' onChange={this.nameTextBoxListener.bind(this)} />
                </div>
                <div className="halfWidth">
                    <h3><label>Health</label></h3>
                    <input type='number' onChange={this.healthTextBoxListener.bind(this)} />
                </div>
            </div>
            <br/>
            <div className="overflowBlock">
                <button type='button' onClick={this.addNewUnit.bind(this)}>Add Unit</button>
            </div>
        </div>
        <br/>
        <div>
          {unitFrames}
        </div>
      </div>
    );
  }
}

export default HpTrackerController;