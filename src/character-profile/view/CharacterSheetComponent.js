import React, { Component } from 'react';

import globals from 'res/globals.js';
import Character from 'character-profile/model/Character.js';

import CharacterStatsComponent from 'character-profile/view/CharacterStatsComponent.js';
import CharacterSkillsComponent from 'character-profile/view/CharacterSkillsComponent.js';

let saveState = {
  character: new Character(),
  selectedRace: '',
  selectedClass: '',
  selectedAlignment: '',
  selectedLevel: 0,
  selectedStats: { 
    str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
  selectedSkills: [],
  selectedSpell: '',
  currentHp: 0
};

class CharacterSheetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = saveState;
  }

  componentWillUnmount() {
    saveState = this.state;
  }

  createRaceOptions() {
    const races = Object.keys(globals.urls.races);
    let options = [<option value='' key='-1'/>];
    for (let i = 0; i < races.length; i++) {
      options.push(<option value={races[i]} key={i}>{races[i]}</option>)
    }

    return options;
  }

  createClassOptions() {
    const classes = Object.keys(globals.urls.classes);
    let options = [<option value='' key='-1'/>];
    for (let i = 0; i < classes.length; i++) {
      options.push(<option value={classes[i]} key={i}>{classes[i]}</option>);
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
    
    if (event.target.checked) {
      if (tmp.indexOf(event.target.value) === -1) {
        tmp.push(event.target.value);
      }
    } else {
      let i = tmp.indexOf(event.target.value);
      if (i > -1) {
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

  spellOptionHandler(event) {
    this.setState({selectedSpell: event.target.value});
  }

  addSpellHandler() {
    if (this.state.selectedSpell === '') return;
    fetch(globals.urls.spells[this.state.selectedSpell])
      .then(res => res.json())
      .then(data => {
        this.state.character.addSpell(data);
        this.forceUpdate();
      });
  }

  generateSpellsRows() {
    return this.state.character.getSpells().map((spell) => {
      return (
        <tr key={spell.name}>
          <td>{spell.level}</td>
          <td>{spell.name}</td>
          <td>{spell.range}</td>
          <td>{spell.components}</td>
          <td>{spell.casting_time}</td>
          <td>{spell.concentration}</td>
        </tr>
      );
    });
  }

  addSpellInput() {
    const options = Object.keys(globals.urls.spells)
                      .map(key => { 
                        return (
                            <option key={key} value={key}>{key}</option>
                          );
                      })
    return (
      <select onChange={this.spellOptionHandler.bind(this)}>
        <option key='' />
        {options}
      </select>
    )
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
              <td>HP <input name='hp' type='number' />/{this.state.character.getMaxHp()}</td>
              <td>Armor Class: {this.state.character.getAC()}</td>
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
        <table>
          <tbody>
            <tr>
              <th>Level</th>
              <th>Spell Name</th>
              <th>Range</th>
              <th>Components</th>
              <th>Cast Time</th>
              <th>Concentraition?</th>
            </tr>
            {this.generateSpellsRows()}
            <tr>
              <td colSpan='6'>
                {this.addSpellInput()}
                <button onClick={this.addSpellHandler.bind(this)}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CharacterSheetComponent;