const eles = document.getElementById('eles');
const header = document.getElementById('header');
const main = document.getElementById('main');
const form = document.getElementById('form');
const inputValues = document.getElementById('input');
const inputSum = document.getElementById('sum');
const toggle = document.getElementById('toggle');

let flagToggle = false;

let set = [];
// let set = [3, 34, 4, 12, 5, 2];
let sum = 9;
// let n = set.length;

toggle.addEventListener('click', () => {
  if (!flagToggle) {
    anime
      .timeline({
        targets: header,
        height: ['25%', '0%'],
        duration: 250,
        easing: 'linear',
      })
      .add({
        targets: main,
        duration: 250,
        height: ['75%', '100%'],
        easing: 'linear',
      });
    flagToggle = true;
  } else {
    anime({
      targets: header,
      height: '25%',
      duration: 250,
      easing: 'linear',
    });

    anime({
      targets: main,
      duration: 250,
      height: '75%',
      easing: 'linear',
    });
    flagToggle = false;
  }
});

const createBox = (data) => {
  let box = document.createElement('div');
  box.className = 'box';
  box.textContent = data;
  eles.appendChild(box);
  return box;
};

const createTarget = (data) => {
  let target = document.createElement('div');
  target.className = 'target';
  target.textContent = data;
  eles.appendChild(target);
  return target;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (inputSum.value === '' || inputValues.value === '') {
    alert('No ingreso valores');
    return;
  }

  set = [];
  eles.textContent = '';

  inputValues.value.split(',').map((e) => {
    set.push(+e);
    createBox(+e);
  });

  let elem = createTarget(+inputSum.value);

  anime({
    targets: ['.box', elem],
    duration: 500,
    translateY: [-500, 0],
    autoplay: true,
    delay: anime.stagger(100),
  });

  sum = +inputSum.value;

  createTable(set.length, sum, set);

  isSubsetSumDP(set, set.length, sum);

  inputSum.value = '';
  inputValues.value = '';
});
