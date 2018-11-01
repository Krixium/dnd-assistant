import React, { Component } from 'react';

// Components
import LogTableComponent from 'combat-log/view/LogTableComponent.js';
import LogEntryComponent from 'combat-log/view/LogEntryComponent.js';

// Log Data
import CombatLog from 'res/combatLog.js';

class CombatLogController extends Component {

  generateDateString() {
    const date = new Date();
    return '' + date.getUTCFullYear() + (date.getMonth() + 1) + date.getDate() + '-' 
      + date.getHours() + date.getMinutes() + date.getSeconds();
  }

  generateDownloadString() {
    let data = []; 
    if (CombatLog.log.length !== 0) {
      data = CombatLog.log.map(entry =>entry.name + '\t' + entry.delta + '\n').reduce((prev, curr) => prev += curr);
    }

    return 'data:text/plain;charset=utf8,' + encodeURIComponent(data);
  }

  clearLog() {
    CombatLog.log = [];
    this.forceUpdate();
  }

  render() {
    const rows = CombatLog.log.map((entry, i) => <LogEntryComponent key={i} name={entry.name} delta={entry.delta}/>);
    return (
      <div>
        <h1>Combat Log</h1>
        <br />
          <div className="centerPopup">
            <a className="aContent" href={this.generateDownloadString()} download={'combat-log-' + this.generateDateString() + '.txt'}>Download</a>
            <button onClick={this.clearLog.bind(this)}>Clear Log</button>
            <LogTableComponent>
              {rows}
            </LogTableComponent>
          </div>
      </div>
    );
  }
}

export default CombatLogController;