import React, { Component } from 'react';

// Model
import Character from 'character-profile/model/Character.js';

// Component
import CharacterSheetComponent from 'character-profile/view/CharacterSheetComponent.js';

class CharacterProfileController extends Component {
  constructor(props) {
    super(props);
  }

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