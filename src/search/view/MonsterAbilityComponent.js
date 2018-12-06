import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MonsterAbilityComponent extends Component {
  generateAttackBonusRow() {
    if (this.props.data.attack_bonus !== 0) {
      return (
        <tr>
          <td>Attack Bonus</td>
          <td>{this.props.data.attack_bonus}</td>
        </tr>
      );
    }
  }

  generateDamageDiceRow() {
    if (this.props.data.hasOwnProperty('damage_dice')) {
      return (
        <tr>
          <td>Damage Dice</td>
          <td>{this.props.data.damage_dice}</td>
        </tr>
      );
    }
  }

  generateDamageBonusRow() {
    if (this.props.data.hasOwnProperty('damage_bonus')) {
      return (
        <tr>
          <td>Damage Bonus</td>
          <td>{this.props.data.damage_bonus}</td>
        </tr>
      );
    }
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{this.props.data.name}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{this.props.data.desc}</td>
          </tr>
          {this.generateAttackBonusRow()}
          {this.generateDamageDiceRow()}
          {this.generateDamageBonusRow()}
        </tbody>
      </table>
    );
  }
}

MonsterAbilityComponent.propTypes = {
  data: PropTypes.object.isRequired
};

export default MonsterAbilityComponent;