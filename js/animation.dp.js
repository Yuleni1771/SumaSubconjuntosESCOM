const dp = document.getElementById('dp');
const table = document.getElementById('table');
const range = document.getElementById('range');
const play = document.getElementById('play');
const restart = document.getElementById('restart');

const newTimeline = () =>
  anime.timeline({
    autoplay: false,
    update: () => {
      range.value = timeline.progress;
      if (timeline.progress > 99.75) timeline.pause();
    },
    complete: () => {
      timeline.seek(0.01);
      timeline.play();
      timeline.pause();
    },
  });

let timeline = newTimeline();

let subset = [];
let boxes = [];

range.addEventListener('input', () => {
  if (!timeline.paused) timeline.pause();
  if (timeline.paused) timeline.seek(timeline.duration * (range.value / 100));
});

play.addEventListener('click', () => {
  if (timeline.paused) timeline.play();
  else timeline.pause();
});

restart.addEventListener('click', () => {
  timeline.pause();
  timeline.seek(0.01);
  timeline.play();
});

function isSubsetSumDP(set, n, sum) {
  subset = new Array(sum + 1);

  for (let i = 0; i < sum + 1; i++) {
    subset[i] = new Array(sum + 1);
  }

  // If sum is 0, then answer is true
  for (let i = 0; i <= n; i++) {
    subset[0][i] = true;
    animationUpdateText(boxes[i + 1][1], subset[0][i], 150);
  }

  // If sum is not 0 and set is empty,
  // then answer is false
  for (let i = 1; i <= sum; i++) {
    subset[i][0] = false;
    animationUpdateText(boxes[1][i + 1], subset[i][1], 150);
  }

  for (let i = 1; i <= sum; i++) {
    for (let j = 1; j <= n; j++) {
      subset[i][j] = !!subset[i][j - 1];
      animationHighlight(boxes[j][i + 1], boxes[j + 1][i + 1]);
      animationUpdateText(boxes[j + 1][i + 1], !!subset[i][j]);
      if (i >= set[j - 1]) {
        subset[i][j] = !!subset[i][j] || !!subset[i - set[j - 1]][j - 1];
        animationRes(j, i + 1, i - set[j - 1] + 1);
        animationHighlight(boxes[j][i - set[j - 1] + 1], boxes[j + 1][i + 1]);
        animationUpdateText(boxes[j + 1][i + 1], !!subset[i][j]);
      }
    }
  }
  // timeline.play();
  // return subset[sum][n];
}

function createTable(n, sum, set) {
  table.textContent = '';
  timeline = newTimeline();
  set = [0, ...set];

  createHeader(sum);
  for (let i = 0; i <= n; i++) {
    let tr = document.createElement('tr');
    boxes[i + 1] = [];
    for (let j = -1; j <= sum; j++) {
      let td = document.createElement('td');
      let div = document.createElement('div');
      div.textContent = j === -1 ? set[i] : '';
      div.className = 'el';
      td.appendChild(div);
      boxes[i + 1][j + 1] = div;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  if (sum <= 20) animationTable(n, sum);
}

function createHeader(sum) {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  let div = document.createElement('div');
  div.className = 'el';
  td.appendChild(div);
  tr.appendChild(td);
  boxes[0] = [];
  boxes[0][0] = div;
  for (let i = 0; i <= sum; i++) {
    let td = document.createElement('td');
    let div = document.createElement('div');
    div.textContent = i;
    div.className = 'el';
    td.appendChild(div);
    tr.appendChild(td);
    boxes[0][i + 1] = div;
  }

  table.appendChild(tr);
}

function setData(value) {
  return value ? '✔️' : '❌';
}

const animationRes = (x, y, n) => {
  let temp = [];
  let color = '#BCECF0';
  temp = boxes[x].slice(n, y + 1);

  timeline.add({
    targets: temp,
    backgroundColor: ['#fff', `${color}`, '#fff'],
    boxShadow: [
      `0 0 0px ${color}, 0 0 0px ${color}, 0 0 0px ${color},0 0 0px ${color}, 0 0 0px ${color}`,
      `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color},0 0 80px ${color}, 0 0 120px ${color}`,
      `0 0 0px ${color}, 0 0 0px ${color}, 0 0 0px ${color},0 0 0px ${color}, 0 0 0px ${color}`,
    ],
    duration: 1250,
    delay: anime.stagger(100),
  });
};

const animationUpdateText = (box, value, duration = 500) => {
  box.dataset.value = 0;
  let data = box.dataset;

  // console.log(value);
  timeline.add({
    targets: [data, box],
    value: { value: 1, round: 1 },
    // scale: ['100%', '0.1%', '100%'],
    fontSize: [0, 24],
    duration,
    update: (anim) => {
      box.textContent =
        anim.animatables[0].target.value == 1 ? setData(value) : '';
      // console.log(anim.animatables[0].target.value == 1);
    },
  });
};

const animationHighlight = (box, check) => {
  let elem1 = getOffset(box);
  let elem2 = getOffset(check);
  timeline.add({
    begin: () => {
      check.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    },
    targets: box,
    translateX: [0, elem2.left - elem1.left, 0],
    translateY: [0, elem2.top - elem1.top, 0],
    zIndex: {
      value: 10000,
      round: 1,
    },
    duration: 1000,
  });
};

const animationTable = (m, n) => {
  timeline.add({
    targets: '.table .el',
    scale: [0, 1],
    delay: anime.stagger(200, { grid: [n + 2, m + 2], from: 'center' }),
  });
};

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
