import React, { Component } from 'react';

class ClassComponent extends Component {
  render() {
    let proficiencyChoices = this.props.data.proficiency_choices.map((element, i) => {
      let choices = element.from.map(e => <li key={e.name}>{e.name}</li>);
      return (
        <li key={i}>
          <h2>Choose {element.choose}</h2>
          <ul>
            {choices}
          </ul>
        </li>
      );
    });
    let proficiencies = this.props.data.proficiencies.map(element => <li key={element.name}>{element.name}</li>);
    let savingThrows = this.props.data.saving_throws.map(element => <li key={element.name}>{element.name}</li>);
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{this.props.data.name}</td>
            </tr>
            <tr>
              <td>Hit Dice</td>
              <td>{'d' + this.props.data.hit_dice}</td>
            </tr>
            <tr>
              <td>Proficiency Choices</td>
              <td><ul>{proficiencyChoices}</ul></td>
            </tr>
            <tr>
              <td>Proficiencies</td>
              <td><ul>{proficiencies}</ul></td>
            </tr>
            <tr>
              <td>Saving Throws</td>
              <td><ul>{savingThrows}</ul></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ClassComponent;