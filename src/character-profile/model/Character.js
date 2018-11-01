import globals from 'res/globals.js';

class Character {
  parent = undefined;
  name = '';
  class = '';
  race = '';
  alignment = '';
  level = 1;
  stats = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  proficiency = 0;
  skills = {
    'Acrobatics': 0,
    'Animal Handling': 0,
    'Arcana': 0,
    'Athletics': 0,
    'Deception': 0,
    'History': 0,
    'Insight': 0,
    'Intimidation': 0,
    'Investigation': 0,
    'Medicine': 0,
    'Nature': 0,
    'Perception': 0,
    'Performance': 0,
    'Persuasion': 0,
    'Religion': 0,
    'Sleight Of Hand': 0,
    'Stealth': 0,
    'Survival': 0
  };
  ac = 0;
  initiative = 0;
  speed = 0;
  hp = { total: 0, current: 0 };
  items = [];
  traits = [];
  spells = [];

  buffers = { 
    classData: { hit_die: 0 }, 
    raceData: { ability_bonuses: [0, 0, 0, 0, 0, 0], traits: [] }, 
    levelData: { prof_bonus: 2 },
    baseStats: { str: 0, dex: 0, con: 0, wis: 0, int: 0, cha: 0 }
  }

  setParent(parent) { this.parent = parent; }
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
  getTraits() { return this.traits; }
  setTraits() { this.traits = this.buffers.raceData.traits.map(trait => trait.name); }

  getNewClassData() {
    fetch(globals.urls.cors + globals.urls.classes[this.class])
      .then(res => res.json())
      .then(data => {
        this.buffers.classData = data;
        this.calculateHp();
        this.calculateProficiencyBonus();
        if (this.parent !== undefined) this.parent.forceUpdate();
      });
  }

  getNewRaceData() {
    fetch(globals.urls.cors + globals.urls.races[this.race])
      .then(res => res.json())
      .then(data => {
        this.buffers.raceData = data;
        this.calculateStats(this.buffers.baseStats);
        this.calculateSpeed();
        this.setTraits();
        if (this.parent !== undefined) this.parent.forceUpdate();
      });
  }

  getNewLevelData() {
    if (this.class === '') return;
    fetch(globals.urls.cors + globals.urls.api + 'classes/' + this.class.toLocaleLowerCase() + '/level/' + this.level)
      .then(res => res.json())
      .then(data => { 
        this.buffers.levelData = data;
        this.calculateProficiencyBonus();
        if (this.parent !== undefined) this.parent.forceUpdate();
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
    this.skills['Acrobatics'] = this.calculateModifier(this.stats.dex);
    this.skills['Animal Handling'] = this.calculateModifier(this.stats.wis);
    this.skills['Arcana'] = this.calculateModifier(this.stats.int);
    this.skills['Athletics'] = this.calculateModifier(this.stats.str);
    this.skills['Deception'] = this.calculateModifier(this.stats.cha);
    this.skills['History'] = this.calculateModifier(this.stats.int);
    this.skills['Insight'] = this.calculateModifier(this.stats.wis);
    this.skills['Intimidation'] = this.calculateModifier(this.stats.cha);
    this.skills['Investigation'] = this.calculateModifier(this.stats.int);
    this.skills['Medicine'] = this.calculateModifier(this.stats.wis);
    this.skills['Nature'] = this.calculateModifier(this.stats.int);
    this.skills['Perception'] = this.calculateModifier(this.stats.wis);
    this.skills['Performance'] = this.calculateModifier(this.stats.cha);
    this.skills['Persuasion'] = this.calculateModifier(this.stats.cha);
    this.skills['Religion'] = this.calculateModifier(this.stats.int);
    this.skills['Sleight Of Hand'] = this.calculateModifier(this.stats.dex);
    this.skills['Stealth'] = this.calculateModifier(this.stats.dex);
    this.skills['Survival'] = this.calculateModifier(this.stats.wis);

    selectedSkills.forEach(skill => {
      this.skills[skill] += this.proficiency;
    });
  }

  calculateAc(armor) {
    const dexMod = this.calculateModifier(this.stats.dex);
    switch (armor.type) {
      case globals.armor.type[0]: 
        // No armor
        this.ac = 10 + dexMod;
        break;
      case globals.armor.type[1]: 
        // Leather
        this.ac = 11 + dexMod;
        break;
      case globals.armor.type[2]:
        // Chain
        this.ac = 13 + Math.min(2, dexMod);
        break;
      case globals.armor.type[3]:
        // Plate
        this.ac = 18;
        break;
      case globals.armor.type[4]:
        // Mage
        this.ac = 13 + dexMod;
        break;
      case globals.armor.type[5]:
        // Barbarian
        this.ac = 10 + dexMod + this.calculateModifier(this.stats.con);
        break;
      case globals.armor.type[6]:
        // Monk
        this.ac = 10 + dexMod + this.calculateModifier(this.stats.wis);
        break;
      case globals.armor.type[7]:
        // Sorcerer
        this.ac = 13 + dexMod;
        break;
      default:
        this.ac = 10;
        break;
    }

    switch (armor.bonus) {
      case globals.armor.bonuses[0]:
      case globals.armor.bonuses[1]:
      case globals.armor.bonuses[3]:
        // Shield
        // Shield of Faith
        // Half cover
        this.ac += 2;
        break;
      case globals.armor.bonuses[2]:
      case globals.armor.bonuses[4]:
        // Spell Shield
        // 3/4 cover
        this.ac += 5;
        break;
      case globals.armor.bonuses[5]:
      case globals.armor.bonuses[6]:
        // +1
        // ring
        this.ac += 1;
        break;
      case globals.armor.bonuses[7]:
        // bracers
        this.ac += 3;
        break;
      default:
        break;
    }
    this.parent.forceUpdate();
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