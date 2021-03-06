import { ToFixed } from './number';

/**
 * 生成唯一ID
 */
export function UUID(IDLen = 9) {
  const max = 10000;
  const min = 1;
  const originID = (`${Date.now()}${Math.floor(Math.random() * (max - min + 1) + min)}`);
  const newID = originID.split('').reverse();
  const result = newID.slice(0, IDLen).join('');
  return result;
}

/**
 * @ignore
 */
export const GenerteID = UUID;

/**
 * 为不大于 10 的数字前面补 0
 */
export function WrapNumbPrefix(numb: string | number, isNeedPrefix = false) {
  const _numb = +(numb);
  return (isNeedPrefix && _numb < 10) ? `0${_numb}` : `${_numb}`;
}

/**
 * 根据输入的数字范围生成对应的整数数字数组
 *
 * @example
 * GenerateNumberRange([1, 5]) => [1, 2, 3, 4, 5];
 */
export function GenerateNumberRange(numberRange: number[]) {
  const isNeedPrefix = numberRange[1] >= 10;
  const numberRangeArr = [];
  for (let _offset = numberRange[0]; _offset <= numberRange[1]; _offset++) {
    numberRangeArr.push(WrapNumbPrefix(_offset, isNeedPrefix));
  }
  return numberRangeArr;
}

/**
 * 根据传入的随机数范围生成随机数
 */
export function Random(numberRange: number[], floatLen = 0) {
  const [start, end] = numberRange;
  return ToFixed((Math.random() * end) + start, floatLen);
}
