const range = document.getElementById('range');
const play = document.getElementById('play');
const restart = document.getElementById('restart');

let bts = new Tree();
let cy = treeGraph();
let durationAnim = 1000;
let durationExtra = 250;

let tl = anime.timeline({
  autoplay: false,
  loop: false,
  direction: 'alternate',
  easing: 'linear',
  update: () => {
    range.value = tl.progress;
    if (tl.progress > 99.75) tl.pause();
    cy.fit(cy.$('node'), 20);
  },
  complete: () => {
    tl.seek(0.01);
    tl.play();
    tl.pause();
    cy.fit(cy.$('node'), 20);
  },
});

const newTimeline = () => {
  tl = anime.timeline({
    autoplay: false,
    loop: false,
    direction: 'alternate',
    easing: 'linear',
    update: () => {
      range.value = tl.progress;
      if (tl.progress > 99.9) tl.pause();
      cy.fit(cy.elements(), 20);
    },
    complete: () => {
      tl.seek(0.01);
      tl.play();
      tl.pause();
      cy.fit(cy.$('node'), 20);
    },
  });
};

const clearNodes = () => {
  cy.elements().remove();
  bts = new Tree();
};

range.addEventListener('input', () => {
  if (!tl.paused) tl.pause();
  if (tl.paused) tl.seek(tl.duration * (range.value / 100));
});

play.addEventListener('click', () => {
  if (tl.paused) tl.play();
  else tl.pause();
});

restart.addEventListener('click', () => {
  tl.pause();
  tl.seek(0.01);
  tl.play();
});

function insertNewNode(node) {
  drawNewNode(node);
  bts.adjustNodes();
  bts.adjustPositionNodes(bts.root, node.id);
  TranslateNewNode(node, node.id);
}

function TranslateNewNode(node) {
  adjustPosition(node);
  let temp = cy.$id(`${node.id}`);
  let postionObj = temp.position();
  let styleObj = temp.style();

  if (node.parent !== null) {
    let edge = cy.add({
      group: 'edges',
      data: {
        id: `n${node.id}${node.parent.id}`,
        source: `${node.parent.id}`,
        target: `${node.id}`,
      },
    });

    let edgeStyleObj = edge.style();

    tl.add({
      targets: edgeStyleObj,
      opacity: 1,
      duration: 200,
      update: (anim) => {
        edge.style('opacity', anim.animatables[0].target.opacity);
      },
    });
  }

  tl.add({
    targets: [postionObj, styleObj],
    x: node.position.x,
    y: node.position.y,
    opacity: {
      duration: 250,
      value: 1,
    },
    duration: durationAnim,
    update: (anim) => {
      temp.position(anim.animatables[0].target);
      temp.style('opacity', anim.animatables[1].target.opacity);
    },
  });
}

function deleteNode(node) {
  node.position = node.parent !== null ? node.parent.position : node.position;

  let temp = cy.$id(`${node.id}`);
  let positionObj = temp.position();

  tl.add({
    targets: positionObj,
    duration: 1000,
    x: node.position.x,
    y: node.position.y,
    update: (anim) => {
      temp.position({
        x: anim.animatables[0].target.x,
        y: anim.animatables[0].target.y,
      });
    },
  });

  deleteNodeAux(node);
}

function deleteNodeAux(node) {
  let parent, styleObjParent;
  let temp = cy.$id(`${node.id}`);
  let styleObj = temp.style();
  if (node.parent !== null) {
    parent = cy.$id(`n${node.id}${node.parent.id}`);
    styleObjParent = parent.style();
  }

  tl.add({
    targets: styleObj,
    duration: 250,
    fontSize: 0,
    width: 0.0001,
    height: 0.0001,
    update: (anim) => {
      temp.style('width', anim.animatables[0].target.width);
      temp.style('height', anim.animatables[0].target.height);
      temp.style('fontSize', anim.animatables[0].target.fontSize);
    },
  });

  if (node.parent !== null)
    tl.add({
      targets: styleObjParent,
      duration: 10,
      width: 0.00001,
      height: 0.00001,
      update: (anim) => {
        parent.style('width', anim.animatables[0].target.width);
        parent.style('height', anim.animatables[0].target.height);
      },
    });

  bts.delete(node.parent, node);

  let positionObj = temp.position();
  node.position = { x: getCenterX('tree'), y: initY };

  tl.add({
    targets: positionObj,
    duration: 250,
    x: node.position.x,
    y: node.position.y,
    update: (anim) => {
      temp.position({
        x: anim.animatables[0].target.x,
        y: anim.animatables[0].target.y,
      });
    },
  });
}

function AdjustTree(node) {
  let tmp = cy.$id(`${node.id}`);
  let positionObj = tmp.position();
  adjustPosition(node);
  if (comparePoints(tmp.position(), node.position)) return;
  tl.add({
    targets: positionObj,
    x: node.position.x,
    y: node.position.y,
    duration: durationExtra,
    update: (anim) => {
      tmp.position(anim.animatables[0].target);
    },
  });
}

function drawNewNode(node) {
  cy.add({
    group: 'nodes',
    data: {
      id: `${node.id}`,
      label: `${node.data}`,
      aux: 10,
    },
    position: {
      x: getCenterX('tree'),
      y: initY,
    },
  });
}

function delay() {
  tl.add({
    duration: 1000,
  });
}

function insertNode(data, root) {
  return bts.insert(data, root);
}

function removeNode(root, node) {
  bts.delete(root, node);
}

function comparePoints(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

function editData(node, value) {
  let temp = cy.$id(`${node.id}`).data();
  tl.add({
    targets: temp,
    aux: 0,
    duration: 400,
    update: (anim) => {
      let str = value ? '✔️' : '❌';
      if (anim.animatables[0].target.aux < 6)
        cy.$(`#${node.id}`).data('label', str);
      else cy.$(`#${node.id}`).data('label', node.data);
    },
  });
}

const Animation = {
  insertNewNode,
  deleteNode,
  AdjustTree,
  insertNode,
  removeNode,
  delay,
  editData,
};
