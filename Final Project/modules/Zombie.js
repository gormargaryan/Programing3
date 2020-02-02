// ZOMBIE 6
var LiveForm = require('./LiveForm.js')
var random = require("./random");


module.exports = class Zombie extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 70
    }
    getNewDirections() {
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
    chooseCell(ch) {
        this.getNewDirections()
        return super.chooseCell(ch)
    }
    infect() {
        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 6

            // matrix[this.y][this.x] = 0

            for (var i in manArr) {
                if (manArr[i].x == newx && manArr[i].y == newy) {
                    // console.log(manArr[i].x, manArr[i].y);
                    manArr.splice(i, 1)
                    let zm = new Zombie(newx, newy)
                    zombieArr.push(zm)
                    zombieHashiv++
                    // console.log("infected");
                }
            }
            // this.x = newx
            // this.y = newy
            matrix[this.y][this.x] = 6
            this.energy += 10
            
        } else {
            this.move()
        }
    }
    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        this.energy -= 5
        // console.log(zombieHashiv);
        
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 6
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
        if (this.energy <= -25) {
            this.die()
        }
        // console.log(matrix);
        
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in zombieArr) {
            if (zombieArr[i].x == this.x && zombieArr[i].y == this.y) {
                zombieArr.splice(i, 1)
            }
        }
    }
    
}