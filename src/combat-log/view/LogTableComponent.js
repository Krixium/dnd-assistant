import React, { Component } from 'react'
import PropTypes from 'prop-types';

class LogTableComponent extends Component {
  render() {
    return (
      <table>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    )
  }
}

LogTableComponent.propTypes = {
  children: PropTypes.array.isRequired
};

export default LogTableComponent;