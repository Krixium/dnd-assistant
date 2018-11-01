// Library
import React from 'react';

// Components
import Home from 'home/view/home.js';
import HpTrackerController from 'hp/controller/HpTrackerController';
import CombatLogController from 'combat-log/controller/CombatLogController.js';
import CharacterProfileController from 'character-profile/controller/CharacterProfileController.js';
import SearchController from 'search/controller/SearchController.js';
import DiceRollerController from 'dice-roller/controller/DiceRollerController.js';

const pageIndex = {
  home: {
    name: 'Home',
    link: '/',
    component: Home
  },
  dice: {
    name: 'Dice Roller',
    link: '/dice',
    component: DiceRollerController
  },
  hp: {
    name: 'HP Tracker',
    link: '/hp',
    component: HpTrackerController
  },
  log: {
    name: 'Combat Log',
    link: '/log',
    component: CombatLogController 
  },
  profile: {
    name: 'Character Profile',
    link: '/profile',
    component: CharacterProfileController
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