import React, { Component } from 'react';

class UnitFrameComponent extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan='2'><h2>{this.props.data.getName()}</h2></td>
            </tr>
            <tr>
              <td><h3>Health</h3></td>
              <td>{this.props.data.getCurrentHealth()}/{this.props.data.getMaxHealth()}</td>
            </tr>
            <tr>
              <td><input type='text' onChange={this.props.healthInputListener}/></td>
              <td><button type='button' onClick={this.props.changeHealthCallback}>Apply Change</button></td>
            </tr>
            <tr>
              <td colSpan='2'><button type='button' onClick={this.props.removeCallback}>Remove</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default UnitFrameComponent;