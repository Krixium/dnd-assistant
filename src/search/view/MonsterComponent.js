import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MonsterAbilityComponent from 'search/view/MonsterAbilityComponent.js';

class MonsterComponent extends Component {
  processStats() {
    let stats = '';
    this.props.data.hasOwnProperty('strength') ? stats += this.props.data.strength : stats += '0';
    stats += '/';
    this.props.data.hasOwnProperty('dexterity') ? stats += this.props.data.dexterity : stats += '0';
    stats += '/';
    this.props.data.hasOwnProperty('constitution') ? stats += this.props.data.constitution : stats += '0';
    stats += '/';
    this.props.data.hasOwnProperty('intelligence') ? stats += this.props.data.intelligence : stats += '0';
    stats += '/';
    this.props.data.hasOwnProperty('wisdom') ? stats += this.props.data.wisdom : stats += '0';
    stats += '/';
    this.props.data.hasOwnProperty('charisma') ? stats += this.props.data.charisma : stats += '0';
    return stats;
  }

  generateAbilityTables(propertyName) {
    if (this.props.data.hasOwnProperty(propertyName)) {
      return this.props.data[propertyName].map(element => {
        return (
          <li key={element.name}>
            <MonsterAbilityComponent data={element} />
          </li>
        )
      });
    }
  }

  render() {
    let abilities = [];

    abilities = abilities.concat(this.generateAbilityTables('special_abilities'));
    abilities = abilities.concat(this.generateAbilityTables('actions'));
    abilities = abilities.concat(this.generateAbilityTables('legendary_actions'));

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><h3>Name</h3></td>
              <td>{this.props.data.name}</td>
            </tr>
            <tr>
              <td><h3>Size</h3></td>
              <td>{this.props.data.size}</td>
            </tr>
            <tr>
              <td><h3>Type</h3></td>
              <td>{this.props.data.type}</td>
            </tr>
            <tr>
              <td><h3>Alignment</h3></td>
              <td>{this.props.data.alignment}</td>
            </tr>
            <tr>
              <td><h3>Armor Class</h3></td>
              <td>{this.props.data.armor_class}</td>
            </tr>
            <tr>
              <td><h3>Hit Points</h3></td>
              <td>{this.props.data.hit_points}</td>
            </tr>
            <tr>
              <td><h3>Speed</h3></td>
              <td>{this.props.data.speed}</td>
            </tr>
            <tr>
              <td><h3>STR/DEX/CON/INT/WIS/CHA</h3></td>
              <td>{this.processStats()}</td>
            </tr>
            <tr>
              <td><h3>Vulnerabilities</h3></td>
              <td>{this.props.data.damage_vulnerabilities ? this.props.data.damage_vulnerabilities : 'None'}</td>
            </tr>
            <tr>
              <td><h3>Resistances</h3></td>
              <td>{this.props.data.damage_resistances ? this.props.data.damage_resistances : 'None'}</td>
            </tr>
            <tr>
              <td><h3>Damage Immunities</h3></td>
              <td>{this.props.data.damage_immunities ? this.props.data.damage_immunities : 'None'}</td>
            </tr>
            <tr>
              <td><h3>Condition Immunities</h3></td>
              <td>{this.props.data.condition_immunities ? this.props.data.condition_immunities : 'None'}</td>
            </tr>
            <tr>
              <td><h3>Senses</h3></td>
              <td>{this.props.data.senses ? this.props.data.senses : 'None'}</td>
            </tr>
            <tr>
              <td><h3>Languages</h3></td>
              <td>{this.props.data.languages ? this.props.data.languages : 'None'}</td>
            </tr>
            <tr>
              <td><h3>Challenge Rating</h3></td>
              <td>{this.props.data.challenge_rating}</td>
            </tr>
            <tr>
              <td><h3>Abilities</h3></td>
              <td>{abilities.length > 0 ? abilities : 'None'}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

MonsterComponent.propTypes = {
  data: PropTypes.object.isRequired
};

export default MonsterComponent;