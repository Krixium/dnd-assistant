class CombatUnit {
  name = '';
  health = 0;
  maxHealth = 0;
  buffer = '';

  constructor(name, current, max) {
    this.name = name;
    this.health = parseInt(current);
    this.maxHealth = parseInt(max);
  }

  getName() {
    return this.name;
  }

  getCurrentHealth() {
    return parseInt(this.health);
  }

  getMaxHealth() {
    return parseInt(this.maxHealth);
  }

  changeHealth(delta) {
    this.health += parseInt(delta);
  } 

  setHealth(health) {
    this.health = parseInt(health);
  }

  setMaxHealth(maxHealth) {
    this.maxHealth = parseInt(maxHealth);
  }

  getBuffer() {
    return this.buffer;
  }
  
  setBuffer(buffer) {
    this.buffer = buffer;
  }
}

export default CombatUnit;