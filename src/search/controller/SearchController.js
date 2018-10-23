import React, { Component } from 'react';

// Components
import SearchInput from 'search/view/SearchInput.js';

import RaceComponent from 'search/view/RaceComponent.js';

const corsBypass = 'https://cors-anywhere.herokuapp.com/';
const apiEndpoint = 'http://dnd5eapi.co/api/';

class SearchController extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchCategory: '',
      searchValue: '',
      searchResults: ''
    };
  }

  // Updates category in state when category is changed
  handleCategoryChange(event) {
    this.setState({searchCategory: event.target.value});
  }

  // Updates seach value in state when category is changed
  handleValueChange(event) {
    this.setState({searchValue: event.target.value});
  }

  racesCallback(data) {
    let promises = [];
    // For each result ...
    data.results.forEach(element => {
      // Make a request and append it to an array
      promises.push(
        fetch(corsBypass + element.url).then(res => {
          return res.json(); 
        }).then(resData => {
          if (resData.name.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase())) {
            return resData;
          }
        })
      );

      // Wait for all the requests to finish
      Promise.all(promises).then((races) => {
        let tmp = [];
        races.forEach(race => {
          tmp.push(<RaceComponent data={race} key={race.name}/>);
        });

        this.setState({searchResults: tmp});
      });
    });
  }

  classesCallback(data) {
    console.log('classes');
  }

  spellsCallback(data) {
    console.log('spells');

  }

  featuresCallback(data) {
    console.log('features');

  }

  equipmentCallback(data) {
    console.log('races');

  }

  monstersCallback(data) {
    console.log('monsters');

  }

  searchOnClickCallback() {
    // Dont do anything if there is not category
    if (this.state.searchCategory === '') return;

    // Root of request
    let request = corsBypass + apiEndpoint + this.state.searchCategory;

    // Default callbacks
    let requestCallback = data => { console.log(data); };
    let errorCallback = err => { console.log(err); };

    // Set proper callback based on category
    if (this.state.searchCategory === 'races') {
      requestCallback = this.racesCallback.bind(this);
    } else if (this.state.searchCategory === 'classes') { 
      requestCallback = this.classesCallback.bind(this);
    } else if (this.state.searchCategory === 'spells') { 
      requestCallback = this.spellsCallback.bind(this);
    } else if (this.state.searchCategory === 'features') { 
      requestCallback = this.featuresCallback.bind(this);
    } else if (this.state.searchCategory === 'equipment') { 
      requestCallback = this.equipmentCallback.bind(this);
    } else if (this.state.searchCategory === 'monsters') { 
      requestCallback = this.monstersCallback.bind(this);
    } else {
      console.log(this.state.searchCategory);
    }

    // Make request
    fetch(request)
      .then(res => { return res.json(); })
      .then(requestCallback)
      .catch(errorCallback);
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