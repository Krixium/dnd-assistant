import React, { Component } from 'react';

import globals from 'res/globals.js';
import Character from 'character-profile/model/Character.js';

class CharacterSheetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSkills: []
    };
  }

  createRaceOptions() {
    const raceDispaly = [
      'Dwarf',
      'Elf',
      'Halfling',
      'Human',
      'Dragonborn',
      'Gnome',
      'Half Elf',
      'Half Orc',
      'Tiefling'
    ];

    let options = [<option value='' key='-1'/>];
    for (let i = 0; i < raceDispaly.length; i++) {
      options.push(<option value={globals.races[i]} key={i}>{raceDispaly[i]}</option>)
    }

    return options;
  }

  createClassOptions() {
    const classDisplay = [
      'Barbarian',
      'Bard',
      'Cleric',
      'Druid',
      'Fighter',
      'Monk',
      'Paladin',
      'Ranger',
      'Rogue',
      'Sorcerer',
      'Warlock',
      'Wizard'
    ];

    let options = [<option value='' key='-1'/>];
    for (let i = 0; i < classDisplay.length; i++) {
      options.push(<option value={globals.classes[i]} key={i}>{classDisplay[i]}</option>);
    }

    return options;
  }

  createAlignmentOptions() {
    let options = [<option value='' key='-1'/>];
    return options.concat(globals.alignments.map((a, i) => <option value={a} key={i}>{a}</option>));
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
    console.log(this.state.selectedSkills);
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
              <td><input name='currentLevel' type='number' />/<input name='maxLevel' type='number' /></td>
              <td>[Initiative]</td>
              <td>[speed]</td>
            </tr>
            <tr>
              <td colSpan='2'>
                <h3>Stats</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>STR</td><td><input name='str' type='number' /></td>
                    </tr>
                    <tr>
                      <td>DEX</td><td><input name='dex' type='number' /></td>
                    </tr>
                    <tr>
                      <td>CON</td><td><input name='con' type='number' /></td>
                    </tr>
                    <tr>
                      <td>INT</td><td><input name='int' type='number' /></td>
                    </tr>
                    <tr>
                      <td>WIS</td><td><input name='wis' type='number' /></td>
                    </tr>
                    <tr>
                      <td>CHA</td><td><input name='cha' type='number' /></td>
                    </tr>
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