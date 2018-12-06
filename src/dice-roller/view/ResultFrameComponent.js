import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultFrameComponent extends Component {
  render() {
    return (
      <div>
        <div className="popup">
            <div className="floatCenter">
              <button type='button' onClick={this.props.removeCallback}>Remove</button>
              <div className="halfWidthVertCenter">
                <h2>{this.props.data.getDice()}</h2>
              </div>
              <div className="halfWidthVertCenter">
                <h3>Result: {this.props.data.getResult()}</h3>
              </div>
            </div>
        </div>
        <br/>
      </div>
    );
  }
}

ResultFrameComponent.propTypes = {
  removeCallback: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default ResultFrameComponent;