let stack = new Stack();
const container = document.getElementById('stack');

const createBlock = (data) => {
  let block = document.createElement('div');
  block.textContent = data;
  block.className = 'block';
  container.appendChild(block);

  return block;
};

const insertStack = (data) => {
  let item = stack.push(data);
  insert(item);
};

const insert = (item) => {
  let block = createBlock(item.data);
  item.domElement = block;
  tl.add({
    begin: () => {
      block.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    },
    targets: block,
    duration: 500,
    width: '90%',
    height: 60,
    translateX: [-500, 0],
  });
};

const removeStack = (widthDelay) => {
  let item = stack.pop();

  if (widthDelay) tl.add({ duration: 250 });

  tl.add({
    targets: item.domElement,
    translateY: 500,
    duration: 500,
  }).add({
    begin: () => {
      if (item.left !== null)
        item.left.domElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
    },
    targets: item.domElement,
    duration: 10,
    width: 0,
    height: 0,
    margin: 0,
  });
};

const clearBlocks = () => {
  container.textContent = '';
  stack = new Stack();
};

const AnimationStack = {
  insertStack,
  removeStack,
};
