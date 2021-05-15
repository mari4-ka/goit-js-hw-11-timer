"use strict"

const refs = {
  clockface: document.querySelector('#timer-1'),
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
}

class CountdownTimer {

  constructor({selector, targetDate}) {
    this.intervalID = null;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  intervalID = setInterval(() => {
    const currentTime = Date.now();
    console.log(currentTime);
    const deltaTime = this.targetDate.getTime() - currentTime;
    console.log(deltaTime)
    this.getTimeComponents(deltaTime);
  }, 1000);

  pad(value) {
    return String(value).padStart(2, '0');
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),);
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
  }


  timerFinished(time) {
    if (time < 0) {
      clearInterval(this.setInterval);
      refs.clockface.textContent = "Timer is finished";
    }
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});  