// Library
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Navbar from 'navbar/view/navbar.js';

// Variables
import pageIndex from 'res/pageIndex.js';

class App extends Component {
  render() {
    // Array of pages
    let routes = [];

    // Loop through all the entries in the index and create a route to that page
    Object.keys(pageIndex).forEach((key) => {
      routes.push(<Route exact path={pageIndex[key].link} component={pageIndex[key].component} key={key}/>);
    });

    return (
      <Router>
        <div className='App'>
            <Navbar index={pageIndex}/>
            <div id='content'>
              {routes}
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
