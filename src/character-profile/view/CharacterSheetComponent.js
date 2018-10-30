import React, { Component } from 'react';

import globals from 'res/globals.js';
import Character from 'character-profile/model/Character.js';

import CharacterStatsComponent from 'character-profile/view/CharacterStatsComponent.js';
import CharacterSkillsComponent from 'character-profile/view/CharacterSkillsComponent.js';

class CharacterSheetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: new Character(),
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
    this.state.character.setRace(event.target.value);
    this.state.character.getNewRaceData();
  }

  classHandler(event) {
    if (event.target.value === '') return;
    this.setState({selectedClass: event.target.value});
    this.state.character.setClass(event.target.value);
    this.state.character.getNewClassData();
  }

  alignmentHandler(event) {
    if (event.target.value === '') return;
    this.setState({selectedAlignment: event.target.value});
    this.state.character.getAlignment(event.target.value);
  }

  levelHandler(event) {
    if (event.target.value > 20 || event.target.value < 1) return;
    this.setState({selectedAlignment: event.target.value});
    this.state.character.setLevel(event.target.value);
    this.state.character.getNewLevelData();
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
    this.state.character.calculateSkills(this.state.selectedSkills);
  }

  statsHandler(event) {
    let tmp = this.state.selectedStats;
    tmp[event.target.name] = event.target.value;
    this.setState({selectedStats: tmp});
    this.state.character.calculateStats(this.state.selectedStats);
  }

  hpHandler(event) {
    this.setState({currentHp: event.target.value});
    this.state.character.setCurrentHp(event.target.value);
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
              <td>Race: <select name='race' onChange={this.raceHandler.bind(this)}>{this.createRaceOptions()}</select></td>
              <td>Class: <select name='class' onChange={this.classHandler.bind(this)}>{this.createClassOptions()}</select></td>
              <td>Alignment: <select name='alignment' onChange={this.alignmentHandler.bind(this)}>{this.createAlignmentOptions()}</select></td>
              <td>Level: <input name='level' type='number' onChange={this.levelHandler.bind(this)} min='1' max='20'/></td>
            </tr>
            <tr>
              <td>HP</td>
              <td><input name='hp' type='number' />/{this.state.character.getMaxHp()}</td>
              <td>Initiative: {this.state.character.getInitiative()}</td>
              <td>Speed: {this.state.character.getSpeed()}</td>
            </tr>
            <tr>
              <td colSpan='2'>
                <CharacterStatsComponent character={this.state.character} handler={this.statsHandler.bind(this)} />
              </td>
              <td colSpan='2'>
                <CharacterSkillsComponent character={this.state.character} handler={this.skillsCheckboxHandler.bind(this)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CharacterSheetComponent;