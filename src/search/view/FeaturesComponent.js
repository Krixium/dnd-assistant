import React, { Component } from 'react';

class FeaturesComponent extends Component {
  render() {
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
              <td><h3>Level</h3></td>
              <td>{this.props.data.level}</td>
            </tr>
            <tr>
              <td><h3>Class</h3></td>
              <td>{this.props.data.class.name}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

export default FeaturesComponent;