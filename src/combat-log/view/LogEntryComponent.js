import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

LogEntryComponent.propTypes = {
  name: PropTypes.string.isRequired,
  delta: PropTypes.number.isRequired
};

export default LogEntryComponent;