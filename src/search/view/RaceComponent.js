import React, { Component } from 'react';

class RaceComponent extends Component {
  render() {
    const none = 'None';
    const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

    let bonuses = '';

    for (let i = 0; i < abilities.length; i++) {
      bonuses += abilities[i] + ':' + this.props.data.ability_bonuses[i] + ' ';
    }

    let proficiencies = [];
    this.props.data.starting_proficiencies.forEach(item => {
      proficiencies.push(<li key={item.name}>{item.name}</li>)
    });

    let languages = [];
    this.props.data.languages.forEach(item => {
      languages.push(<li key={item.name}>{item.name}</li>)
    });

    let traits = [];
    this.props.data.traits.forEach(item => {
      traits.push(<li key={item.name}>{item.name}</li>)
    });

    let subraces = [];
    this.props.data.subraces.forEach(item => {
      subraces.push(<li key={item.name}>{item.name}</li>)
    });

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{this.props.data.name}</td>
            </tr>
            <tr>
              <td>Alignment</td>
              <td>{this.props.data.alignment}</td>
            </tr>
            <tr>
              <td>Size Description</td>
              <td>{this.props.data.size_description}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{this.props.data.speed}</td>
            </tr>
            <tr>
              <td>Proficiencies</td>
              <td>
                <ul>{proficiencies.length > 0 ? proficiencies : none}</ul>
              </td>
            </tr>
            <tr>
              <td>Bonuses</td>
              <td>
                <ul>{bonuses}</ul>
              </td>
            </tr>
            <tr>
              <td>Traits</td>
              <td>
                <ul>{traits.length > 0 ? traits : none}</ul>
              </td>
            </tr>
            <tr>
              <td>Languages</td>
              <td>
                <ul>{languages.length > 0 ? languages : none}</ul>
              </td>
            </tr>
            <tr>
              <td>Subraces</td>
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