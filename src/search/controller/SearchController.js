import React, { Component } from 'react';

import SearchInput from 'search/view/SearchInput.js';

class SearchController extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchCategory: "",
      searchValue: "",
      searchResults: ""
    };
  }

  handleCategoryChange(event) {
    this.setState({searchCategory: event.target.value});
  }

  handleValueChange(event) {
    this.setState({searchValue: event.target.value});
  }

  searchOnClickCallback() {
    console.log(this.state);
    // Make search here
  }

  render() {
    return (
      <div>
        <h1>Search</h1>
        <br />
        <SearchInput searchCallback={this.searchOnClickCallback.bind(this)} 
          categoryChangeCallback={this.handleCategoryChange.bind(this)} 
          valueChangeCallback={this.handleValueChange.bind(this)} />
        {this.state.searchResults}
      </div>
    );
  }
}

export default SearchController;