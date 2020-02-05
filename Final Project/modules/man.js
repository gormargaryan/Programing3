// MAN 4
var LiveForm = require('./LiveForm.js')
var random = require("./random");
var God = require("./God.js")



module.exports = class Man extends LiveForm{
    constructor(x, y) {
        super(x, y);
        this.energy = 30;
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    getNewDirections() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(ch) {
        this.getNewDirections()
        return super.chooseCell(ch)
    }
    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        this.energy -= 3
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 4
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
        if (this.energy <= -50) {
            this.die()
        }
    }
    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 4;
            let newmn = new Man(newx, newy)
            manArr.push(newmn)
            manHashiv++
        }
    }
    eat() {
        let food = random(this.chooseCell(1));
        let moretastyfood = random(this.chooseCell(2));
        if (moretastyfood || food) {
            if (moretastyfood) {
                let newx = moretastyfood[0]
                let newy = moretastyfood[1]
                matrix[newy][newx] = 4
                matrix[this.y][this.x] = 0
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == newx && grassEaterArr[i].y == newy) {
                        grassEaterArr.splice(i, 1)
                    }
                }
                this.x = newx
                this.y = newy
                this.energy += 4
                if (this.energy >= 35) {
                    this.mul()
                }
            }
            if (food) {
                let newx = food[0]
                let newy = food[1]
                matrix[newy][newx] = 4
                matrix[this.y][this.x] = 0

                for (var i in grassArr) {
                    if (grassArr[i].x == newx && grassArr[i].y == newy) {
                        grassArr.splice(i, 1)
                    }
                }
                this.x = newx
                this.y = newy
                this.energy += 1
                if (this.energy >= 15) {
                    this.mul()
                }
            }    
        } else {
            this.move()
        }

    }
    // plant() {
    //     let emptyCells = this.chooseCell(0);
    //     let newCell = random(emptyCells);
        
    //     if (newCell) {
    //         let x = newCell[0]
    //         let y = newCell[1]
    //         matrix[y][x] = 1
    //         var gr = new Grass(x, y)
    //         grassArr.push(gr)
    //         grassHashiv++
    //         this.energy -= 10
    //         // console.log("man's on");
    //     }
    // }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in manArr) {
            if (manArr[i].x == this.x && manArr[i].y == this.y) {
                manArr.splice(i, 1)
            }
        }
        if (manArr.length == 0 && manHashiv > 0) {
            matrix[this.y][this.x] = 5
            var gd = new God(this.x, this.y);
            godArr.push(gd)
            godHashiv++
        }
    }
}