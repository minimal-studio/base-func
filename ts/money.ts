import { GetFloatLen, ToFixed } from './number';

/**
 * 默认的金额格式化时的基准单位，应用于 MoneyFormat()，默认为毫 10000
 * 1 元
 * 10 角
 * 100 分
 * 1000 厘
 * 10000 毫
 */
const BASIC_UNIT = 10000;

/**
 * 金额格式化时的基准单位，应用于 MoneyFormat()，默认为毫 10000
 * 1 元
 * 10 角
 * 100 分
 * 1000 厘
 * 10000 毫
 */
let basicUnit = BASIC_UNIT;

/**
 * 设置 basicUnit
 *
 * @param {number} unit 基准单位
 * @return {void}
 */
export function SetBasicUnit(unit) {
  basicUnit = unit;
}

/**
 * 获取 basicUnit
 *
 * @return {number}
 */
export function GetBasicUnit() {
  return basicUnit;
}

/**
 * 把数字转化成以 basicUnit 为基准的整数
 *
 * @param {number} money 目标数字
 * @return {number}
 */
export function ToBasicUnitMoney(money) {
  money = (`${money}`).replace(/,/g, '');
  money = +money;
  if (typeof money !== 'number') return money || '';
  return ToFixed(money * basicUnit, GetFloatLen());
}

/**
 * 把数字格式化成金钱格式，并且会除以 basicUnit ，转换成基准单位
 *
 * @param {number | string} money 目标数字
 * @param {number} [logMark=GetFloatLen()] 格式化后的小数点长度
 * @param {number} [_basicUnit=basicUnit] 基础单位
 * @return {string}
 */
export function MoneyFormat(money, logMark = GetFloatLen(), _basicUnit = basicUnit) {
  money = +money;
  if (typeof money !== 'number') return money || '';
  const isNegNum = money < 0;
  const moneyYuan = +(money / _basicUnit) || 0;
  let [moneyInt, moneyFloor] = ToFixed(moneyYuan * 1, logMark, true).toString().split('.');
  moneyInt = Math.abs(moneyInt);
  moneyInt = moneyInt.toLocaleString('en-US');
  if (moneyFloor) moneyInt += `.${moneyFloor}`;
  return isNegNum ? `-${moneyInt}` : moneyInt;
}

/**
 * 格式化金钱单位
 *
 * @param {number} [cost=0] 金额
 * @param {string} [unit=['yuan' | 'jiao' | 'fen' | 'li']] 单位
 * @return {string}
 */
export function UnitFormat(cost = 0, unit = 'yuan') {
  const UNITS = {
    yuan: 1,
    jiao: 10,
    fen: 100,
    li: 1000,
    hao: 10000,
  };
  return ToFixed(cost / UNITS[unit]);
}
