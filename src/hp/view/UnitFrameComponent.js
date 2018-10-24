import React, { Component } from 'react';

class UnitFrameComponent extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td colspan='2'><h3>[name here]</h3></td>
            </tr>
            <tr>
              <td><h3>Health</h3></td>
              <td>[health number here]</td>
            </tr>
            <tr>
              <td><input type='text' /></td>
              <td><button type='button'>Apply</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default UnitFrameComponent;