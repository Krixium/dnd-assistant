import React, { Component } from 'react';

import globals from 'res/globals.js';

class CharacterSkillsComponent extends Component {
  generateRow(index) {
    let tds = [];
    const attr1 = globals.skills[index];
    const attr2 = globals.skills[index + 9];
    const skills = this.props.character.getSkills();
    tds.push(<td key='0'><input type='checkbox' value={attr1} readOnly checked={skills.selected.indexOf(attr1) > -1} onClick={this.props.handler}/></td>)
    tds.push(<td key='1'>{globals.skills[index]}</td>);
    tds.push(<td key='2'>{skills[attr1]}</td>);
    tds.push(<td key='3'><input type='checkbox' value={attr2} readOnly checked={skills.selected.indexOf(attr2) > -1} onClick={this.props.handler}/></td>)
    tds.push(<td key='4'>{globals.skills[index + 9]}</td>);
    tds.push(<td key='5'>{skills[attr2]}</td>);
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