// GOD 5
var LiveForm = require('./LiveForm.js')
var random = require("./random");
var Man = require("./Man.js")


module.exports = class God extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 100;
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
        this.energy -= 5
        if (newCell) {
            let newx = newCell[0]
            let newy = newCell[1]
            matrix[newy][newx] = 5
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
            console.log("god's moving");
        }
        if (this.energy <= 0) {
            this.disappear()
        }
    }
    create() {
        // var man = random(this.chooseCell(0))
        
        
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (newCell) { // - man
            let x = newCell[0]
            let y = newCell[1]
            matrix[y][x] = 4
            manArr.push(new Man(x, y))
            manHashiv++
            this.energy += 6
            // console.log("god's on");
        } else {
            this.move()
        }
    }
    disappear() {
        matrix[this.y][this.x] = 0
        for (var i in godArr) {
            if (godArr[i].x == this.x && godArr[i].y == this.y) {
                godArr.splice(i, 1)
            }
        }
    }
}
