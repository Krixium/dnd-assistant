import React, { Component } from 'react';

class UnitFrameComponent extends Component {
  render() {
    return (
      <div>
        <div className="popup">
            <h2>{this.props.data.getName()}</h2>
             <h3>Health</h3>
              <input className="healthInput" type='text' onChange={this.props.healthInputListener}/>
              {this.props.data.getCurrentHealth()}/{this.props.data.getMaxHealth()}
              <button type='button' onClick={this.props.changeHealthCallback}>Apply Change</button>
              <button type='button' onClick={this.props.removeCallback}>Remove</button>
        </div>
        <br/>
      </div>
    );
  }
}

export default UnitFrameComponent;