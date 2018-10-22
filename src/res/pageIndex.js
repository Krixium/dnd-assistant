// Library
import React from 'react';

// Components
import SearchController from 'search/controller/SearchController.js';

const pageIndex = {
  home: {
    name: 'Home',
    link: '/',
    component: (props) => <h1>Home</h1>
  },
  dice: {
    name: 'Dice Roller',
    link: '/dice',
    component: (props) => <h1>Dice Roller</h1>
  },
  hp: {
    name: 'HP Tracker',
    link: '/hp',
    component: (props) => <h1>Hp Tracker</h1>
  },
  log: {
    name: 'Combat Log',
    link: '/log',
    component: (props) => <h1>Combat Log</h1>
  },
  profile: {
    name: 'Character Profile',
    link: '/profile',
    component: (props) => <h1>Character Profile</h1>
  },
  custom: {
    name: 'Custom Items',
    link: '/custom',
    component: (props) => <h1>Custom Items</h1>
  },
  search: {
    name: 'Search',
    link: '/search',
    component: SearchController
  }
}

export default pageIndex;