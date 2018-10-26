import React, { Component } from 'react'

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

export default LogTableComponent;