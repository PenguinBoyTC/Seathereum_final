export default class Timer {
  constructor(dt) {
    this.dt = dt || 1 / 60;
    this._frame = 0;
  }
  start(update) {
    let [accumulated, last] = [0, 0];
    const _update = (time) => {
      accumulated += (time - last) / 1000;
      while (accumulated > this.dt) {
        update(this.dt);
        accumulated -= this.dt;
      }
      last = time;
      this._frame = requestAnimationFrame(_update);
    };
    this._frame = requestAnimationFrame(_update);
  }
  stop() {
    cancelAnimationFrame(this._frame);
  }
}
