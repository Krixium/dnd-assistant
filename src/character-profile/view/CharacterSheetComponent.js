import React, { Component } from 'react';

import globals from 'res/globals.js';
import Character from 'character-profile/model/Character.js';

class CharacterSheetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRace: '',
      selectedClass: '',
      selectedAlignment: '',
      selectedLevel: 0,
      selectedStats: { 
        str: 0, dex: 0, con: 0,
        int: 0, wis: 0, cha: 0
      },
      selectedSkills: [],
      currentHp: 0
    };
  }

  createRaceOptions() {
    let options = [<option value='' key='-1'/>];
    for (let i = 0; i < globals.strings.races.length; i++) {
      options.push(<option value={globals.races[i]} key={i}>{globals.strings.races[i]}</option>)
    }

    return options;
  }

  createClassOptions() {
    let options = [<option value='' key='-1'/>];
    for (let i = 0; i < globals.strings.classes.length; i++) {
      options.push(<option value={globals.classes[i]} key={i}>{globals.strings.classes[i]}</option>);
    }

    return options;
  }

  createAlignmentOptions() {
    let options = [<option value='' key='-1'/>];
    return options.concat(globals.alignments.map((a, i) => <option value={a} key={i}>{a}</option>));
  }

  raceHandler(event) {
    if (event.target.value === '') return;
    this.setState({selectedRace: event.target.value});
  }

  classHandler(event) {
    if (event.target.value === '') return;
    this.setState({selectedClass: event.target.value});
  }

  alignmentHandler(event) {
    if (event.target.value === '') return;
    this.setState({selectedAlignment: event.target.value});
  }

  levelHandler(event) {
    this.setState({selectedAlignment: event.target.value});
  }

  skillsCheckboxHandler(event) {
    if (event.target.value === '') return;

    let tmp = this.state.selectedSkills;
    
    // If selected
    if (event.target.checked) {
      // If value does not already exist in the array
      if (tmp.indexOf(event.target.value) === -1) {
        // Add the skill to the array
        tmp.push(event.target.value);
      }
    } else {
      let i = tmp.indexOf(event.target.value);
      // If element exists in the array
      if (i > -1) {
        // Remove it
        tmp.splice(i, 1);
      }
    }

    this.setState({selectedSkills: tmp});
  }

  statsHandler(event) {
    let tmp = this.state.selectedStats;
    tmp[event.target.name] = event.target.value;
    this.setState({selectedStats: tmp});
  }

  hpHandler(event) {
    this.setState({currentHp: event.target.value});
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><h2>Name</h2></td>
              <td colSpan='3'><input type='text' /></td>
            </tr>
            <tr>
              <td>Race: <select name='race'>{this.createRaceOptions()}</select></td>
              <td>Class: <select name='class'>{this.createClassOptions()}</select></td>
              <td>Alignment: <select name='alignment'>{this.createAlignmentOptions()}</select></td>
              <td>Level: <input name='level' type='number' /></td>
            </tr>
            <tr>
              <td>HP</td>
              <td><input name='hp' type='number' />/[max hp here]</td>
              <td>[Initiative]</td>
              <td>[speed]</td>
            </tr>
            <tr>
              <td colSpan='2'>
                <h3>Stats</h3>
                <table>
                  <tbody>
                    <tr><td>STR</td><td><input name='str' type='number' onChange={this.statsHandler.bind(this)}/></td></tr>
                    <tr><td>DEX</td><td><input name='dex' type='number' onChange={this.statsHandler.bind(this)}/></td></tr>
                    <tr><td>CON</td><td><input name='con' type='number' onChange={this.statsHandler.bind(this)}/></td></tr>
                    <tr><td>INT</td><td><input name='int' type='number' onChange={this.statsHandler.bind(this)}/></td></tr>
                    <tr><td>WIS</td><td><input name='wis' type='number' onChange={this.statsHandler.bind(this)}/></td></tr>
                    <tr><td>CHA</td><td><input name='cha' type='number' onChange={this.statsHandler.bind(this)}/></td></tr>
                  </tbody>
                </table>
              </td>
              <td colSpan='2'>
                <h3>Skills</h3>
                <table>
                  <tbody>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[0]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Acrobatics</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[9]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Medicine</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[1]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Animal Handling</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[10]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Nature</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[2]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Arcana</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[11]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Perception</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[3]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Athletics</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[12]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Performance</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[4]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Deception</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[13]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Persuasion</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[5]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>History</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[14]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Religion</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[6]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Insight</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[15]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Sleight Of Hand</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[7]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Intimidation</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[16]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Stealth</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td><input type='checkbox' value={globals.skillNames[8]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Investigation</td><td>[value here]</td>
                      <td><input type='checkbox' value={globals.skillNames[17]} onClick={this.skillsCheckboxHandler.bind(this)}/></td>
                      <td>Survival</td><td>[value here]</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CharacterSheetComponent;