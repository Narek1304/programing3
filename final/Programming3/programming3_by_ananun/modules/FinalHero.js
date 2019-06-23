var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class FinalHero extends LiveForm {
    constructor(x, y, index) {
        super(x, y);
        this.index = index;
        this.energy = 10;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    //qayluma
    move() {

        // yntruma vandak
        var newCell = random(this.chooseCell(4));
        
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;

            this.y = newY;
            this.x = newX;
            this.energy--;

        }
    }
    eat() {


        var newCell1 = this.chooseCell(4)
        var cell = this.chooseCell(3)
        var miacum = newCell1.concat(cell);
        var newCell = random(miacum)
        
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;



            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }
            for(var i in YellowEaterArr){
            if (newX == YellowEaterArr[i].x && newY == YellowEaterArr[i].y) {
                YellowEaterArr.splice(i, 1);
                break;
            }
        }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }

    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            // var newYellowEater = new YellowEater(newCell[0], newCell[1], this.index);
            // yellowEaterArr.push(newYellowEater);
            var newFinalHero = new FinalHero(newCell[0], newCell[1], this.index);
            FinalHeroArr.push(newFinalHero)
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 5;
            FinalHeroHashiv++;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.x][this.y] = 0;
            for (var i in FinalHeroArr) {
                if (this.x == FinalHeroArr[i].x && this.y == FinalHeroArr[i].y) {
                    FinalHeroArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}