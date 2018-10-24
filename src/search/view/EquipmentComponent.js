import React, { Component } from 'react';

class EquipmentComponent extends Component {
  generatePropertiesRow() {
    if (this.props.data.hasOwnProperty('properties')) {
      return (
        <tr>
          <td><h3>Properties</h3></td>
          <td>{this.props.data.properties.map(element => <li key={element.url}>{element.name}</li>)}</td>
        </tr>
      );
    }
  }

  generateDamageRow() {
    if (this.props.data.hasOwnProperty('damage')) {
      return (
        <tr>
          <td><h3>Damage</h3></td>
          <td>
            {this.props.data.damage.dice_count + 'd' + this.props.data.damage.dice_value + ' ' + this.props.data.damage.damage_type.name}
          </td>
        </tr>
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

  generateWeaponRangeRow() {
    if (this.props.data.hasOwnProperty('weapon_range')) {
      return (
        <tr>
          <td><h3>Weapon Range</h3></td>
          <td>{this.props.data.weapon_range}</td>
        </tr>
      );
    }
  }

  generateArmorCategoryRow() {
    if (this.props.data.hasOwnProperty('armor_category')) {
      return (
        <tr>
          <td><h3>Armour Category</h3></td>
          <td>{this.props.data.armor_category}</td>
        </tr>
      );
    }
  }

  generateArmorClassRow() {
    if (this.props.data.hasOwnProperty('armor_class')) {
      return (
        <tr>
          <td><h3>Armour Class</h3></td>
          <td>
            {this.props.data.armor_class.base}
            {this.props.data.armor_class.dex_bonus ? ' dex bonus max +' + this.props.data.armor_class.max_bonus : ''}
          </td>
        </tr>
      );
    }
  }

  generateStrMinRow() {
    if (this.props.data.hasOwnProperty('str_minimum')) {
      return (
        <tr>
          <td><h3>Strength Minimum</h3></td>
          <td>{this.props.data.str_minimum}</td>
        </tr>
      );
    }
  }

  generateStealthDisadvantageRow() {
    if (this.props.data.hasOwnProperty('stealth_disadvantage')) {
      return (
        <tr>
          <td><h3>Stealth Disadvantage</h3></td>
          <td>{this.props.data.stealth_disadvantage ? 'True' : 'False'}</td>
        </tr>
      );
    }
  }

  generateVehicleCategoryRow() {
    if (this.props.data.hasOwnProperty('vehicle_category')) {
      return (
        <tr>
          <td><h3>Vehicle Category</h3></td>
          <td>{this.props.data.vehicle_category}</td>
        </tr>
      );
    }
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
            {this.generateWeaponRangeRow()}
            {this.generateArmorCategoryRow()}
            {this.generateArmorClassRow()}
            {this.generateStrMinRow()}
            {this.generateStealthDisadvantageRow()}
            {this.generateVehicleCategoryRow()}
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