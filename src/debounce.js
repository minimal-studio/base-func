import { IsFunc } from './filter';

/**
 * 防抖函数
 * 
 * @example
 * const debounce = new DebounceClass();
 * // 在 200ms 之内重复调用该函数，最终只会在最后一次调用的 200ms 后执行 exec 中的回调
 * debounce.exec(() => {
 *  ...yourCode
 * }, 200);
 * // 可以选择 cancel
 * debounce.cancel();
 */
class DebounceClass {
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
export default DebounceClass;