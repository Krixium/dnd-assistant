import React, { Component } from 'react';

// Data Model
import ResultUnit from 'dice-roller/model/ResultUnit.js';

// Components
import ResultFrameComponent from 'dice-roller/view/ResultFrameComponent.js';

// State hack
let ResultTrackerState = {
  results: [],
  diceBuffer: ""
};

class DiceRollerController extends Component {
  constructor(props) {
    super(props);

    this.state = ResultTrackerState;
  }

  componentWillUnmount() {
    ResultTrackerState = this.state;
  }

  diceTextBoxListener(event) {
    this.setState({diceBuffer: event.target.value});
  }

  addNewResults() {
    let str = this.state.diceBuffer;
    let separators = ['d', '\\+', "(?=-)"];
    let stringArray = str.split(new RegExp(separators.join('|'), 'g'));
    let numberOfDice = 0;
    let diceMax = 0;
    let result = 0;
    let modifyer = 0;
    let newResults = this.state.results;

    if (stringArray.length > 1 && !isNaN(stringArray[0]) && !isNaN(stringArray[1]))
    {
        numberOfDice = parseInt(stringArray[0]);
        diceMax = parseInt(stringArray[1]);
        for (let i = 2; i < stringArray.length; i++)
        {
            if (!isNaN(stringArray[i]))
            {
                modifyer -= parseInt(stringArray[i]);
            }
        }
        
        for (let i = 0; i < numberOfDice; i++)
        {
            result = Math.floor((Math.random() * diceMax) + 1);
            result -= modifyer;
            
            newResults.push(new ResultUnit(this.state.diceBuffer, result));
            this.setState({results: newResults});
        }
    }
  }
  
  removeResult(index) {
    this.state.results.splice(index, 1);
    this.forceUpdate();
  }

  render() {
    const resultFrames = this.state.results.map((ResultUnit, i) => {
      return <ResultFrameComponent 
        key={i} 
        data={ResultUnit} 
        removeCallback={this.removeResult.bind(this, i)} />
    });

    return (
      <div>
        <h1>Dice Roller</h1>
        <br/>
        <div className = "popup">
            <input type="text" className="fullWidth" onChange={this.diceTextBoxListener.bind(this)} placeholder="[0-100]d[1-100]+/-[modifier]"/>
            <br/>
            <button type="button" onClick={this.addNewResults.bind(this)}>Roll</button>
        </div>
        <br/>
        <div>
          {resultFrames}
        </div>
      </div>
    );
  }
}

export default DiceRollerController;