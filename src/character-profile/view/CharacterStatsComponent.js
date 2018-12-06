import React, { Component } from 'react';
import PropTypes from 'prop-types';

import globals from 'res/globals.js';

class CharacterStatsComponent extends Component {
  generateRow(attr) {
    const display = attr.toUpperCase();
    const stats = this.props.character.getStats();
    return (
      <tr key={attr}>
        <td>{display}</td><td><input name={attr} type='number' onChange={this.props.handler}/>{stats[attr]}</td>
        <td>{this.props.character.calculateModifier(this.props.character.getStats()[attr])}</td>
      </tr>
    );
  }

  render() {
    const rows = globals.attr.map(a => this.generateRow(a));

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

CharacterStatsComponent.propTypes = {
  character: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired
};

export default CharacterStatsComponent;