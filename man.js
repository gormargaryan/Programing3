// MAN 4
class Man {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
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
        this.energy -= 3
        if (empty) {
            var newx = empty[0]
            var newy = empty[1]
            matrix[newy][newx] = 4
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
            matrix[newy][newx] = 4;
            var newmn = new Man(newx, newy, 4)
            manarr.push(newmn)
        }
    }
    eat() {
        var xk = random(this.chooseCell(2))
        var veg = random(this.chooseCell(1))

        if (xk) { // - xotaker
            var newx = xk[0]
            var newy = xk[1]
            matrix[newy][newx] = 4
            matrix[this.y][this.x] = 0

            for (var i in xotakerarr) {
                if (xotakerarr[i].x == newx && xotakerarr[i].y == newy) {
                    xotakerarr.splice(i, 1)
                }
            }
            this.x = newx
            this.y = newy
            this.energy += 4
        }

        else if (veg) { // - grass
            var newx = veg[0]
            var newy = veg[1]
            matrix[newy][newx] = 4
            matrix[this.y][this.x] = 0

            for (var i in grassarr) {
                if (grassarr[i].x == newx && grassarr[i].y == newy) {
                    grassarr.splice(i, 1)
                }
            }
            this.x = newx
            this.y = newy
            this.energy += 2
        }
    }
    create() {
        var emp = random(this.chooseCell(0))

        if (emp && this.energy >= 15) { // - man
            var x = emp[0]
            var y = emp[1]
            matrix[y][x] = 1
            grassarr.push(new Grass(x, y))
            // var zm = new Zombie(newx,newy)
            // zombarr.push(zm)
            // for (var i in manarr) {
            //     if (manarr[i].x == x && manarr[i].y == y) {
            //         manarr.push(new Man(newx,newy))
            //     }
            // }
            // this.x = newx
            // this.y = newy
        }
    }
    die() {
        if (this.energy <= -50) {
            matrix[this.y][this.x] = 0
            for (var i in manarr) {
                if (manarr[i].x == this.x && manarr[i].y == this.y) {
                    manarr.splice(i, 1)
                }
            }
        }
    }
}