class ListItem {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.left = this.right = null;
    this.domElement = null;
  }
}

class Stack {
  constructor() {
    this.countItems = 0;
    this.head = null;
  }

  push(data) {
    if (this.head == null) {
      this.countItems++;
      return (this.head = new ListItem(this.countItems, data));
    }

    this.countItems++;
    let item = new ListItem(this.countItems, data);

    item.left = this.head;
    this.head.right = item;
    this.head = item;

    return item;
  }

  pop() {
    if (this.head === null) return null;
    let p = this.head.left;
    let item = this.head;
    this.head.left == null;
    this.head = p;
    return item;
  }

  display() {
    for (let p = this.head; p !== null; p = p.left) console.warn(p.data);
  }
}
