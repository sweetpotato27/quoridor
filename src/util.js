export default class Util {
    constructor() {
        this.map = new Map();
    }

    trackFunctions(key) {
        if(this.map[key] === undefined) {
            this.map.set(key, 1);
            return;
        }
        if (this.map[key] === 0) {
            this.map.set(key, 1);
            return;
        }
        return;
    }

}