const form = document.getElementById('form_press');
const animationContainer = document.getElementById('animation');
const myScore = document.querySelector('#myScore strong');
const totalScore = document.querySelector('#totalScore strong');

window.onload = async () => {
  const data = await getDataHandler();
  totalScore.textContent = data.total;
  form.classList.remove('dispplay');
};

const colorPaltte = ['#7209b7', '#00b4d8', '#2d00f7', '#70e000', '#ffd500', '#ff7f11', '#ff1b1c'];

let colorIndex = 0;
let myScoreValue = localStorage.getItem('my_store') ? +localStorage.getItem('my_store') : 0;

myScore.textContent = myScoreValue;
switchColor(myScoreValue);
document.documentElement.style.setProperty('--color', colorPaltte[colorIndex]);

let timer;

let sendScore = 0;

const submitHandler = (e) => {
  clearTimeout(timer);
  e.preventDefault();
  new PlusOne(colorPaltte[colorIndex], animationContainer, generateRandomIntegerInRange(0, 100000000));

  myScoreValue++;
  sendScore++;
  myScore.textContent = myScoreValue;
  totalScore.textContent = +totalScore.textContent + 1;
  switchColor(+myScore.textContent);
  document.documentElement.style.setProperty('--color', colorPaltte[colorIndex]);

  timer = setTimeout(async () => {
    localStorage.setItem('my_store', myScoreValue);
    console.log(myScoreValue);
    const result = await fetch('http://localhost:8080/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: sendScore,
      }),
    });
    sendScore = 0;
    const data = await result.json();
    totalScore.textContent = data.total;
  }, 1000);
};

function switchColor(n) {
  if (n >= 1000) {
    colorIndex = 6;
  } else if (n >= 700) {
    colorIndex = 5;
  } else if (n >= 400) {
    colorIndex = 4;
  } else if (n >= 300) {
    colorIndex = 3;
  } else if (n >= 200) {
    colorIndex = 2;
  } else if (n >= 100) {
    colorIndex = 1;
  } else {
    colorIndex = 0;
  }
}

form.addEventListener('submit', submitHandler);

async function getDataHandler() {
  const result = await fetch('http://localhost:8080/score');
  const data = await result.json();
  return data;
}
