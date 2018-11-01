import React, { Component } from 'react';

import globals from 'res/globals.js';
import Character from 'character-profile/model/Character.js';

import CharacterStatsComponent from 'character-profile/view/CharacterStatsComponent.js';
import CharacterSkillsComponent from 'character-profile/view/CharacterSkillsComponent.js';
import CharacterSpellComponent from 'character-profile/view/CharacterSpellComponent';

let saveState = {
  character: new Character(),
  selectedName: '',
  selectedRace: '',
  selectedClass: '',
  selectedAlignment: '',
  selectedLevel: 0,
  selectedStats: {
    str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
  },
  selectedSkills: [],
  selectedSpell: '',
  selectedArmor: {
    type: '',
    bonus: ''
  },
  currentHp: 0
};

class CharacterProfileController extends Component {
  constructor(props) {
    super(props);

    this.state = saveState;
    this.state.character.setParent(this);
  }

  componentWillUnmount() {
    saveState = this.state;
  }

  createRaceOptions() {
    const races = Object.keys(globals.urls.races);
    let options = [<option value='' key='-1' />];
    for (let i = 0; i < races.length; i++) {
      options.push(<option value={races[i]} key={i}>{races[i]}</option>)
    }

    return options;
  }

  createClassOptions() {
    const classes = Object.keys(globals.urls.classes);
    let options = [<option value='' key='-1' />];
    for (let i = 0; i < classes.length; i++) {
      options.push(<option value={classes[i]} key={i}>{classes[i]}</option>);
    }

    return options;
  }

  createAlignmentOptions() {
    let options = [<option value='' key='-1' />];
    return options.concat(globals.alignments.map((a, i) => <option value={a} key={i}>{a}</option>));
  }

  nameHandler(event) {
    this.setState({selectedName: event.target.value});
    this.state.character.selectedName(this.state.selectedName);
  }

  raceHandler(event) {
    if (event.target.value === '') return;
    this.setState({ selectedRace: event.target.value });
    this.state.character.setRace(event.target.value);
    this.state.character.getNewRaceData();
  }

  classHandler(event) {
    if (event.target.value === '') return;
    this.setState({ selectedClass: event.target.value });
    this.state.character.setClass(event.target.value);
    this.state.character.getNewClassData();
  }

  alignmentHandler(event) {
    if (event.target.value === '') return;
    this.setState({ selectedAlignment: event.target.value });
    this.state.character.getAlignment(event.target.value);
  }

  levelHandler(event) {
    if (event.target.value > 20 || event.target.value < 1) return;
    this.setState({ selectedAlignment: event.target.value });
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

    this.setState({ selectedSkills: tmp });
    this.state.character.calculateSkills(this.state.selectedSkills);
  }

  statsHandler(event) {
    let tmp = this.state.selectedStats;
    tmp[event.target.name] = event.target.value;
    this.setState({ selectedStats: tmp });
    this.state.character.calculateStats(this.state.selectedStats);
  }

  hpHandler(event) {
    this.setState({ currentHp: event.target.value });
    this.state.character.setCurrentHp(event.target.value);
  }

  spellOptionHandler(event) {
    this.setState({ selectedSpell: event.target.value });
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

  armorTypeHandler(event) {
    let tmp = this.state.selectedArmor;
    tmp.type = event.target.value;
    this.setState({selectedArmor: tmp});
    this.state.character.calculateAc(this.state.selectedArmor);
  }

  armorBonusHandler(event) {
    let tmp = this.state.selectedArmor;
    tmp.bonus = event.target.value;
    this.setState({selectedArmor: tmp});
    this.state.character.calculateAc(this.state.selectedArmor);
  }

  render() {
    return (
      <div>
        <h1>Character Profile</h1>
        <table>
          <tbody>
            <tr>
              <td><h2>Name</h2></td>
              <td colSpan='3'><input type='text' onChange={this.nameHandler.bind(this)}/></td>
            </tr>
            <tr>
              <td>Race: <select name='race' onChange={this.raceHandler.bind(this)}>{this.createRaceOptions()}</select></td>
              <td>Class: <select name='class' onChange={this.classHandler.bind(this)}>{this.createClassOptions()}</select></td>
              <td>Alignment: <select name='alignment' onChange={this.alignmentHandler.bind(this)}>{this.createAlignmentOptions()}</select></td>
              <td>Level: <input name='level' type='number' onChange={this.levelHandler.bind(this)} min='1' max='20' /></td>
            </tr>
            <tr>
              <td>HP <input name='hp' type='number' />/{this.state.character.getMaxHp()}</td>
              <td>
                AC:
                <select onChange={this.armorTypeHandler.bind(this)}>
                  <option />
                  {globals.armor.type.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <select onChange={this.armorBonusHandler.bind(this)}>
                  <option />
                  {globals.armor.bonuses.map(bonus => <option key={bonus} value={bonus}>{bonus}</option>)}
                </select>
                {this.state.character.getAC()}
              </td>
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
            <tr>
              <td colSpan='3'>
                <CharacterSpellComponent character={this.state.character} 
                  optionHandler={this.spellOptionHandler.bind(this)} 
                  addOnClick={this.addSpellHandler.bind(this)} />
              </td>
              <td>
                <ul>
                  {this.state.character.getTraits().map(trait => <li key={trait}>{trait}</li>)}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CharacterProfileController;