import {IsFunc} from './basic';

/**
 * 防抖
 */
export default class DebounceClass {
  constructor(fn, delay = 100) {
    if(IsFunc(fn)) {
      this.callback = fn;
      this.delay = delay;
    }
  }
  exec(fn, delay = 100) {
    if(IsFunc(fn)) {
      this.callback = fn;
      this.delay = delay;
    }
    this._clearTimer();
    this._exec();
  }
  _exec() {
    const {callback, delay} = this;
    this.timer = setTimeout(callback, delay);
  }
  cancel() {
    this._clearTimer();
  }
  _clearTimer() {
    if(this.timer) clearTimeout(this.timer);
  }
}
