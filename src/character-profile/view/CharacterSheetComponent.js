import React, { Component } from 'react';

import Character from 'character-profile/model/Character.js';

class CharacterSheetComponent extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan='4'><h2>[Character name here]</h2></td>
            </tr>
            <tr>
              <td>[race here]</td>
              <td>[class here]</td>
              <td>[alignment here]</td>
              <td>[level here]</td>
            </tr>
            <tr>
              <td>HP</td>
              <td>[current/total]</td>
              <td>[Initiative]</td>
              <td>[speed]</td>
            </tr>
            <tr>
              <td colSpan='2'>
                <h3>Stats</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>STR</td><td>[str here]</td>
                    </tr>
                    <tr>
                      <td>DEX</td><td>[dex here]</td>
                    </tr>
                    <tr>
                      <td>CON</td><td>[con here]</td>
                    </tr>
                    <tr>
                      <td>INT</td><td>[int here]</td>
                    </tr>
                    <tr>
                      <td>WIS</td><td>[wis here]</td>
                    </tr>
                    <tr>
                      <td>CHA</td><td>[cha here]</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td colSpan='2'>
                <h3>Skills</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>Acrobatics</td><td>[value here]</td>
                      <td>Medicine</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td>Animal Handling</td><td>[value here]</td>
                      <td>Nature</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td>Arcana</td><td>[value here]</td>
                      <td>Perception</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td>Athletics</td><td>[value here]</td>
                      <td>Performance</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td>Deception</td><td>[value here]</td>
                      <td>Persuasion</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td>History</td><td>[value here]</td>
                      <td>Religion</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td>Insight</td><td>[value here]</td>
                      <td>Sleight Of Hand</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td>Intimidation</td><td>[value here]</td>
                      <td>Stealth</td><td>[value here]</td>
                    </tr>
                    <tr>
                      <td>Investigation</td><td>[value here]</td>
                      <td>Survival</td><td>[value here]</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CharacterSheetComponent;