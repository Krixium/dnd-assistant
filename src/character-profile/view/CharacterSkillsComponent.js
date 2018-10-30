import React, { Component } from 'react';

import globals from 'res/globals.js';

class CharacterSkillsComponent extends Component {
  generateRow(index) {
    let tds = [];
    const attr1 = globals.skillNames[index];
    const attr2 = globals.skillNames[index + 9];
    tds.push(<td key='0'><input type='checkbox' value={attr1} onClick={this.props.handler}/></td>)
    tds.push(<td key='1'>{globals.strings.skillNames[index]}</td>);
    tds.push(<td key='2'>{this.props.character.getSkills()[attr1]}</td>);
    tds.push(<td key='3'><input type='checkbox' value={attr2} onClick={this.props.handler}/></td>)
    tds.push(<td key='4'>{globals.strings.skillNames[index + 9]}</td>);
    tds.push(<td key='5'>{this.props.character.getSkills()[attr2]}</td>);
    return (
      <tr key={index}>
        {tds}
      </tr>
    )
  }

  render() {
    let rows = [];

    for (let i = 0; i < 8; i++) {
      rows.push(this.generateRow(i));
    }

    return (
      <div>
        <h3>Skills</h3>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
      </div>
    );
  }
}

export default CharacterSkillsComponent;