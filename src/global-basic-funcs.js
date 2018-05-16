/**
 * 作者: Alex
 * 注册全局可用的基础的 Helper 方法
 */

import numTransformToCN from './num-to-cn';
import {getDefaultDateInfo, dateFormat, timeFormat} from './datetime-helper';

let basicFloatLen = 4;
let floatLen = basicFloatLen;
let basicUnit = 10000;
let runingBasicUnit = basicUnit;

export function getFloatLen() {
  return floatLen;
}

export function setFloatLen(len) {
  let _len = parseInt(len);
  if(!_len || _len < 0 || _len > 5) return;
  floatLen = len;
}

export function setBasicUnit(val) {
  runingBasicUnit = val;
}

export function getBasicUnit(val) {
  return runingBasicUnit;
}

export function toFixed(currNumb, limit = floatLen, isStr = false) {
  let numb = +currNumb || 0;
  let numbStr = isStr ? numb.toFixed(6) : numb.toString();
  let [_int, _float] = numbStr.split('.');
  if (!!_float) {
    _float = _float.substr(0, limit);
    numb = `${_int}.${_float}`;
  }
  return isStr ? numb : + numb;
}

export function moneyFormat(money, logMark = floatLen, _basicUnit = basicUnit) {
  money = +money;
  if (typeof money !== 'number') return money || '';
  let isNegNum = /-/.test(money);
  let moneyYuan = +(money / _basicUnit) || 0;
  let [moneyInt, moneyFloor] = toFixed(moneyYuan * 1, logMark, true).toString().split('.');
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
  if (!!moneyFloor) result += '.' + moneyFloor;
  return isNegNum ? '-' + result : result;
}

export function toBasicUnitMoney(money) {
  money = +money;
  if (typeof money !== 'number') return money || '';
  return toFixed(money * runingBasicUnit, basicFloatLen);
}

export function toggleBasicFloatLen() {
  floatLen = floatLen == 4 ? 0 : 4;
  let isDisplay = floatLen == 4;
  return isDisplay;
}

export function stripScript(s) {
  return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

export function isUrl(url) {
  let exp = new RegExp(/(http(s)?:)?\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
  return exp.test(url);
}

export function isFunc(func) {
  return typeof func === 'function';
}
export function callFunc(func) {
  // return typeof func === 'function';
  return isFunc(func) ? func : () => {};
}

/**
 * 生成唯一ID
 * @return {String}
 */
export function generteID() {
  const max = 10000;
  const min = 1;
  const idLen = 9;
  const originID = (Date.now() + '' + (Math.floor(Math.random() * (max - min + 1) + min)));
  let newID = originID.split('').reverse();
  let result = newID.slice(0, idLen).join('');
  return result;
}

export function random(numberRange) {
  let [start, end] = numberRange;
  return Math.floor(Math.random() * (end + 1)) + start;
}

export function boolFilter(boolNum) {
  return !!boolNum;
}

export function inArr(arr, item) {
  if (!arr || !item) return false;
  return arr.indexOf(item) > -1;
}

/**
 * 删除数组中相同项
 * @param  {array} arr
 * @param  {string, number, boolean} item
 * @return {array}
 */
export function removeArrayItem(arr, item) {
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
export function hasValue(val) {
  if (typeof val === 'undefined' || val === null || val === '') return false;
  return true;
}

/**
 * 判断是否有值
 */
export function isObj(obj) {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}

export function unitFormat(cost = 0, unit = 'yuan') {
  const UNITS = {
    yuan: 1,
    jiao: 10,
    fen: 100,
    li: 1000
  };
  return toFixed(cost / UNITS[unit]);
}

/**
 * 兼容浏览器对时间格式的认知
 * @param  {[type]} dateStringInRange [description]
 * @return {[type]}                   [description]
 */
export function dateParseHook(dateStringInRange) {
  if (!dateStringInRange) return dateStringInRange;
  let resDateStr = dateStringInRange + '+0000';
  let date = new Date(resDateStr);
  if (date == 'Invalid Date') date = new Date(resDateStr.replace(/-/g, '/'));
  return date;
}

function isEmail(val) {
  let mail_reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  return mail_reg.test(val);

}
function isPhoneNumber(val) {
  let phone_reg = /^1[3|4|5|7|8][0-9]{9}$/;
  return phone_reg.test(val);
}

/**
 * 防抖
 */
export class DebounceClass {
  constructor(fn, delay = 100) {
    if(isFunc(fn)) {
      this.callback = fn;
      this.delay = delay;
    }
  }
  exec(fn, delay = 100) {
    if(isFunc(fn)) {
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

/**
 * 与 document.addEventListener 用法类似，但不依赖 document
 *
 * 用法
 *
 * Create
 * const eventEmitter = new EventEmitterClass();
 *
 * Subscribe
 * eventEmitter.subscribe('LOGIN_SUCCESS', (emitObj) => {
 *   console.log(emitObj);
 * });
 *
 * Emit
 * eventEmitter.emit('LOGIN_SUCCESS', {
 *   desc: '发送描述'
 * });
 *
 * unsubscribe
 * eventEmitter.unsubscribe('LOGIN_SUCCESS', function() {});
 */
export class EventEmitterClass {
  constructor() {
    this.subscribeList = {};
  }
  checkFuncIsExist(eventName, func) {
    return this.subscribeList[eventName].indexOf(func)
  }
  subscribe(eventName, func) {
    let subObj = this.subscribeList[eventName];
    if(!subObj) this.subscribeList[eventName] = [];
    this.subscribeList[eventName].push(func);
  }
  unsubscribe(eventName, func) {
    if(!this.subscribeList[eventName]) return;
    if(this.checkFuncIsExist(eventName, func) != -1) {
      this.subscribeList[eventName] = removeArrayItem(this.subscribeList[eventName], func);
    }
  }
  emit(eventName, emitObj) {
    let currSubList = this.subscribeList[eventName] || [];
    for (var i = 0; i < currSubList.length; i++) {
      callFunc(currSubList[i])(emitObj);
    }
  }
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
}

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
}

if(window.localStorage) {
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
    callFunc(callback)(null, result);
    return result;
  }
  window.Storage.setItem = function(itemName, value) {
    let timestampName = itemName + '_TIMER';
    let _value = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(itemName, _value);
    localStorage.setItem(timestampName, Date.now().toString());
  }
  window.Storage.removeItem = function(itemName) {
    localStorage.removeItem(itemName);
  }
}

export function wrapNumbPrefix(numb, isNeedPrefix = false) {
  let _numb = +(numb);
  return (isNeedPrefix && _numb < 10) ? `0${_numb}` : _numb + '';
}

export function generateNumberRange(numberRange) {
  let isNeedPrefix = numberRange[1] >= 10;
  let numberRangeArr = [];
  for (let _offset = numberRange[0]; _offset <= numberRange[1]; _offset++) {
    numberRangeArr.push(wrapNumbPrefix(_offset, isNeedPrefix));
  }
  return numberRangeArr;
}

export function registeGlobalHelper(val) {
  Object.assign(GlobalHelper, val);
}

export const EventEmitter = new EventEmitterClass();

/**
* 注册一个 $GH 的全局对象 (Global Helper)
*/
export let GlobalHelper = {
  // FLOAT_LEN: floatLen,
  BASIC_UNIT: basicUnit,
  GetFloatLen: getFloatLen,
  SetFloatLen: setFloatLen,
  SetBasicUnit: setBasicUnit,
  ToggleBasicFloatLen: toggleBasicFloatLen,
  ToFixed: toFixed,
  WrapNumbPrefix: wrapNumbPrefix,
  GenerateNumberRange: generateNumberRange,
  UnitFormat: unitFormat,
  MoneyFormat: moneyFormat,
  ToBasicUnitMoney: toBasicUnitMoney,
  StripScript: stripScript,
  IsPhoneNumber: isPhoneNumber,
  IsEmail: isEmail,
  IsUrl: isUrl,
  IsFunc: isFunc,
  InArr: inArr,
  IsObj: isObj,
  CallFunc: callFunc,
  GenerteID: generteID,
  Random: random,
  BoolFilter: boolFilter,
  RemoveArrayItem: removeArrayItem,
  HasValue: hasValue,
  DateParseHook: dateParseHook,
  GetDefaultDateInfo: getDefaultDateInfo,
  NumTransformToCN: numTransformToCN,
  TimeFormat: timeFormat,
  DateFormat: dateFormat,
  Debounce: DebounceClass,
  RegisteGlobalHelper: registeGlobalHelper,
  EventEmitterClass: EventEmitterClass,
  EventEmitter: EventEmitter,
};

let GlobalObjectMapper = {};
export function defineGlobalObj(name, obj) {
  let nameMark = `__IsSet${name}`;
  if(window[nameMark]) return;
  GlobalObjectMapper[name] = obj;
  let finalObj = Object.assign(GlobalObjectMapper[name], {
    registe: registeObj => {
      Object.assign(GlobalObjectMapper[name], registeObj);
    }
  });

  Object.defineProperties(window, {
    [name]: {
      get() {
        return Object.assign({}, GlobalObjectMapper[name]);
      },
      enumerable: true,
      configurable: false,
      // writable: false
    },
    [nameMark]: {
      value: true,
      writable: false
    }
  });
}
defineGlobalObj('$GH', GlobalHelper);
