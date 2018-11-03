import React, { Component } from 'react';
import saveAs from 'file-saver';
import File from 'react-files';

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

  saveHandler() {
    const text = JSON.stringify(CombatLog);
    const filename = this.generateDateString() + '.json';
    const blob = new Blob([text], { type: 'application/json; charset=utf-8' });
    saveAs(blob, filename);
  }

  loadHandler(files) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const tmp = JSON.parse(fileReader.result);
      CombatLog.log = tmp.log; 
      CombatLog.units = tmp.units;
      this.forceUpdate();
    });
    fileReader.readAsText(files[0]);
  }

  clearLog() {
    CombatLog.log = [];
    this.forceUpdate();
  }

  render() {
    const rows = CombatLog.log.map((entry, i) => <LogEntryComponent key={i} name={entry.name} delta={entry.delta} />);
    return (
      <div>
        <h1>Combat Log</h1>
        <br />
        <div className="centerPopup">
          <File
            onChange={this.loadHandler.bind(this)}
            onError={(error, file) => console.log(error, file)}
            accepts={['application/json']}
            multiple={false}
            minFileSize={0}
            clickable>
            Drop files here or click to load combat log
          </File>
          <button onClick={this.saveHandler.bind(this)}>Save Log</button>
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