const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let intervalId = null;
let intervalStatus = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBodyBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

refs.btnStart.addEventListener('click', onStartClick);

function onStartClick() {
  if (intervalStatus) {
    return;
  }
  intervalId = setInterval(() => {
    changeBodyBgColor();
  }, 1000);
  intervalStatus = true;
}
refs.btnStop.addEventListener('click', onStopClick);

function onStopClick() {
  clearInterval(intervalId);
  intervalStatus = false;
}
