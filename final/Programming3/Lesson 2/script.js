
var pr = prompt(side)
var rp = prompt(m)
var matrix = [];
var m = rp;
var finalheroArr = [];
var predatorArr = [];
var twocell = [];
var yellowEaterArr = [];
var grassArr = [];
var grassEaterArr = [];
var side = pr;
function setup() {
    for (var y = 0; y < m; y++) {
        matrix[y] = []
        for (var x = 0; x < m; x++) {
            matrix[y][x] = Math.round(random(5))
        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    //pttvum em matrix mejov u stexcum em object

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                grassEaterArr.push(et);

            }
            else if (matrix[y][x] == 3) {
                var ye = new YellowEater(x, y, 3)
                yellowEaterArr.push(ye)
            }
            else if (matrix[y][x] == 4) {
                var yeea = new Predator(x, y, 4)
                predatorArr.push(yeea)
            }
            else if(matrix[y][x] == 5){
            var verj = new FinalHero(x,y,5)
            finalheroArr.push(verj)
            }
        }
    }
}
//draw uxaki nerkuma
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red")
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue")
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 5){
                fill("black")
                rect(x * side, y * side, side, side);
            }
        }
    }

    //kanchum em methodnery
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
    }
    for (var i in yellowEaterArr) {
        yellowEaterArr[i].move();
        yellowEaterArr[i].eat();
        yellowEaterArr[i].mul();
        yellowEaterArr[i].die();
    }
    for(var i in predatorArr){
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for(var i in finalheroArr){
        finalheroArr[i].move();
        finalheroArr[i].eat();
        finalheroArr[i].mul();
        finalheroArr[i].die();
    }
}