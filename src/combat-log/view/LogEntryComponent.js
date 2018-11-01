import React, { Component } from 'react';

class LogEntryComponent extends Component {
  render() {
    return (
      <tr>
        <td className="halfWidth">{this.props.name}</td>
        <td>{this.props.delta}</td>
      </tr>
    );
  }
}

export default LogEntryComponent;