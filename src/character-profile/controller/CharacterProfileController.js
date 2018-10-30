import React, { Component } from 'react';

// Component
import CharacterSheetComponent from 'character-profile/view/CharacterSheetComponent.js';

class CharacterProfileController extends Component {
  render() {
    return (
      <div>
        <h1>Character Profile</h1>
        <CharacterSheetComponent />
      </div>
    );
  }
}

export default CharacterProfileController;