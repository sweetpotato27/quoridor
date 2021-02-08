function Queue() {
    this.elements = [];
}

Queue.prototype.enqueue = (e) => {
    this.elements.push(e);
};

Queue.prototype.dequeue = () => {
    return this.elements.shift();
};

Queue.prototype.isEmpty = () => {
    return this.elements.length === 0;
};

Queue.prototype.peek = () => {
    return !this.isEmpty() ? this.elements[0] : undefined;
}

Queue.prototype.length = () => {
    return this.elements.length;
}