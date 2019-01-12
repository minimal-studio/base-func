/**
 * 基准数字的小数点后几位，用于 MoneyFormat
 */
let basicFloatLen = 4;

/**
 * 可以设置的小数点后几位的长度
 */
let floatLen = basicFloatLen;

/**
 * 基准数字单位，10000 为毫
 */
let basicUnit = 10000;

/**
 * 可以设置的基准单位
 */
let runingBasicUnit = basicUnit;

/**
 * 获取小数点后移位数
 *
 * @return {number}
 */
export function GetFloatLen() {
  return floatLen;
}

/**
 * 设置小数点后移位数
 *
 * @param {number} len 长度
 * @return {void}
 */
export function SetFloatLen(len) {
  let _len = parseInt(len);
  if(!_len || _len < 0 || _len > 5) return;
  floatLen = len;
}

/**
 * 设置 basicUnit
 *
 * @param {number} unit 基准单位
 * @return {void}
 */
export function SetBasicUnit(unit) {
  runingBasicUnit = unit;
}

/**
 * 获取 basicUnit
 *
 * @return {number}
 */
export function GetBasicUnit() {
  return runingBasicUnit;
}

/**
 * 修正数字的小数点后多少位
 *
 * @param {number | string} targetNumber 目标数字
 * @param {number} [limit=floatLen] 小数点后的长度
 * @param {boolean} [isStr=false] 是否返回字符串
 * @return {number | string} 根据 isStr 返回调整过后的数字或者字符串
 */
export function ToFixed(targetNumber, limit = floatLen, isStr = false) {
  let numb = +targetNumber || 0;
  let numbStr = isStr ? numb.toFixed(6) : numb.toString();
  let [_int, _float] = numbStr.split('.');
  if (_float) {
    _float = _float.substr(0, limit);
    numb = `${_int}.${_float}`;
  }
  return isStr ? numb : + numb;
}

/**
 * 把数字格式化成金钱格式
 *
 * @param {number | string} money 目标数字
 * @param {number} [logMark=floatLen] 格式化后的小数点长度
 * @param {number} [_basicUnit=runingBasicUnit] 基础单位
 * @return {string}
 */
export function MoneyFormat(money, logMark = floatLen, _basicUnit = runingBasicUnit) {
  money = +money;
  if (typeof money !== 'number') return money || '';
  let isNegNum = money < 0;
  let moneyYuan = +(money / _basicUnit) || 0;
  let [moneyInt, moneyFloor] = ToFixed(moneyYuan * 1, logMark, true).toString().split('.');
  moneyInt = Math.abs(moneyInt);
  // let _moneyArr = moneyInt.split('');
  // let formoted = [];
  // _moneyArr.reverse().forEach((unit, idx) => {
  //   if (idx % 3 === 0 && idx !== 0) {
  //     unit += ',';
  //   }
  //   formoted.push(unit);
  // });
  // let result = formoted.reverse().join('');
  moneyInt = moneyInt.toLocaleString('en-US');
  if (moneyFloor) moneyInt += '.' + moneyFloor;
  return isNegNum ? '-' + moneyInt : moneyInt;
}

/**
 * 把数字转化成以 basicUnit 为基准的整数
 *
 * @param {number} money 目标数字
 * @return {number}
 */
export function ToBasicUnitMoney(money) {
  money = +money;
  if (typeof money !== 'number') return money || '';
  return ToFixed(money * runingBasicUnit, basicFloatLen);
}

/**
 * 把数字格式化的小数点隐藏
 *
 * @return {boolean} 是否隐藏了小数点
 */
export function ToggleBasicFloatLen() {
  floatLen = floatLen == 4 ? 0 : 4;
  let isDisplay = floatLen == 4;
  return isDisplay;
}

/**
 * 过滤 script 字符
 *
 * @param {string} s 目标字符串
 * @return {string} 过滤后的字符串
 */
export function StripScript(s) {
  return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

/**
 * 检查输入是否 url
 *
 * @param {string} url url
 * @return {boolean}
 */
export function IsUrl(url) {
  let exp = new RegExp(/(http(s)?:)?\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
  return exp.test(url);
}

/**
 * 检查输入是否为函数
 *
 * @param {function} func
 * @return {boolean}
 */
export function IsFunc(func) {
  return typeof func === 'function';
}

/**
 * 检查输入是否为函数，并返回一个一定可以调用的函数
 *
 * @param {function} func
 * @return {function}
 */
export function CallFunc(func) {
  // return typeof func === 'function';
  return IsFunc(func) ? func : () => {};
}

/**
 * 检查输入是否为函数，如果是，则直接调用，把从第二个参数后面的所有参数传入到第一个参数中
 *
 * @return {*} 函数执行后的结果
 */
export function Call() {
  const [func, ..._arguments] = arguments;
  return IsFunc(func) && func.apply(this, _arguments);
}

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
 * 生成随机数
 *
 * @param {array} [numberRange=[start, end]] 期望随机数的范围
 * @return {number}
 */
export function Random(numberRange) {
  let [start, end] = numberRange;
  return Math.floor(Math.random() * (end + 1)) + start;
}

/**
 * 把输入转化成 boolean
 *
 * @param {*} boolNum
 * @return {boolean}
 */
export function BoolFilter(boolNum) {
  return !!boolNum;
}

/**
 * 检查目标元素是否包含在目标数组中
 *
 * @param {array} arr 需要检查的目标数组
 * @param {any} item 目标元素
 * @return {boolean}
 */
export function InArr(arr, item) {
  if (!arr || !item) return false;
  return arr.indexOf(item) > -1;
}

/**
 * 删除数组中相同项
 * @param  {array} arr
 * @param  {string | number | boolean} item
 * @return {array}
 */
export function RemoveArrayItem(arr, item) {
  let nextArr = [].concat(arr);
  let itemIdx = nextArr.indexOf(item);
  if (itemIdx !== -1) {
    nextArr.splice(itemIdx, 1);
  }
  return nextArr;
}

/**
 * 判断是否有值，如果为 0 则返回 true，其他按照 js 的解析逻辑返回
 * 
 * @param {any}
 */
export function HasValue(val) {
  if(val === 0) return true;
  return !!val;
}

/**
 * 判断输入是否对象
 * 
 * @param {object}
 */
export function IsObj(obj) {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
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
    li: 1000
  };
  return ToFixed(cost / UNITS[unit]);
}

/**
 * 兼容浏览器对时间格式的认知
 * @param  {string} dateStringInRange
 * @return {string}                  
 */
export function DateParseHook(dateStringInRange) {
  if (!dateStringInRange) return dateStringInRange;
  let resDateStr = dateStringInRange + '+0000';
  let date = new Date(resDateStr);
  if (date == 'Invalid Date') date = new Date(resDateStr.replace(/-/g, '/'));
  return date;
}

/**
 * 判断输入是否为 Email
 *
 * @param {*} val
 * @return {boolean}
 */
export function IsEmail(val) {
  let mail_reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  return mail_reg.test(val);
}

/**
 * 判断输入是否为有效的手机号码
 *
 * @param {*} val
 * @return {boolean}
 */
export function IsPhoneNumber(val) {
  let phone_reg = /^1[3|4|5|7|8][0-9]{9}$/;
  return phone_reg.test(val);
}

/**
 * 拓展 String 原型，加入马赛克功能
 */
String.prototype.Mosaics = function(unseelen = 3, mark = '*') {
  let str = this;
  unseelen = str.length - unseelen;
  let result = '';
  str.split('').map((str, idx) => {
    let _str = idx < unseelen ? mark : str;
    result += _str;
  }).join('');
  return result;
};

/**
 * 拓展 Array 功能，实现数组去重
 */
Array.prototype.deduplication = function() {
  let arr = this;
  let deduplicationObj = {};
  for (let i = 0; i < arr.length; i++) {
    let currItem = arr[i];
    if (!deduplicationObj.hasOwnProperty(currItem)) {
      deduplicationObj[currItem] = null;
    }
  }
  return Object.keys(deduplicationObj);
};

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
