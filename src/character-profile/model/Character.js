import globals from 'res/globals.js';

class Character {
  name = '';
  class = '';
  race = '';
  alignment = '';
  level = 1;
  stats = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  proficiency = 0;
  skills = {
    acrobatics: 0, animalHandling: 0, arcana: 0,
    athletics: 0, deception: 0, history: 0,
    insight: 0, intimidation: 0, investigation: 0,
    medicine: 0, nature: 0, perception: 0,
    performance: 0, persuasion: 0, religion: 0,
    sleightOfHand: 0, stealth: 0, survival: 0
  };
  ac = 0;
  initiative = 0;
  speed = 0;
  hp = { total: 0, current: 0 };
  items = [];
  features = [];
  spells = [];

  buffers = { 
    classData: { hit_die: 0 }, 
    raceData: { ability_bonuses: [0, 0, 0, 0, 0, 0] }, 
    levelData: { prof_bonus: 2 },
    baseStats: { str: 0, dex: 0, con: 0, wis: 0, int: 0, cha: 0 }
  }

  setName(name) { this.name = name; }
  getName() { return this.name; }
  setRace(race) { this.race = race; }
  getRace() { return this.race; }
  setClass(className) { this.class = className; }
  getClass() { return this.class; }
  setAlignment(alignment) { this.alignment = alignment; }
  getAlignment() { return this.alignment; }
  setLevel(level) { this.level = level; }
  getLevel() { return this.level; }
  setSpells(selecteSpells) { this.spells = selecteSpells; }
  getSpells() { return this.spells; }
  setCurrentHp(value) { this.hp.current = value; }
  getCurrentHp() { return this.hp.current; }
  getMaxHp() { return this.hp.total; }
  getInitiative() { return this.initiative; }
  getSpeed() { return this.speed; }
  getStats() { return this.stats; }
  getSkills() { return this.skills; }
  getAC() { return this.ac; }

  getNewClassData() {
    fetch(globals.urls.cors + globals.urls.classes[this.class])
      .then(res => res.json())
      .then(data => {
        this.buffers.classData = data;
        this.calculateHp();
        this.calculateProficiencyBonus();
      });
  }

  getNewRaceData() {
    fetch(globals.urls.cors + globals.urls.races[this.race])
      .then(res => res.json())
      .then(data => {
        this.buffers.raceData = data;
        this.calculateStats(this.buffers.baseStats);
        this.calculateSpeed();
      });
  }

  getNewLevelData() {
    if (this.class === '') return;
    fetch(globals.urls.cors + globals.urls.api + 'classes/' + this.class + '/level/' + this.level)
      .then(res => res.json())
      .then(data => { 
        this.buffers.levelData = data;
        this.calculateProficiencyBonus();
    });
  }

  calculateProficiencyBonus() {
    this.proficiency = this.buffers.levelData.prof_bonus;
  }

  calculateStats(baseStats) {
    this.stats.str = parseInt(baseStats.str) + parseInt(this.buffers.raceData.ability_bonuses[0]);
    this.stats.dex = parseInt(baseStats.dex) + parseInt(this.buffers.raceData.ability_bonuses[1]);
    this.stats.con = parseInt(baseStats.con) + parseInt(this.buffers.raceData.ability_bonuses[2]);
    this.stats.int = parseInt(baseStats.int) + parseInt(this.buffers.raceData.ability_bonuses[3]);
    this.stats.wis = parseInt(baseStats.wis) + parseInt(this.buffers.raceData.ability_bonuses[4]);
    this.stats.cha = parseInt(baseStats.cha) + parseInt(this.buffers.raceData.ability_bonuses[5]);
    this.buffers.baseStats = baseStats;
    this.calculateInitiative();
    this.calculateSkills([]);
    this.calculateHp();
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
    // TODO: calculate AC
  }

  calculateInitiative() {
    this.initiative = this.calculateModifier(this.stats.dex);
  }

  calculateSpeed() {
    this.speed = this.buffers.raceData.speed;
  }

  calculateHp() {
    this.hp.total = this.buffers.classData.hit_die + this.calculateModifier(this.stats.str);
  }

  setFeatures() {
    // TODO: show features
  }

  calculateModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }

  addSpell(spell) {
    this.spells.push(spell);
    this.spells.sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      else return a.name.localeCompare(b.name);
    });
  }
}

export default Character;