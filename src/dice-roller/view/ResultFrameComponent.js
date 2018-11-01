import React, { Component } from 'react';

class ResultFrameComponent extends Component {
  render() {
    return (
      <div>
        <div className="popup">
            <h2>{this.props.data.getDice()}</h2>
            <p>Result: {this.props.data.getResult()}</p>
            <br/>
            <button type='button' onClick={this.props.removeCallback}>Remove</button>
        </div>
        <br/>
      </div>
    );
  }
}

export default ResultFrameComponent;