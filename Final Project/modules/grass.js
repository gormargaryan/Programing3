module.exports = class Grass extends LivingCreature {
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