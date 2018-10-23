import React, { Component } from 'react';

// Components
import SearchInput from 'search/view/SearchInput.js';

import RaceComponent from 'search/view/RaceComponent.js';
import ClassComponent from 'search/view/ClassComponent.js';
import SpellComponent from 'search/view/SpellComponent.js';
import FeaturesComponent from 'search/view/FeaturesComponent.js';
import EquipmentComponent from 'search/view/EquipmentComponent.js';
import MonsterComponent from 'search/view/MonsterComponent.js';

// API endpoints
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

  // Checks if the value contains the search value
  matchesSearch(value) {
    return value.toLocaleLowerCase().includes(this.state.searchValue.toLocaleLowerCase());
  }

  // Updates category in state when category is changed
  handleCategoryChange(event) {
    this.setState({searchCategory: event.target.value});
  }

  // Updates seach value in state when category is changed
  handleValueChange(event) {
    this.setState({searchValue: event.target.value});
  }

  // Filters the data and then passes the data to the correct component
  populateViewComponent(data, ViewComponent) {
    let promises = [];

    // Filter or results that match search
    let filteredNames = data.results.filter(element => this.matchesSearch(element.name));
  
    // For each result ...
    filteredNames.forEach(element => {
      // Make a request and append it to an array
      promises.push(
        fetch(corsBypass + element.url).then(res => {
          return res.json(); 
        }).then(data => {
          return data;
        })
      );

      // Wait for all the requests to finish
      let tmp = [];
      Promise.all(promises).then((request) => {
        request.forEach(data => {
          tmp.push(<ViewComponent data={data} key={data.name}/>);
        });

        this.setState({searchResults: tmp});
      });
    });
  }

  racesCallback(data) {
    this.populateViewComponent(data, RaceComponent);
  }

  classesCallback(data) {
    this.populateViewComponent(data, ClassComponent);
  }

  spellsCallback(data) {
    this.populateViewComponent(data, SpellComponent);
  }

  featuresCallback(data) {
    this.populateViewComponent(data, FeaturesComponent);
  }

  equipmentCallback(data) {
    this.populateViewComponent(data, EquipmentComponent);
  }

  monstersCallback(data) {
    this.populateViewComponent(data, MonsterComponent);
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