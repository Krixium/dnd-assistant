import globals from 'res/globals.js';

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

const classUrls = {
  barbarian: 'http://www.dnd5eapi.co/api/classes/1',
  bard: 'http://www.dnd5eapi.co/api/classes/2',
  cleric: 'http://www.dnd5eapi.co/api/classes/3',
  druid: 'http://www.dnd5eapi.co/api/classes/4',
  fighter: 'http://www.dnd5eapi.co/api/classes/5',
  monk: 'http://www.dnd5eapi.co/api/classes/6',
  paladin: 'http://www.dnd5eapi.co/api/classes/7',
  ranger: 'http://www.dnd5eapi.co/api/classes/8',
  rogue: 'http://www.dnd5eapi.co/api/classes/9',
  sorcerer: 'http://www.dnd5eapi.co/api/classes/10',
  warlock: 'http://www.dnd5eapi.co/api/classes/11',
  wizard: 'http://www.dnd5eapi.co/api/classes/12'
}

class Character {
  name = '';
  class = '';
  race = '';
  alignment = '';
  level = 0;
  stats = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
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

  buffers = { classData: undefined, raceData: undefined, levelData: undefined }

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
    this.calculateInitiative();

    this.calculateSkills(selectedSkills);
    this.calculateAC();
    this.calculateHp();

    this.setFeatures();
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
    this.stats.str = baseStats.str + this.buffers.raceData.ability_bonuses[0];
    this.stats.dex = baseStats.dex + this.buffers.raceData.ability_bonuses[1];
    this.stats.con = baseStats.con + this.buffers.raceData.ability_bonuses[2];
    this.stats.int = baseStats.int + this.buffers.raceData.ability_bonuses[3];
    this.stats.wis = baseStats.wis + this.buffers.raceData.ability_bonuses[4];
    this.stats.cha = baseStats.cha + this.buffers.raceData.ability_bonuses[5];
  }

  calculateSkills(selectedSkills) {
    this.skills.acrobatics = this.calculateModifier(this.stats.dex);
    this.skills.animalHandling = this.calculateModifier(this.stats.wis);
    this.skills.arcana = this.calculateModifier(this.stats.int);
    this.skills.athletics = this.calculateModifier(this.stats.str);
    this.skills.deception = this.calculateModifier(this.stats.cha);
    this.skills.history = this.calculateModifier(this.stats.int);
    this.skills.insight = this.calculateModifier(this.stats.wis);
    this.skills.intimidation = this.calculateModifier(this.stats.cha);
    this.skills.investigation = this.calculateModifier(this.stats.int);
    this.skills.medicine = this.calculateModifier(this.stats.wis);
    this.skills.nature = this.calculateModifier(this.stats.int);
    this.skills.perception = this.calculateModifier(this.stats.wis);
    this.skills.performance = this.calculateModifier(this.stats.cha);
    this.skills.persuasion = this.calculateModifier(this.stats.cha);
    this.skills.religion = this.calculateModifier(this.stats.int);
    this.skills.sleightOfHand = this.calculateModifier(this.stats.dex);
    this.skills.stealth = this.calculateModifier(this.stats.dex);
    this.skills.survival = this.calculateModifier(this.stats.wis);

    selectedSkills.forEach(skill => {
      this.skills[skill] += this.proficiency;
    });
  }

  calculateAC() {
    
  }

  calculateInitiative() {
    this.initiative = this.calculateModifier(this.stat.dex);
  }

  calculateSpeed() {
    this.speed = this.buffers.raceData.speed;
  }

  calculateHp() {
    this.hp.total = this.buffers.classData.hit_dice + this.calculateModifier(this.stat.str);
  }

  setFeatures() {

  }

  calculateModifier(stat) {
    return (stat - 10) / 2;
  }
}

export default Character;