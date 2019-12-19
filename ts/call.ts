import { IsFunc } from './filter';

/**
 * 检查输入是否为函数，并返回一个一定可以调用的函数
 *
 * @param {function} func
 * @return {function}
 */
export function CallFunc(func: any): Function {
  // return typeof func === 'function';
  return IsFunc(func) ? func : () => {};
}

/**
 * 检查输入是否为函数，如果是，则直接调用，把从（包含）第二个参数起的所有参数传入到该函数中
 */
export function Call(...args: any[]): void {
  const [func, ..._arguments] = args;
  return IsFunc(func) && func.apply(this, _arguments);
}
