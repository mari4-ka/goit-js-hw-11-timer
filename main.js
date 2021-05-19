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

  renderTimer() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    const time = this.getTimeComponents(deltaTime);
    this.updateTime(time);

    if (deltaTime < 0) {
      clearInterval(this.intervalID);
      this.init();
      refs.clockface.textContent = "Timer is finished";
      return;
    }
}
  init() {
    const time = this.getTimeComponents(0);
    this.updateTime(time);
  }

  startTimer() {
    this.renderTimer();

    this.intervalID = setInterval(() => {
      this.renderTimer();
    }, 1000);
  }

  updateTime({ days, hours, mins, secs }) {
    // refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
  }
   
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),);
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs };
  }

  pad(value) {
  return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 20, 2021'),
  // targetDate: new Date('May 10, 2021'),

});

timer.startTimer();