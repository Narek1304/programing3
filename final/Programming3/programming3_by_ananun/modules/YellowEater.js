var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class YellowEater extends LiveForm {
    constructor(x, y, index) {
        super(x, y);
        this.index = index;
        this.energy = 10;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    //qayluma
    move() {

        //yntruma vandak
        var newCell = random(this.chooseCell(0));
        this.energy--;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;


            this.y = newY;
            this.x = newX;

        }
    }
    eat() {


        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
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
            var newYellowEater = new YellowEater(newCell[0], newCell[1], this.index);
            yellowEaterArr.push(newYellowEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
            YellowEaterHashiv++;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.x][this.y] = 0;
            for (var i in yellowEaterArr) {
                if (this.x == yellowEaterArr[i].x && this.y == yellowEaterArr[i].y) {
                    yellowEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}