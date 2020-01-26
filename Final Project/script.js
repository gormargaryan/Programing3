// grass = 1
// xotaker = 2
// predator = 3
// man = 4
// zombie = 5


// function findFirstEmpty() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 0) {
//                 return [x, y]
//             }
//         }
//     }
// } // ++++

// function getRnd(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
// function fillMatrix(x, y) {
//     var matrix = []

//     for (var i = 0; i < y; i++) {
//         matrix.push([])
//         for (var j = 0; j <= x; j++) {
//             var r = getRnd(0, 5)
//             matrix[i].push(r)
//         }
//     }
//     return matrix
// } // +++


// matrix = fillMatrix(40, 40)


// var side = 20;
// var grassarr = [];
// var xotakerarr = [];
// var predatorarr = [];
// var manarr = [];
// var godarr = [];

// for (var y = 0; y < matrix.length; y++) {
//     for (var x = 0; x < matrix[y].length; x++) {
//         if (matrix[y][x] == 1) {
//             grassarr.push(new Grass(x, y, 1))
//         }
//         else if (matrix[y][x] == 2) {
//             var xt = new Xotaker(x, y)
//             xotakerarr.push(xt)
//         }
//         else if (matrix[y][x] == 3) {
//             predatorarr.push(new Predator(x, y))
//         }
//         else if (matrix[y][x] == 4) {
//             manarr.push(new Man(x, y))
//         }
//     }

// }

// function setup() {
//     frameRate(5);
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');
// }
// function draw() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 0) {
//                 fill("#acacac")
//             }
//             else if (matrix[y][x] == 1) {
//                 fill("green") //  grass 1
//             }
//             else if (matrix[y][x] == 2) {
//                 fill('yellow') // xotaker 2
//             }
//             else if (matrix[y][x] == 3) {
//                 fill('red') // predator 3
//             }
//             else if (matrix[y][x] == 4) {
//                 fill('#D8CB9E') // man 4
//             }
//             else if (matrix[y][x] == 5) {
//                 fill('white') // god 5
//             }
//             rect(x * side, y * side, side, side);

//             /*fill("blue")
//             text(x + " " + y, x * side + side / 2, y * side + side / 2)*/
//         }
//     }
//     for (var i in grassarr) {
//         grassarr[i].mult()
//     }
//     for (var i in xotakerarr) {
//         xotakerarr[i].move()
//         xotakerarr[i].eat()
//         xotakerarr[i].mult()
//         xotakerarr[i].die()
//     }
//     for (var i in predatorarr) {
//         predatorarr[i].move()
//         predatorarr[i].eat()
//         predatorarr[i].mult()
//         predatorarr[i].die()
//     }
//     for (var i in manarr) {
//         manarr[i].move()
//         manarr[i].eat()
//         manarr[i].mult()
//         manarr[i].create()
//         manarr[i].die()
//     }
//     for (var i in godarr) {
//         godarr[i].create()
//         godarr[i].move()
//         godarr[i].disappear()
//     }
//     if (manarr.length == 0) {
//         var empty = findFirstEmpty()
//         godarr.push(new God(empty[0], empty[1]))
//         matrix[empty[1]][empty[0]] = 5
//     }
// }
function main() {
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
 
    function handleSubmit() {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;
 
    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
    }

    socket.on('display message', handleMessage);
} // main closing bracket

window.onload = main;   
