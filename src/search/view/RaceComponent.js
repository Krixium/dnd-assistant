import React, { Component } from 'react';

class RaceComponent extends Component {
  render() {
    const none = 'None';
    const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

    let bonuses = '';
    for (let i = 0; i < abilities.length; i++) {
      bonuses += abilities[i] + ':' + this.props.data.ability_bonuses[i] + ' ';
    }

    let proficiencies = this.props.data.starting_proficiencies.map(item => <li key={item.name}>{item.name}</li>);
    let languages = this.props.data.languages.map(item => <li key={item.name}>{item.name}</li>);
    let traits = this.props.data.traits.map(item => <li key={item.name}>{item.name}</li>);
    let subraces = this.props.data.subraces.map(item => <li key={item.name}>{item.name}</li>);

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><h3>Name</h3></td>
              <td>{this.props.data.name}</td>
            </tr>
            <tr>
              <td><h3>Alignment</h3></td>
              <td>{this.props.data.alignment}</td>
            </tr>
            <tr>
              <td><h3>Size Description</h3></td>
              <td>{this.props.data.size_description}</td>
            </tr>
            <tr>
              <td><h3>Speed</h3></td>
              <td>{this.props.data.speed}</td>
            </tr>
            <tr>
              <td><h3>Proficiencies</h3></td>
              <td>
                <ul>{proficiencies.length > 0 ? proficiencies : none}</ul>
              </td>
            </tr>
            <tr>
              <td><h3>Bonuses</h3></td>
              <td>
                <ul>{bonuses}</ul>
              </td>
            </tr>
            <tr>
              <td><h3>Traits</h3></td>
              <td>
                <ul>{traits.length > 0 ? traits : none}</ul>
              </td>
            </tr>
            <tr>
              <td><h3>Languages</h3></td>
              <td>
                <ul>{languages.length > 0 ? languages : none}</ul>
              </td>
            </tr>
            <tr>
              <td><h3>Subraces</h3></td>
              <td>
                <ul>{subraces.length > 0 ? subraces : none}</ul>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

export default RaceComponent;