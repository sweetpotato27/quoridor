class Square {
    constructor(x, y) {
        this.walls = {
            North: false,
            East: false,
            South: false,
            West: false
        }
        this.x = x;
        this.y = y; 
        this.player = "empty";
        this.model = "noone"
    }

    getNorth() {
        return this.walls.North;
    }
    getEast() {
        return this.walls.East;
    }
    getSouth() {
        return this.walls.South;
    }
    getWest() {
        return this.walls.West;
    }

    setNorth(bool) {
        bool ? this.walls.North = bool : this.walls.North = !bool;
    }
    setEast(bool) {
        bool ? this.walls.East = bool : this.walls.East = !bool;
    }
    setSouth(bool) {
        bool ? this.walls.South = bool : this.walls.South = !bool;
    }
    setWest(bool) {
        bool ? this.walls.West = bool : this.walls.West = !bool;
    }
}

module.exports = Square;