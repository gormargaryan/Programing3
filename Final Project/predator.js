module.exports = class Predator extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 10
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
        var empty = random(this.chooseCell(0))
        this.energy -= 2
        if (empty) {
            var newx = empty[0]
            var newy = empty[1]
            matrix[newy][newx] = 3
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
    }
    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 15) {
            var newx = empty[0]
            var newy = empty[1]
            matrix[newy][newx] = 3;
            var newpd = new Predator(newx, newy, 3)
            predatorarr.push(newpd)
        }
    }
    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            var newx = food[0]
            var newy = food[1]
            matrix[newy][newx] = 3
            matrix[this.y][this.x] = 0

            for (var i in xotakerarr) {
                if (xotakerarr[i].x == newx && xotakerarr[i].y == newy) {
                    xotakerarr.splice(i, 1)
                }
            }
            this.x = newx
            this.y = newy
            this.energy += 2
        }
        var moretastyfood = random(this.chooseCell(4))
        if (moretastyfood) {
            var newx = moretastyfood[0]
            var newy = moretastyfood[1]
            matrix[newy][newx] = 3
            matrix[this.y][this.x] = 0
            for (var i in manarr) {
                if (manarr[i].x == newx && manarr[i].y == newy) {
                    manarr.splice(i, 1)
                }
            }
            this.x = newx
            this.y = newy
            this.energy += 5
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in predatorarr) {
                if (predatorarr[i].x == this.x && predatorarr[i].y == this.y) {
                    predatorarr.splice(i, 1)
                }
            }
        }
    }

}