// GOD 5
class God extends LivingCreature {
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
        var empty = random(this.chooseCell(0))
        this.energy -= 5
        if (empty) {
            var newx = empty[0]
            var newy = empty[1]
            matrix[newy][newx] = 5
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
    }
    create() {
        var man = random(this.chooseCell(0))

        if (man) { // - man
            var x = man[0]
            var y = man[1]
            matrix[y][x] = 4
            manarr.push(new Man(x, y))
            this.energy += 6
        }
    }
    disappear() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in godarr) {
                if (godarr[i].x == this.x && godarr[i].y == this.y) {
                    godarr.splice(i, 1)
                }
            }
        }
    }
}
