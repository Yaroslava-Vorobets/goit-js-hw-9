
import'../css/common.css'

const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')
let timerId = null;   

startBtn.addEventListener("click",() => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }, 1000)
    startBtn.disabled = true
    stopBtn.disabled = false
    
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    stopBtn.disabled = true
     startBtn.disabled= false
})


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}




