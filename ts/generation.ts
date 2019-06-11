import { ToFixed } from './number';

/**
 * 生成唯一ID
 * @return {string}
 */
export function UUID(idLen = 9) {
  const max = 10000;
  const min = 1;
  const originID = (`${Date.now()}${Math.floor(Math.random() * (max - min + 1) + min)}`);
  const newID = originID.split('').reverse();
  const result = newID.slice(0, idLen).join('');
  return result;
}

/**
 * @ignore
 */
export function GenerteID() {
  return UUID.apply(this, arguments);
}

/**
 * 为不大于 10 的数字前面补 0
 *
 * @param {*} numb
 * @param {boolean} [isNeedPrefix=false]
 * @return {string}
 */
export function WrapNumbPrefix(numb, isNeedPrefix = false) {
  const _numb = +(numb);
  return (isNeedPrefix && _numb < 10) ? `0${_numb}` : `${_numb}`;
}

/**
 * 根据输入的数字范围生成对应的整数数字数组
 *
 * @example
 * GenerateNumberRange([1, 5]) => [1, 2, 3, 4, 5];
 *
 * @param {array} numberRange 期望生成的范围
 * @return {array}
 */
export function GenerateNumberRange(numberRange) {
  const isNeedPrefix = numberRange[1] >= 10;
  const numberRangeArr = [];
  for (let _offset = numberRange[0]; _offset <= numberRange[1]; _offset++) {
    numberRangeArr.push(WrapNumbPrefix(_offset, isNeedPrefix));
  }
  return numberRangeArr;
}

/**
 * 根据传入的随机数范围生成随机数
 *
 * @param {array} [numberRange=[start, end]] 期望随机数的范围
 * @param {number} [floatLen=0] 随机数的浮点位数
 * @return {number}
 */
export function Random(numberRange, floatLen = 0) {
  const [start, end] = numberRange;
  return ToFixed((Math.random() * end) + start, floatLen);
}
