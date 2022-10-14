import '../css/common.css'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const timerRef = document.querySelector('.timer')
const input = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')

const selectedDates = []
 let endTime = null;
const options = {  
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    endTime = selectedDates[0].getTime()
    if (endTime <= Date.now()) {
      startBtn.disabled = true
      Notify.failure("Please choose a date in the future", (notifyOptions = {
        width: 200,
        clickToClose: true,
        backOverlay: true
      }))
    } else if (endTime > Date.now()) {
      startBtn.disabled = false     
    }           
  }   
  }
  startBtn.disabled = true
 

flatpickr('#datetime-picker', options)
const timer = {
  intervald: null,
  refs: {
    timerdays: document.querySelector('[data-days]'),
    timerhours: document.querySelector('[data-hours]'),
    timerminutes: document.querySelector('[data-minutes]'),
    timerseconds: document.querySelector('[data-seconds]')
  },
  start() {
    this.intervalId= setInterval(() => {
      if (endTime < Date.now()) {
        clearInterval(this.intervalId);
        console.log('time is up');
      } else {
      const diff = endTime - Date.now();
      const { days, hours, minutes, seconds } = convertMs(diff)
      this.refs.timerdays.textContent = addLeadinZero(days);
      this.refs.timerhours.textContent = addLeadinZero(hours);
      this.refs.timerminutes.textContent = addLeadinZero(minutes);
      this.refs.timerseconds.textContent = addLeadinZero(seconds);
      startBtn.disabled = true
      }
   },1000)
  },
};
startBtn.addEventListener('click', () => {
  timer.start()
} )
function   addLeadinZero(value) {
  return String(value).padStart(2, '0');
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