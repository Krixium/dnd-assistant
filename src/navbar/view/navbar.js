// Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    // Array of buttons for the navbar
    let links = [];

    // Loop through the index and extract the link and the name to display as buttons in the navbar
    Object.keys(this.props.index).forEach((key, index) => {
      links.push(<Link to={this.props.index[key].link} key={index}>{this.props.index[key].name}</Link>);
    });

    return (
      <div id='navbar'>
        <nav>
          {links}
        </nav>
      </div>
    );
  }
}

export default Navbar;