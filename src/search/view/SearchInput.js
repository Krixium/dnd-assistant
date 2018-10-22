import React, { Component } from 'react';

class SearchInput extends Component {
  render() {
    return (
      <div>
        <form>
          <select name='category' onChange={this.props.categoryChangeCallback}>
            <option value='race'>Race</option>
            <option value='class'>Class</option>
            <option value='spells'>Spells</option>
            <option value='items'>Items</option>
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