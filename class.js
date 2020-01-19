class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }
}


class Grass extends LivingCreature {
    mult() {
        var empty = random(this.chooseCell(0))
        this.multiply++
        if (empty && this.multiply > 3) {
            var newx = empty[0]
            var newy = empty[1]
            matrix[newy][newx] = 1;
            var newg = new Grass(newx, newy, 1)
            grassarr.push(newg)
            this.multiply = 0
        }
    }
}

class Xotaker extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 4;
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
    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 7) {
            var newx = empty[0]
            var newy = empty[1]
            matrix[newy][newx] = 2;
            var newxt = new Xotaker(newx, newy, 2)
            xotakerarr.push(newxt)
        }
    }
    move() {
        var empty = random(this.chooseCell(0))
        this.energy--
        if (empty) {
            var newx = empty[0]
            var newy = empty[1]
            matrix[newy][newx] = 2
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
    }
    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            var newx = food[0]
            var newy = food[1]
            matrix[newy][newx] = 2
            matrix[this.y][this.x] = 0

            for (var i in grassarr) {
                if (grassarr[i].x == newx && grassarr[i].y == newy) {
                    grassarr.splice(i, 1)
                }
            }
            this.x = newx
            this.y = newy
            this.energy++
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in xotakerarr) {
                if (xotakerarr[i].x == this.x && xotakerarr[i].y == this.y) {
                    xotakerarr.splice(i, 1)
                }
            }
        }
    }
}
class Predator extends LivingCreature{
    // constructor(x, y, index) {
    //     this.x = x;
    //     this.y = y;
    //     this.index = index;
    //     this.energy = 10;
    //     this.directions = [
    //         [this.x - 1, this.y - 1],
    //         [this.x, this.y - 1],
    //         [this.x + 1, this.y - 1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x - 1, this.y + 1],
    //         [this.x, this.y + 1],
    //         [this.x + 1, this.y + 1]
    //     ];
    // }
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
