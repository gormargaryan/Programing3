var LiveForm = require('./LiveForm.js')
var random = require("./random");


module.exports = class Predator extends LiveForm{
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
    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        this.energy -= 2
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 3
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 3;
            let newpd = new Predator(newx, newy, 3)
            predatorArr.push(newpd)
            predatorHashiv++
        }
    }
    eat() {
        let food = random(this.chooseCell(2))
        let moretastyfood = random(this.chooseCell(4))
        
        
        if (food || moretastyfood) {
            if (food) {
                let newx = food[0]
                let newy = food[1]
                matrix[newy][newx] = 3
                matrix[this.y][this.x] = 0
        
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == newx && grassEaterArr[i].y == newy) {
                        grassEaterArr.splice(i, 1)
                    }
                }
                this.x = newx
                this.y = newy
                this.energy += 2
                if (this.energy >= 15) {
                    this.mul()
                }
            }
            else if (moretastyfood) {
                let newx = moretastyfood[0]
                let newy = moretastyfood[1]
                matrix[newy][newx] = 3
                matrix[this.y][this.x] = 0
                for (var i in manArr) {
                    if (manArr[i].x == newx && manArr[i].y == newy) {
                        manArr.splice(i, 1)
                    }
                }
                this.x = newx
                this.y = newy
                this.energy += 5
                if (this.energy >= 15) {
                    this.mul()
                }
            }
            
        } else {
            this.move()
        }
        
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1)
            }
        }
    }

}