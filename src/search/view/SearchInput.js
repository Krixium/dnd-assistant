import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

SearchInput.propTypes = {
  categoryChangeCallback: PropTypes.func.isRequired,
  valueChangeCallback: PropTypes.func.isRequired,
  searchCallback: PropTypes.func.isRequired
};

export default SearchInput;