import React, { Component } from 'react';

class SearchInput extends Component {
  render() {
    return (
      <div>
        <div className="floatCenter">
          <div className="halfWidth">
            <select name='category' onChange={this.props.categoryChangeCallback}>
              <option value=''/>
              <option value='races'>Race</option>
              <option value='classes'>Class</option>
              <option value='spells'>Spells</option>
              <option value='features'>Features</option>
              <option value='equipment'>Equipment</option>
              <option value='monsters'>Monsters</option>
            </select>
          </div>
          <div className="halfWidth">
            <input name='value' type='text' onChange={this.props.valueChangeCallback} />
          </div>
        </div>
        <div className="overflowBlock">
          <button type='button' onClick={this.props.searchCallback}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchInput;