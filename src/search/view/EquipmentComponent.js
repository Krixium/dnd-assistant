import React, { Component } from 'react';

class EquipmentComponent extends Component {
  generatePropertiesRow() {
    if (this.props.data.hasOwnProperty('properties')) {
      return (
        <tr>
          <td><h3>Properties</h3></td>
          <td>{this.props.data.properties.map(element => <li key={element.name}>{element.name}</li>)}</td>
        </tr>
      );
    }
  }

  generateDamageRow() {
    if (this.props.data.hasOwnProperty('damage')) {
      return (
        <div>
          <tr>
            <td><h3>Damage</h3></td>
            <td>
              {this.props.data.damage.dice_count + 'd' + this.props.data.damage.dice_value + ' ' + this.props.data.damage.damage_type.name}
            </td>
          </tr>
        </div>
      );
    }
  }

  generateRangeRow() {
    if (this.props.data.hasOwnProperty('range')) {
      return (<tr>
        <td><h3>Range</h3></td>
        <td>
          <ul>
            <li>Normal: {this.props.data.range.normal ? this.props.data.range.normal : 'N/A'}</li>
            <li>Long: {this.props.data.range.long ? this.props.data.range.long : 'N/A'}</li>
          </ul>
        </td>
      </tr>
      );
    }
  }

  genearteWeaponRangeRow() {
    if (this.props.data.hasOwnProperty('weapon_range')) {
      return (<tr>
        <td><h3>Weapon Range</h3></td>
        <td>{this.props.data.weapon_range}</td>
      </tr>
      );
    }
  }

  generateArmorRows() {
    let rows = [];
    if (this.props.equipment_category === 'Armor') {
      rows.append(
        <tr>
          <td><h3>Armour Category</h3></td>
          <td>{this.props.data.armor_category}</td>
        </tr>
      );
      rows.append(
        <tr>
          <td><h3>Armour Class</h3></td>
          <td>{this.props.data.armour_class.base
            + this.props.armor_class.dex_bonus ? ' dex bonus ' + this.props.armor_class.dex_bonus + ' max ' + this.props.armour_class.max_bonus : ''}</td>
        </tr>
      );
      rows.append(
        <tr>
          <td><h3>Strength Minimum</h3></td>
          <td>{this.props.data.str_minimum}</td>
        </tr>
      );
      rows.append(
        <tr>
          <td><h3>Stealth Disadvantage?</h3></td>
          <td>{this.props.data.stealth_disadvantage}</td>
        </tr>
      );
    }
    return rows;
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><h3>Name</h3></td>
              <td>{this.props.data.name}</td>
            </tr>
            <tr>
              <td><h3>Equipment Category</h3></td>
              <td>{this.props.data.equipment_category}</td>
            </tr>
            {this.generateDamageRow()}
            {this.generateRangeRow()}
            {this.genearteWeaponRangeRow()}
            <tr>
              <td><h3>Cost</h3></td>
              <td>{this.props.data.cost.quantity + ' ' + this.props.data.cost.unit}</td>
            </tr>
            <tr>
              <td><h3>Weight</h3></td>
              <td>{this.props.data.weight}</td>
            </tr>
            {this.generatePropertiesRow()}
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

export default EquipmentComponent;