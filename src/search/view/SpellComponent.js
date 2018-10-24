import React, { Component } from 'react';

class SpellComponent extends Component {
  render() {
    const components = this.props.data.components.map(element => element + ' ');
    const classes = this.props.data.classes.map(element => <li key={element.name}>{element.name}</li>)
    const subclasses = this.props.data.subclasses.map(element => <li key={element.name}>{element.name}</li>)

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><h3>Name</h3></td>
              <td>{this.props.data.name}</td>
            </tr>
            <tr>
              <td><h3>Description</h3></td>
              <td>{this.props.data.desc}</td>
            </tr>
            <tr>
              <td><h3>Higher Levels</h3></td>
              <td>{this.props.data.higher_level}</td>
            </tr>
            <tr>
              <td><h3>Reference</h3></td>
              <td>{this.props.data.page}</td>
            </tr>
            <tr>
              <td><h3>Range</h3></td>
              <td>{this.props.data.range}</td>
            </tr>
            <tr>
              <td><h3>Components</h3></td>
              <td>{components}</td>
            </tr>
            <tr>
              <td><h3>Materials</h3></td>
              <td>{this.props.data.material}</td>
            </tr>
            <tr>
              <td><h3>Ritual</h3></td>
              <td>{this.props.data.ritual}</td>
            </tr>
            <tr>
              <td><h3>Duration</h3></td>
              <td>{this.props.data.duration}</td>
            </tr>
            <tr>
              <td><h3>Concentration</h3></td>
              <td>{this.props.data.concentration}</td>
            </tr>
            <tr>
              <td><h3>School</h3></td>
              <td>{this.props.data.school.name}</td>
            </tr>
            <tr>
              <td><h3>Classes</h3></td>
              <td><ul>{classes}</ul></td>
            </tr>
            <tr>
              <td><h3>Subclasses</h3></td>
              <td><ul>{subclasses.length > 0 ? subclasses : 'None'}</ul></td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

export default SpellComponent;