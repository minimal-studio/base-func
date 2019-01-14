/**
 * 作者: Alex
 * 注册全局可用的基础的 Helper 方法
 */

import NumTransformToCN from './num-to-cn';
// import { DateRange, GetDefaultDateInfo, DateFormat, TimeFormat } from './datetime-helper';
import * as DateHelper from './datetime-helper';
import EventEmitterClass from './event-emitter';
import * as GlobabHelper from './basic';
import DebounceClass from './debounce';

export const EventEmitter = new EventEmitterClass();

/**
* 注册一个 $GH 的全局对象 (Global Helper)
*/
export const GlobalHelper = Object.assign({}, GlobabHelper, {
  // DateRange,
  // GetDefaultDateInfo,
  // TimeFormat,
  // DateFormat,
  ...DateHelper,
  NumTransformToCN,
  Debounce: DebounceClass,
  EventEmitterClass: EventEmitterClass,
  EventEmitter: EventEmitter,
});

let GlobalObjectMapper = {};
export function defineGlobalObj(name, obj) {
  return console.warn('defineGlobalObj has been rename to defineGlobalScope');
}
export function defineGlobalScope(name, obj) {
  let nameMark = `__IsSet${name}`;
  if(!window || window[nameMark]) return;
  
  GlobalObjectMapper[name] = obj;
  
  Object.assign(GlobalObjectMapper[name], {
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
defineGlobalScope('$GH', GlobalHelper);

export {
  EventEmitterClass, DebounceClass,
  // GetDefaultDateInfo, DateFormat, TimeFormat,
  NumTransformToCN
};

export * from './datetime-helper';
