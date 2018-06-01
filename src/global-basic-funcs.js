/**
 * 作者: Alex
 * 注册全局可用的基础的 Helper 方法
 */

import numTransformToCN from './num-to-cn';
import {getDefaultDateInfo, dateFormat, timeFormat} from './datetime-helper';
import EventEmitterClass from './event-emitter';
import * as GlobabHelper from './basic';
import DebounceClass from './debounce';

export function registeGlobalHelper(val) {
  Object.assign(GlobalHelper, val);
}

export const EventEmitter = new EventEmitterClass();

/**
* 注册一个 $GH 的全局对象 (Global Helper)
*/
export let GlobalHelper = Object.assign({}, GlobabHelper, {
  GetDefaultDateInfo: getDefaultDateInfo,
  NumTransformToCN: numTransformToCN,
  TimeFormat: timeFormat,
  DateFormat: dateFormat,
  Debounce: DebounceClass,
  RegisteGlobalHelper: registeGlobalHelper,
  EventEmitterClass: EventEmitterClass,
  EventEmitter: EventEmitter,
});

export {
  EventEmitterClass, DebounceClass,
}

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
