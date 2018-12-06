import React, { Component } from 'react';
import PropTypes from 'prop-types';

import globals from 'res/globals.js';

class CharacterSpellComponent extends Component {

  generateSpellsRows() {
    return this.props.character.getSpells().map((spell) => {
      return (
        <tr key={spell.name} className='centerText'>
          <td>{spell.level}</td>
          <td>{spell.name}</td>
          <td>{spell.range}</td>
          <td>{spell.components}</td>
          <td>{spell.casting_time}</td>
          <td>{spell.concentration}</td>
        </tr>
      );
    });
  }

  addSpellInput() {
    const options = Object.keys(globals.urls.spells)
      .map(key => {
        return (
          <option key={key} value={key}>{key}</option>
        );
      })
    return (
      <select onChange={this.props.optionHandler}>
        <option key='' />
        {options}
      </select>
    )
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Level</th>
              <th>Spell Name</th>
              <th>Range</th>
              <th>Components</th>
              <th>Cast Time</th>
              <th>Concentration?</th>
            </tr>
            {this.generateSpellsRows()}
            <tr>
              <td colSpan='6'>
                {this.addSpellInput()}
                <button onClick={this.props.addOnClick}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

CharacterSpellComponent.propTypes = {
  character: PropTypes.object.isReqired,
  optionHandler: PropTypes.func.isReqired,
  addOnClick: PropTypes.func.isReqired
};

export default CharacterSpellComponent;