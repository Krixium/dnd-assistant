// Library
import React from 'react';

// Components
import Home from 'home/view/home.js';
import SearchController from 'search/controller/SearchController.js';
import HpTrackerController from '../hp/controller/HpTrackerController';

const pageIndex = {
  home: {
    name: 'Home',
    link: '/',
    component: Home
  },
  dice: {
    name: 'Dice Roller',
    link: '/dice',
    component: (props) => <h1>Dice Roller</h1>
  },
  hp: {
    name: 'HP Tracker',
    link: '/hp',
    component: HpTrackerController
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