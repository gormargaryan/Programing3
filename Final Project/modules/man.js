// MAN 4
var LiveForm = require('./LiveForm.js')
var random = require("./random");



module.exports = class Man extends LiveForm{
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
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
            let newx = empty[0]
            let newy = empty[1]
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
            let newx = empty[0]
            let newy = empty[1]
            matrix[newy][newx] = 4;
            let newmn = new Man(newx, newy, 4)
            manarr.push(newmn)
        }
    }
    eat() {
        let emptyCells2 = this.chooseCell(2);
        let emptyCells1 = this.chooseCell(1);
        if (emptyCells1 && emptyCells2) {
            let greater = random(emptyCells2)
            if (greater) {
                let newx = greater[0]
                let newy = greater[1]
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
                if (this.energy >= 20) {
                    this.plant()
                } else if (this.energy >= 15) {
                    this.mul()
                }
            }
            let gr = random(emptyCells1)
            if (gr) {
                let newx = gr[0]
                let newy = gr[1]
                matrix[newy][newx] = 4
                matrix[this.y][this.x] = 0

                for (var i in grassArr) {
                    if (grassArr[i].x == newx && grassArr[i].y == newy) {
                        grassArr.splice(i, 1)
                    }
                }
                this.x = newx
                this.y = newy
                this.energy += 2
                if (this.energy >= 20) {
                    this.plant()
                } else if (this.energy >= 15) {
                    this.mul()
                }
            }
        } else {
            this.move()
        }

    }
    plant() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0]
            let y = newCell[1]
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y))
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in manArr) {
            if (manArr[i].x == this.x && manArr[i].y == this.y) {
                manArr.splice(i, 1)
            }
        }
    }
}