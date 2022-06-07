const offsetX = 50;
const offsetY = 85;
const initY = 100;

const getCenterX = (id) => {
  return Math.floor(document.getElementById(id).offsetWidth / 2);
};

function adjustPosition(node) {
  if (node.parent === null) {
    node.position = {
      x: getCenterX('tree'),
      y: initY,
    };
    return node;
  }

  node.position = {
    x:
      node.parent.position.x +
      (offsetX + node.offset * offsetX) * node.direction,
    y: node.parent.position.y + offsetY,
  };
  return node;
}
