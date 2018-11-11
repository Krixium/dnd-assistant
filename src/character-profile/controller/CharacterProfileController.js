import React, { Component } from 'react';
import saveAs from 'file-saver';
import File from 'react-files';

import globals from 'res/globals.js';
import Character from 'character-profile/model/Character.js';

import CharacterStatsComponent from 'character-profile/view/CharacterStatsComponent.js';
import CharacterSkillsComponent from 'character-profile/view/CharacterSkillsComponent.js';
import CharacterSpellComponent from 'character-profile/view/CharacterSpellComponent';

let saveState = {
  character: new Character(),
  selectedStats: {
    str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
  },
  selectedSkills: [],
  selectedSpell: '',
  selectedArmor: {
    type: '',
    bonus: ''
  }
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
    let options = [<option value='' key='' />];
    return options.concat(globals.alignments.map(a => <option value={a} key={a}>{a}</option>));
  }

  nameHandler(event) {
    this.state.character.setName(event.target.value);
    this.forceUpdate();
  }

  raceHandler(event) {
    if (event.target.value === '') return;
    this.state.character.setRace(event.target.value);
    this.state.character.getNewRaceData();
  }

  classHandler(event) {
    if (event.target.value === '') return;
    this.state.character.setClass(event.target.value);
    this.state.character.getNewClassData();
  }

  alignmentHandler(event) {
    if (event.target.value === '') return;
    this.state.character.setAlignment(event.target.value);
    this.forceUpdate();
  }

  levelHandler(event) {
    if (event.target.value > 20 || event.target.value < 1) return;
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
    const value = event.target.value;
    const stat = event.target.name;
    value === '' ? tmp[stat] = 0 : tmp[stat] = value;
    this.setState({ selectedStats: tmp });
    this.state.character.calculateStats(this.state.selectedStats);
  }

  hpHandler(event) {
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

  saveHandler() {
    // remove circlular reference
    this.state.character.setParent(undefined);
    {
      const text = JSON.stringify(this.state.character);
      const filename = this.state.character.getName() + ' ' + this.state.character.getRace() + ' ' + this.state.character.getClass() + '.json';
      const blob = new Blob([text], {type: 'application/json; charset=utf-8'});
      saveAs(blob, filename);
    }
    this.state.character.setParent(this);
  }

  fileSelectHandler(files) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      this.setState({character: new Character(this, JSON.parse(fileReader.result))});
    });
    fileReader.readAsText(files[0]);
  }

  render() {
    return (
      <div>
        <h1>Character Profile</h1>
        <br/>
        <div className="popup">
            <table>
              <tbody>
                <tr>
                  <td><h2>Name</h2></td>
                  <td colSpan='3'>
                    <input type='text' 
                      onChange={this.nameHandler.bind(this)} 
                      value={this.state.character.getName()} />
                  </td>
                </tr>
                <tr>
                  <td>
                    Race: 
                    <select 
                      name='race' 
                      onChange={this.raceHandler.bind(this)} 
                      value={this.state.character.getRace()}>
                      {this.createRaceOptions()}
                    </select>
                  </td>
                  <td>
                    Class:
                    <select 
                      name='class' 
                      onChange={this.classHandler.bind(this)} 
                      value={this.state.character.getClass()}>
                      {this.createClassOptions()}
                    </select>
                  </td>
                  <td>
                    Alignment:
                    <select 
                      name='alignment' 
                      onChange={this.alignmentHandler.bind(this)} 
                      value={this.state.character.getAlignment()}>
                      {this.createAlignmentOptions()}
                    </select>
                  </td>
                  <td>
                    Level:
                    <input 
                      name='level' 
                      onChange={this.levelHandler.bind(this)} 
                      value={this.state.character.getLevel()}
                      type='number' 
                      min='1' max='20' />
                  </td>
                </tr>
                <tr>
                  <td>
                    HP
                    <input 
                      name='hp' 
                      onChange={this.hpHandler.bind(this)}
                      type='number'
                      value={this.state.character.getCurrentHp()}/>
                    /{this.state.character.getMaxHp()}
                  </td>
                  <td>
                    AC:
                    <select 
                      onChange={this.armorTypeHandler.bind(this)}
                      value={this.state.character.getAcType()} >
                      <option />
                      {globals.armor.type.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <select 
                      onChange={this.armorBonusHandler.bind(this)}
                      value={this.state.character.getAcBonus()}>
                      <option />
                      {globals.armor.bonuses.map(bonus => <option key={bonus} value={bonus}>{bonus}</option>)}
                    </select>
                    {this.state.character.getAc()}
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
              </tbody>
            </table>
            <CharacterSpellComponent character={this.state.character} 
              optionHandler={this.spellOptionHandler.bind(this)} 
              addOnClick={this.addSpellHandler.bind(this)} />
            <ul>
              {this.state.character.getTraits().map(trait => <li key={trait}>{trait}</li>)}
            </ul>
            <div className='floatCenter'>
                <button onClick={this.saveHandler.bind(this)}>Save</button>
                <File
                  onChange={this.fileSelectHandler.bind(this)} 
                  onError={(error, file) => console.log(error, file)}
                  accepts={['application/json']}
                  multiple={false}
                  minFileSize={0}
                  clickable>
                  Drop files here or click to load character
                </File>
            </div>
        </div>
      </div>
    );
  }
}

export default CharacterProfileController;