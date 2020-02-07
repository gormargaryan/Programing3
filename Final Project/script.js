
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let manCountElement = document.getElementById('manCount');
    let godCountElement = document.getElementById('godCount');
    let zombieCountElement = document.getElementById('zombieCount')
    let doctorCountElement = document.getElementById('doctorCount')
    let weatherElement = document.getElementById('wth')



    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable

        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        manCountElement.innerText = data.manCounter;
        godCountElement.innerText = data.godCounter;
        zombieCountElement.innerText = data.zombieCounter;
        doctorCountElement.innerText = data.doctorCounter;
        weatherElement.innerText = data.weather

        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == 'spring') {
                        fill("#2ECC71");
                    } else if (data.weather == 'summer') {
                        fill("#0B5345");

                    } else if (data.weather == 'autumn') {
                        fill("#97CC2E");

                    } else if (data.weather == 'winter') {
                        fill("#96F3D2");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    if (data.weather == 'spring') {
                        fill("yellow");
                    } else if (data.weather == 'summer') {
                        fill("#FFF000");

                    } else if (data.weather == 'autumn') {
                        fill("#FFCD00");

                    } else if (data.weather == 'winter') {
                        fill("#CFD63A");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {

                    if (data.weather == 'spring') {
                        fill("red");
                    } else if (data.weather == 'summer') {
                        fill("#B22222");

                    } else if (data.weather == 'autumn') {
                        fill("#DC143C");

                    } else if (data.weather == 'winter') {
                        fill("#EE8888");
                    }
                    rect(j * side, i * side, side, side);
                    
                } else if (matrix[i][j] == 4) {
                    if (data.weather == 'spring') {
                        fill("#dbc78f");
                    } else if (data.weather == 'summer') {
                        fill("#FFA07A");

                    } else if (data.weather == 'autumn') {
                        fill("#FA8072");

                    } else if (data.weather == 'winter') {
                        fill("#FCEEC8");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    if (data.weather == 'spring') {
                        fill("white");
                    } else if (data.weather == 'summer') {
                        fill("#FFA07A");

                    } else if (data.weather == 'autumn') {
                        fill("#EAE4CB");

                    } else if (data.weather == 'winter') {
                        fill("#BAD5CE");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    if (data.weather == 'spring') {
                        fill("#5c0b06");
                    } else if (data.weather == 'summer') {
                        fill("#AF140B");

                    } else if (data.weather == 'autumn') {
                        fill("#A65B33");

                    } else if (data.weather == 'winter') {
                        fill("#B07B62");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 7) {
                    fill('#6b0bba');
                    if (data.weather == 'spring') {
                        fill("#5c0b06");
                    } else if (data.weather == 'summer') {
                        fill("#4E23AF");

                    } else if (data.weather == 'autumn') {
                        fill("#503C7C");

                    } else if (data.weather == 'winter') {
                        fill("#7070D3");
                    }
                    rect(j * side, i * side, side, side);
                }

            }
        }
    }

}