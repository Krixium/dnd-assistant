import React, { Component } from 'react';

import globals from 'res/globals.js';

class CharacterStatsComponent extends Component {
  generateRow(attr) {
    const display = attr.toUpperCase();
    return (
      <tr key={attr}>
        <td>{display}</td><td><input name={attr} type='number' onChange={this.props.handler}/></td>
        <td>{this.props.character.getStats()[attr]}</td>
        <td>{this.props.character.calculateModifier(this.props.character.getStats()[attr])}</td>
      </tr>
    );
  }

  render() {
    const rows = globals.strings.attr.map(a => this.generateRow(a));

    return (
      <div>
        <h3>Stats</h3>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CharacterStatsComponent;