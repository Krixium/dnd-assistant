import React, { Component } from 'react';

// Components
import UnitFrameComponent from 'hp/view/UnitFrameComponent.js';

class HpTrackerController extends Component {
  render() {
    return (
      <div>
        <h1>Hp Tracker</h1>
        <UnitFrameComponent />
      </div>
    );
  }
}

export default HpTrackerController;