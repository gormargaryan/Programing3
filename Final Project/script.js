
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
        doctorCountElement.innerText = data.doctorCounter
        
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('#dbc78f');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('white');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    fill('#5c0b06');
                    rect(j * side, i * side, side, side);
                }else if (matrix[i][j] == 7) {
                    fill('#6b0bba');
                    rect(j * side, i * side, side, side);
                }
                
            }
        }
    }
    
}