/**
 * 辅助单位
 */

let basicFloatLen = 4;
let floatLen = basicFloatLen;
let basicUnit = 10000;
let runingBasicUnit = basicUnit;

export function GetFloatLen() {
  return floatLen;
}

export function SetFloatLen(len) {
  let _len = parseInt(len);
  if(!_len || _len < 0 || _len > 5) return;
  floatLen = len;
}

export function SetBasicUnit(val) {
  runingBasicUnit = val;
}

export function GetBasicUnit() {
  return runingBasicUnit;
}

export function ToFixed(currNumb, limit = floatLen, isStr = false) {
  let numb = +currNumb || 0;
  let numbStr = isStr ? numb.toFixed(6) : numb.toString();
  let [_int, _float] = numbStr.split('.');
  if (_float) {
    _float = _float.substr(0, limit);
    numb = `${_int}.${_float}`;
  }
  return isStr ? numb : + numb;
}

export function MoneyFormat(money, logMark = floatLen, _basicUnit = basicUnit) {
  money = +money;
  if (typeof money !== 'number') return money || '';
  let isNegNum = /-/.test(money);
  let moneyYuan = +(money / _basicUnit) || 0;
  let [moneyInt, moneyFloor] = ToFixed(moneyYuan * 1, logMark, true).toString().split('.');
  moneyInt = Math.abs(moneyInt) + '';
  let _moneyArr = moneyInt.split('');
  let formoted = [];
  _moneyArr.reverse().forEach((unit, idx) => {
    if (idx % 3 === 0 && idx !== 0) {
      unit += ',';
    }
    formoted.push(unit);
  });
  let result = formoted.reverse().join('');
  if (moneyFloor) result += '.' + moneyFloor;
  return isNegNum ? '-' + result : result;
}

export function ToBasicUnitMoney(money) {
  money = +money;
  if (typeof money !== 'number') return money || '';
  return ToFixed(money * runingBasicUnit, basicFloatLen);
}

export function ToggleBasicFloatLen() {
  floatLen = floatLen == 4 ? 0 : 4;
  let isDisplay = floatLen == 4;
  return isDisplay;
}

export function StripScript(s) {
  return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

export function IsUrl(url) {
  let exp = new RegExp(/(http(s)?:)?\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
  return exp.test(url);
}

export function IsFunc(func) {
  return typeof func === 'function';
}
export function CallFunc(func) {
  // return typeof func === 'function';
  return IsFunc(func) ? func : () => {};
}

/**
 * 生成唯一ID
 * @return {String}
 */
export function GenerteID() {
  const max = 10000;
  const min = 1;
  const idLen = 9;
  const originID = (Date.now() + '' + (Math.floor(Math.random() * (max - min + 1) + min)));
  let newID = originID.split('').reverse();
  let result = newID.slice(0, idLen).join('');
  return result;
}

export function Random(numberRange) {
  let [start, end] = numberRange;
  return Math.floor(Math.random() * (end + 1)) + start;
}

export function BoolFilter(boolNum) {
  return !!boolNum;
}

export function InArr(arr, item) {
  if (!arr || !item) return false;
  return arr.indexOf(item) > -1;
}

/**
 * 删除数组中相同项
 * @param  {array} arr
 * @param  {string, number, boolean} item
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
 * 判断是否有值
 */
export function HasValue(val) {
  if (typeof val === 'undefined' || val === null || val === '') return false;
  return true;
}

/**
 * 判断是否有值
 */
export function IsObj(obj) {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}

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
 * @param  {[type]} dateStringInRange [description]
 * @return {[type]}                   [description]
 */
export function DateParseHook(dateStringInRange) {
  if (!dateStringInRange) return dateStringInRange;
  let resDateStr = dateStringInRange + '+0000';
  let date = new Date(resDateStr);
  if (date == 'Invalid Date') date = new Date(resDateStr.replace(/-/g, '/'));
  return date;
}

export function IsEmail(val) {
  let mail_reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  return mail_reg.test(val);

}
export function IsPhoneNumber(val) {
  let phone_reg = /^1[3|4|5|7|8][0-9]{9}$/;
  return phone_reg.test(val);
}

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

export function WrapNumbPrefix(numb, isNeedPrefix = false) {
  let _numb = +(numb);
  return (isNeedPrefix && _numb < 10) ? `0${_numb}` : _numb + '';
}

export function GenerateNumberRange(numberRange) {
  let isNeedPrefix = numberRange[1] >= 10;
  let numberRangeArr = [];
  for (let _offset = numberRange[0]; _offset <= numberRange[1]; _offset++) {
    numberRangeArr.push(WrapNumbPrefix(_offset, isNeedPrefix));
  }
  return numberRangeArr;
}

if(window && window.localStorage) {
  /**
   * localStorage 的兼容接口，与 React Native 的 AyncStoage 的相同
   */
  window.Storage.getItem = function(itemName, callback, timeout = false) {
    let timestampName = itemName + '_TIMER';
    let prevTimer = +(localStorage.getItem(timestampName));
    let today = Date.now();
    let result = null;
    if (!!timeout && !!timestampName && (today - prevTimer) / 1000 > timeout) {
      localStorage.removeItem(itemName);
    } else {
      result = localStorage.getItem(itemName);
    }
    CallFunc(callback)(null, result);
    return result;
  };
  window.Storage.setItem = function(itemName, value) {
    let timestampName = itemName + '_TIMER';
    let _value = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(itemName, _value);
    localStorage.setItem(timestampName, Date.now().toString());
  };
  window.Storage.removeItem = function(itemName) {
    localStorage.removeItem(itemName);
  };
}
