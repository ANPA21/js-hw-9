import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
  onChange() {
    if (
      options.defaultDate.getTime() >
      Number(selectedTime.formatDate(...selectedTime.selectedDates, 'U')) * 1000
    ) {
      return alert('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button'),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
};
refs.startBtn.disabled = true;
const selectedTime = flatpickr(refs.input, options);
let timerId = null;
let timeDif = 0;

refs.startBtn.addEventListener('click', onStartClick);
function onStartClick() {
  const selectedUnixDate =
    Number(selectedTime.formatDate(...selectedTime.selectedDates, 'U')) * 1000;
  let isTimerActivatable = true;

  if (isTimerActivatable && getCurrentUnixDate() < selectedUnixDate) {
    timerId = setInterval(() => {
      timeDif = selectedUnixDate - getCurrentUnixDate();
      updTimerValues(timeDif);
      isTimerActivatable = false;
      refs.startBtn.disabled = true;

      if (timeDif < 1000) {
        clearInterval(timerId);
        isTimerActivatable = true;
      }
    }, 500);
  }
}
function updTimerValues(timeDif) {
  refs.seconds.textContent = convertMs(timeDif).seconds;
  refs.minutes.textContent = convertMs(timeDif).minutes;
  refs.hours.textContent = convertMs(timeDif).hours;
  refs.days.textContent = convertMs(timeDif).days;
}
function getCurrentUnixDate() {
  const currentUnixDate = new Date().getTime();
  return currentUnixDate;
}
