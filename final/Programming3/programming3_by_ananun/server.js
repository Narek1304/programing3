
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
let random = require('./modules/random');
var Predator = require("./modules/Predator.js");
var YellowEater = require("./modules/YellowEater.js");
var FinalHero = require("./modules/FinalHero.js");


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
PredatorArr = [];
YellowEaterArr = [];
FinalHeroArr = [];
matrix = [];
grassHashiv = 10;
grassEaterHashiv = 5;
YellowEaterHashiv = 4;
PredatorHashiv = 4;
FinalHeroHashiv = 2;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, YellowEater, Predator, FinalHero) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < YellowEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < Predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < FinalHero; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 10, 5, 4, 4, 3);




//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var yellowEater = new YellowEater(x, y);
                YellowEaterArr.push(yellowEater);
            } else if (matrix[y][x] == 4) {
                var predator = new Predator(x, y);
                PredatorArr.push(predator);
            } else if (matrix[y][x] == 5) {0
                var finalHero = new FinalHero(x, y);
                FinalHeroArr.push(finalHero);
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
            
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].die();
            
        }
    }
    if (YellowEaterArr[0] !== undefined) {
        for (var i in YellowEaterArr) {
            YellowEaterArr[i].eat();
            YellowEaterArr[i].mul();
            YellowEaterArr[i].die();
            
        }
    }
    if (PredatorArr[0] !== undefined) {
        for (var i in PredatorArr) {
            PredatorArr[i].eat();
            PredatorArr[i].mul();
            PredatorArr[i].die();
           
        }
    }
    if (FinalHeroArr[0] !== undefined) {
        for (var i in FinalHeroArr) {
            FinalHeroArr[i].eat();
            FinalHeroArr[i].mul();
            FinalHeroArr[i].die();
           
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        YellowEaterCounter: YellowEaterHashiv,
        PredatorCounter: PredatorHashiv,
        FinalHeroCounter: FinalHeroHashiv
    }
    

    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)





weather = 'spring';

setInterval(function () 
{
  if (weather == 'spring') 
  {
    weather = 'summer'; 
    
    
  }

  else if (weather == 'summer') 
  {
    weather = 'autumn';
  }

  else if (weather == 'autumn') 
  {
    weather = 'winter';
    
  }

  else if (weather == 'winter') 
  {
    weather = 'spring';
  }
}, 5000)