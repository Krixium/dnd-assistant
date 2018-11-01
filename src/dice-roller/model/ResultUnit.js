class ResultUnit {
  dice = '';
  result = '';

  constructor(dice, result) {
    this.dice = dice;
    this.result = result;
  }

  getDice() {
    return this.dice;
  }
  getResult () {
    return this.result;
  }
}

export default ResultUnit;