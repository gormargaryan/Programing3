var LiveForm = require('./LiveForm.js')
var random = require("./random");
var Zombie = require("./Zombie")

module.exports = class Doctor extends LiveForm {
    constructor(x, y) {
        super(x, y)
        this.energy = 20
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
    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 7;
            let newdc = new Doctor(newx, newy)
            doctorArr.push(newdc)
            doctorHashiv++
        }
    }
    eat() {
        let food = random(this.chooseCell(1));
        let moretastyfood = random(this.chooseCell(2));
        if (moretastyfood || food) {
            if (moretastyfood) {
                let newx = moretastyfood[0]
                let newy = moretastyfood[1]
                matrix[newy][newx] = 7
                matrix[this.y][this.x] = 0
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == newx && grassEaterArr[i].y == newy) {
                        grassEaterArr.splice(i, 1)
                    }
                }
                this.x = newx
                this.y = newy
                this.energy += 4
                if (this.energy >=25) {
                    this.mul()
                } 
                else if (this.energy >= 15) {
                    this.create()
                }
            }
            if (food) {
                let newx = food[0]
                let newy = food[1]
                matrix[newy][newx] = 7
                matrix[this.y][this.x] = 0

                for (var i in grassArr) {
                    if (grassArr[i].x == newx && grassArr[i].y == newy) {
                        grassArr.splice(i, 1)
                    }
                }
                this.x = newx
                this.y = newy
                this.energy++
                if (this.energy >= 25) {
                    this.mul()
                } 
                else if (this.energy >= 15) {
                    this.create()
                }
            }    
        } else {
            this.move()
        }

    }
    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        this.energy -= 3
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 7
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
        if (this.energy <= -25) {
            this.die()
        }
    }
    create() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0]
            let y = newCell[1]
            matrix[y][x] = 6
            var zm = new Zombie(x, y)
            zombieArr.push(zm)
            zombieHashiv++
            this.energy -= 5
            // console.log("done");
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in doctorArr) {
            if (doctorArr[i].x == this.x && doctorArr[i].y == this.y) {
                doctorArr.splice(i, 1)
            }
        }
    }
}