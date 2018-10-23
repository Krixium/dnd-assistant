import React, { Component } from 'react';

class SearchInput extends Component {
  render() {
    return (
      <div>
        <form>
          <select name='category' onChange={this.props.categoryChangeCallback}>
            <option value=''/>
            <option value='races'>Race</option>
            <option value='classes'>Class</option>
            <option value='spells'>Spells</option>
            <option value='features'>Features</option>
            <option value='equipment'>Equipment</option>
            <option value='monsters'>Monsters</option>
          </select>
          <input name='value' type='text' onChange={this.props.valueChangeCallback} />
        </form>
        <button type='button' onClick={this.props.searchCallback}>Search</button>
      </div>
    );
  }
}

export default SearchInput;