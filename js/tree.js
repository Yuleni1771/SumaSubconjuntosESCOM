class Node {
  constructor(id, data, parent) {
    this.id = id;
    (this.data = data), (this.left = this.right = null);
    this.parent = parent;

    this.offset = 0;
    this.direction = 0;
    this.position = {
      x: getCenterX('tree'),
      y: initY,
    };
    this.isSub;
  }
}

class Tree {
  constructor() {
    this.countNodes = 0;
    this.root = null;
  }

  insert(data, root = this.root) {
    if (root !== null) {
      let p = root;
      for (;;)
        if (data < p.data) {
          if (p.left === null) {
            this.countNodes++;
            p.left = new Node(this.countNodes, data, p);
            return p.left;
          } else p = p.left;
        } else {
          if (p.right === null) {
            this.countNodes++;
            p.right = new Node(this.countNodes, data, p);
            return p.right;
          } else p = p.right;
        }
    } else {
      this.root = new Node(this.countNodes, data, null);
      return this.root;
    }
  }

  delete(root, node) {
    if (root.left === node) root.left = null;
    if (root.right === node) root.right = null;
  }

  preOrder(node = this.root, arr = []) {
    arr.push(node);
    if (node.left !== null) this.recorrer(node.left, arr);
    if (node.right !== null) this.recorrer(node.right, arr);
  }

  adjustPositionNodes(node = this.root, nodeExceptionId) {
    if (nodeExceptionId !== node.id) Animation.AdjustTree(node);
    if (node.left !== null)
      this.adjustPositionNodes(node.left, nodeExceptionId);
    if (node.right !== null)
      this.adjustPositionNodes(node.right, nodeExceptionId);
  }

  adjustNodes(node = this.root) {
    // console.log(node.data);
    if (node.right == null && node.left == null) {
      return [2, 1];
    }
    if (node.right == null) {
      const [n, x] = this.adjustNodes(node.left);
      // console.log(`Node ${node.data} n: ${n} x: ${x}`);
      const u = 2;
      // console.log(`Next: ${n + Math.floor(u / 2)}`);
      node.left.offset = Math.floor((n - x - 1) / 2);
      node.left.direction = -1;
      return [n + u, n + Math.floor(u / 2)];
    }
    if (node.left == null) {
      const [n, x] = this.adjustNodes(node.right);
      // console.log(`Node ${node.data} n: ${n} x: ${x}`);
      const u = 2;
      // console.log(`Next: ${Math.floor(u / 2)}`);
      node.right.offset = Math.floor(x / 2);
      node.right.direction = 1;
      return [n + u, Math.floor(u / 2)];
    }

    const [n, x] = this.adjustNodes(node.left);
    const [m, y] = this.adjustNodes(node.right);
    // console.log(`Node ${node.data} n: ${n} x: ${x}`);
    // console.log(`Node ${node.data} m: ${m} y: ${y}`);
    const u = 2;

    node.left.offset = Math.floor((n - x - 1) / 2);
    node.left.direction = -1;
    node.right.offset = Math.floor(y / 2);
    node.right.direction = 1;
    // console.log(`Next: ${n + Math.floor(u / 2)}`);
    return [n + m + u, n + Math.floor(u / 2)];
  }
}
