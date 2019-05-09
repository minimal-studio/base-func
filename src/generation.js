/**
 * 生成唯一ID
 * @return {string}
 */
export function UUID() {
  const max = 10000;
  const min = 1;
  const idLen = 9;
  const originID = (Date.now() + '' + (Math.floor(Math.random() * (max - min + 1) + min)));
  let newID = originID.split('').reverse();
  let result = newID.slice(0, idLen).join('');
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
  let _numb = +(numb);
  return (isNeedPrefix && _numb < 10) ? `0${_numb}` : _numb + '';
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
  let isNeedPrefix = numberRange[1] >= 10;
  let numberRangeArr = [];
  for (let _offset = numberRange[0]; _offset <= numberRange[1]; _offset++) {
    numberRangeArr.push(WrapNumbPrefix(_offset, isNeedPrefix));
  }
  return numberRangeArr;
}

/**
 * 根据传入的随机数范围生成随机数
 *
 * @param {array} [numberRange=[start, end]] 期望随机数的范围
 * @return {number}
 */
export function Random(numberRange) {
  let [start, end] = numberRange;
  return Math.floor(Math.random() * (end + 1)) + start;
}