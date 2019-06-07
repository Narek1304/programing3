class Grass extends Jarangutyun {
  constructor(x, y, index){
      super(x, y, index);
      
  }

  getNewCoordinates() {
      this.directions = [
          [this.x - 1, this.y - 1],
          [this.x, this.y - 1],
          [this.x + 1, this.y - 1],
          [this.x + 1, this.y],
          [this.x + 1, this.y + 1],
          [this.x, this.y + 1],
          [this.x - 1, this.y + 1],
          [this.x - 1, this.y],
      ];
  }
  chooseCell(character) {
      this.getNewCoordinates();
      return super.chooseCell(character);
  }
    evolve() {
      var field = random(this.chooseNearFieldsByIndex(0));
      if (field) {
        var x = field[0];
        var y = field[1];
        matrix[y][x] = 1;
        grassArr.push(new Grass(x, y));
      }
    }
  }