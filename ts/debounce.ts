import { IsFunc } from './filter';

/**
 * 防抖函数
 *
 * @example
 * // 构造一个防抖函数
 * const debounce = new DebounceClass();
 *
 * // 在 200ms 之内重复调用该函数，最终只会在最后一次调用的 200ms 后执行 exec 中的回调
 * debounce.exec(() => {
 *  ...yourCode
 * }, 200);
 *
 * // 取消防抖
 * debounce.cancel();
 */
class DebounceClass {
  callback!: Function

  delay!: number;

  timer!: number;

  constructor(fn: Function, delay = 100) {
    if (IsFunc(fn)) {
      this.callback = fn;
      this.delay = delay;
    }
  }

  exec = (fn: Function, delay = 100) => {
    if (IsFunc(fn)) {
      this.callback = fn;
      this.delay = delay;
    }
    this._clearTimer();
    this._exec();
  }

  _exec = () => {
    const { callback, delay } = this;
    this.timer = setTimeout(callback, delay);
  }

  cancel() {
    this._clearTimer();
  }

  _clearTimer() {
    if (this.timer) clearTimeout(this.timer);
  }
}
export default DebounceClass;
