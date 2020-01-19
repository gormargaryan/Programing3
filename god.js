// GOD 5
class God {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
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
    chooseCell(character) {
        this.getNewDirections()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
