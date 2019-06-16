var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class FinalHero extends LiveForm {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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



            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for(var i in yellowEaterArr){
            if (newX == yellowEaterArr[i].x && newY == yellowEaterArr[i].y) {
                yellowEaterArr.splice(i, 1);
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
            var newfinalhero = new FinalHero(newCell[0], newCell[1], this.index);
            finalheroArr.push(newfinalhero)
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.x][this.y] = 0;
            for (var i in finalheroArr) {
                if (this.x == finalheroArr[i].x && this.y == finalheroArr[i].y) {
                    finalheroArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}