const refs = {
  clockface: document.querySelector('#timer-1'),
}

class CountdownTimer {

  constructor({selector, targetDate}) {
    this.intervalID = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.startTimer();
    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.updateTime(time);
  }

  startTimer() {
    this.intervalID = setInterval(() => {
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
    }, 1000);
  }

  updateTime({ days, hours, mins, secs }) {
    refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
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