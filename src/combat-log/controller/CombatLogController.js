import React, { Component } from 'react';

// Components
import LogTableComponent from 'combat-log/view/LogTableComponent.js';
import LogEntryComponent from 'combat-log/view/LogEntryComponent.js';

// Log Data
import CombatLog from 'res/combatLog.js';

class CombatLogController extends Component {
  render() {
    const rows = CombatLog.log.map((entry, i) => <LogEntryComponent key={i} name={entry.name} delta={entry.delta}/>);
    return (
      <div>
        <h1>Combat Log</h1>
        <LogTableComponent>
          {rows}
        </LogTableComponent>
      </div>
    );
  }
}

export default CombatLogController;