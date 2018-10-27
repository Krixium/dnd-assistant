import globals from 'res/globals.js';

const races = [
  'dwarf',
  'elf',
  'halfling',
  'human',
  'dragonborn',
  'gnome',
  'halfElf',
  'halfOrc',
  'tiefling'
];

const raceUrls = {
  dwarf: 'http://www.dnd5eapi.co/api/races/1',
  elf: 'http://www.dnd5eapi.co/api/races/2',
  halfling: 'http://www.dnd5eapi.co/api/races/3',
  human: 'http://www.dnd5eapi.co/api/races/4',
  dragonborn: 'http://www.dnd5eapi.co/api/races/5',
  gnome: 'http://www.dnd5eapi.co/api/races/6',
  halfElf: 'http://www.dnd5eapi.co/api/races/7',
  halfOrc: 'http://www.dnd5eapi.co/api/races/8',
  tiefling: 'http://www.dnd5eapi.co/api/races/9'
};

const classes = [
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Wizard'
];

const classUrls = {
  Barbarian: 'http://www.dnd5eapi.co/api/classes/1',
  Bard: 'http://www.dnd5eapi.co/api/classes/2',
  Cleric: 'http://www.dnd5eapi.co/api/classes/3',
  Druid: 'http://www.dnd5eapi.co/api/classes/4',
  Fighter: 'http://www.dnd5eapi.co/api/classes/5',
  Monk: 'http://www.dnd5eapi.co/api/classes/6',
  Paladin: 'http://www.dnd5eapi.co/api/classes/7',
  Ranger: 'http://www.dnd5eapi.co/api/classes/8',
  Rogue: 'http://www.dnd5eapi.co/api/classes/9',
  Sorcerer: 'http://www.dnd5eapi.co/api/classes/10',
  Warlock: 'http://www.dnd5eapi.co/api/classes/11',
  Wizard: 'http://www.dnd5eapi.co/api/classes/12'
}

class Character {
  name = '';
  class = '';
  race = '';
  alignment = '';
  level = 0;
  stats = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0
  };
  proficiency = 0;
  skills = {
    acrobatics: 0,
    animalHandling: 0,
    arcana: 0,
    athletics: 0,
    deception: 0,
    history: 0,
    insight: 0,
    intimidation: 0,
    investigation: 0,
    medicine: 0,
    nature: 0,
    perception: 0,
    performance: 0,
    persuasion: 0,
    religion: 0,
    sleightOfHand: 0,
    stealth: 0,
    survival: 0
  };
  ac = 0;
  initiative = 0;
  speed = 0;
  hp = {
    total: 0,
    current: 0
  };
  items = [];
  features = [];
  spells = [];

  buffers = {
    classData: undefined,
    raceData: undefined,
    levelData: undefined
  }

  // name: string
  // race: string
  // className: string
  // alignment: string
  // stats: stats object
  // selectedSkills: array of strings
  // selectedSpells: array of strings
  constructor(name, race, className, alignment, stats, selectedSkills, selectedSpells) {
    this.name = name;
    this.race = race;
    this.class = className;
    this.alignment = alignment;
    this.level = 1;
    this.spells = selectedSpells;
    this.getNewClassData();
    this.getNewRaceData();
    this.getNewLevelData()
    this.calculateStats(stats);
    this.calculateProficiencyBonus();
    this.calculateSkills(selectedSkills);
    this.calculateAC();
    this.setFeatures();
    this.calculateInitiative();
    this.calculateHp();
    this.calculateSpeed();
  }

  async getNewClassData() {
    await fetch(globals.corsBypass + classUrls[this.class])
      .then(res => res.json())
      .then(data => this.buffers.classData = data);
  }

  async getNewRaceData() {
    await fetch(globals.corsBypass + raceUrls[this.race])
      .then(res => res.json())
      .then(data => this.buffers.raceData = data);
  }

  async getNewLevelData() {
    await fetch(globals.corsBypass + globals.apiEndpoint + 'classes/' + this.class + '/level/' + this.level)
      .then(res => res.json())
      .then(data => this.buffers.levelData = data);
  }

  calculateProficiencyBonus() {
    this.proficiency = this.buffers.levelData.prof_bonus;
  }

  calculateStats(baseStats) {

  }

  calculateSkills(selectedSkills) {

  }

  calculateAC() {

  }

  calculateInitiative() {
    this.initiative = (this.stats.dex - 10) / 2;
  }

  calculateSpeed() {
    this.speed = this.buffers.raceData.speed;
  }

  calculateHp() {
    this.hp.total = this.buffers.classData.hit_dice + ((this.stats.str - 10) / 2);
  }

  setFeatures() {

  }
}

export default Character;