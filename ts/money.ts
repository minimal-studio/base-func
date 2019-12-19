import { tuple } from './utils/type';
import { GetFloatLen, ToFixed } from './number';

type BASIC_UNIT_TYPE = number;

/**
 * 默认的金额格式化时的基准单位，应用于 MoneyFormat()，默认为毫 10000
 * 1 元
 * 10 角
 * 100 分
 * 1000 厘
 * 10000 毫
 */
const BASIC_UNIT: BASIC_UNIT_TYPE = 10000;

/**
 * 金额格式化时的基准单位，应用于 MoneyFormat()，默认为毫 10000
 * 1 元
 * 10 角
 * 100 分
 * 1000 厘
 * 10000 毫
 */
let basicUnit: BASIC_UNIT_TYPE = BASIC_UNIT;

/**
 * 设置 basicUnit
 *
 * @param {number} unit 基准单位
 */
export function SetBasicUnit(unit: BASIC_UNIT_TYPE) {
  basicUnit = unit;
}

/**
 * 获取 basicUnit
 *
 * @return {BASIC_UNIT_TYPE}
 */
export function GetBasicUnit(): BASIC_UNIT_TYPE {
  return basicUnit;
}

/**
 * 把数字转化成以 basicUnit 为基准的整数
 */
export function ToBasicUnitMoney(money: number): number | null {
  const moneyNum = +money.toString().replace(/,/g, '');
  if (typeof moneyNum !== 'number') return moneyNum || null;
  return +(ToFixed(moneyNum * basicUnit, GetFloatLen()));
}

/**
 * 把数字格式化成金钱格式，并且会除以 basicUnit ，转换成基准单位
 */
export function MoneyFormat(
  money: number | string, logMark = GetFloatLen(), _basicUnit = basicUnit
): string {
  const moneyNum = +money;
  // money = +money;
  if (typeof moneyNum !== 'number') return moneyNum || '';
  const isNegNum = moneyNum < 0;
  const moneyYuan = +(moneyNum / _basicUnit) || 0;
  const [_moneyInt, moneyFloor] = ToFixed(moneyYuan * 1, logMark, true).toString().split('.');
  const moneyInt = Math.abs(+_moneyInt);
  let moneyIntStr = moneyInt.toLocaleString('en-US');
  if (moneyFloor) moneyIntStr += `.${moneyFloor}`;
  return isNegNum ? `-${moneyIntStr}` : moneyIntStr;
}

const unitTypes = tuple('yuan', 'jiao', 'fen', 'li', 'hao');
type Unit = (typeof unitTypes)[number];

/**
 * 格式化金钱单位
 */
export function UnitFormat(cost = 0, unit: Unit = 'yuan'): string {
  const UNITS = {
    yuan: 1,
    jiao: 10,
    fen: 100,
    li: 1000,
    hao: 10000,
  };
  return ToFixed(cost / UNITS[unit]).toString();
}
