export class TimeMagic {
  constructor(speed) {
    this.accumulateTime = -1;
    this.lastTime = -1;
    this.speed = speed;
  }

  updateTime(t) {
    if (this.accumulateTime === -1) {
      this.accumulateTime = t;
    } else {
      const deltaT = t - this.lastTime;
      this.accumulateTime += deltaT * this.speed;
    }

    this.lastTime = t;
  }

  updateSpeed(speed) {
    this.speed = speed;
  }

  getTime() {
    return this.accumulateTime;
  }
}
