import React, { Component } from 'react';

class ClassComponent extends Component {
  render() {
    const proficiencyChoices = this.props.data.proficiency_choices.map((element, i) => {
      const choices = element.from.map(e => <li key={e.name}>{e.name}</li>);
      return (
        <li key={i}>
          <h3>Choose {element.choose}</h3>
          <ul>
            {choices}
          </ul>
        </li>
      );
    });

    const proficiencies = this.props.data.proficiencies.map(element => <li key={element.name}>{element.name}</li>);
    const savingThrows = this.props.data.saving_throws.map(element => <li key={element.name}>{element.name}</li>);

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><h3>Name</h3></td>
              <td>{this.props.data.name}</td>
            </tr>
            <tr>
              <td><h3>Hit Dice</h3></td>
              <td>{'d' + this.props.data.hit_die}</td>
            </tr>
            <tr>
              <td><h3>Proficiency Choices</h3></td>
              <td><ul>{proficiencyChoices}</ul></td>
            </tr>
            <tr>
              <td><h3>Proficiencies</h3></td>
              <td><ul>{proficiencies}</ul></td>
            </tr>
            <tr>
              <td><h3>Saving Throws</h3></td>
              <td><ul>{savingThrows}</ul></td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

export default ClassComponent;