
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require('./modules/Predator.js');
var Man = require('./modules/Man.js');
var God = require('./modules/God.js');
var Zombie = require("./modules/Zombie.js");
var Doctor = require("./modules/Doctor.js")
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
manArr = [];
godArr = []
zombieArr = []
doctorArr = []

matrix = [];

grassHashiv = 0;
predatorHashiv = 0;
manHashiv = 0
godHashiv = 0
grassEaterHashiv = 0
zombieHashiv = 0
doctorHashiv = 0
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, man, zombie, doctor) {
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
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < man; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < zombie; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < doctor; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }


    // if(manArr.length == 0) {
    //     let customX = Math.floor(random(matrixSize));
    //     let customY = Math.floor(random(matrixSize));
    //     matrix[customY][customX] = 5     
    // }
    

    
}
matrixGenerator(20, 10, 10, 10, 10, 10, 4);
//! Creating MATRIX -- END



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
                grassEaterHashiv++
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++
            } else if (matrix[y][x] == 4){
                var man = new Man(x, y)
                manArr.push(man)
                manHashiv++
            } else if (matrix[y][x] == 5) {
                var god = new God(x, y)
                godArr.push(god)
                godHashiv++
                // console.log(godHashiv);
                
            } else if (matrix[y][x] == 6) {
                var zombie = new Zombie(x, y)
                zombieArr.push(zombie)
                zombieHashiv++
            } else if (matrix[y][x] == 7) {
                var doctor = new Doctor(x, y)
                doctorArr.push(doctor)
                doctorHashiv++
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
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat()
        }
    }
    if (manArr[0] !== undefined) {
        for (var i in manArr) {
            manArr[i].eat()
        }
    }
    if (godArr[0] !== undefined) {
        for (var i in godArr) {
            godArr[i].create()
        }
    }
    if (zombieArr[0] !== undefined) {
        for (var i in zombieArr) {
            zombieArr[i].infect()
        }
    }
    if (doctorArr[0] !== undefined) {
        for (var i in doctorArr) {
            doctorArr[i].eat()
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        manCounter: manHashiv,
        godCounter: godHashiv,
        zombieCounter: zombieHashiv,
        doctorCounter: doctorHashiv
    }
    
    

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)