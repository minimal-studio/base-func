/**
 * 作者: Alex
 * 注册全局可用的基础的 Helper 方法
 */

import * as GlobabHelper from '.';

export const GlobalHelper = Object.assign({}, GlobabHelper);
const GlobalObjectMapper: GlobalObjectMapperEntity = {};

interface GlobalObjectMapperEntity {
  [helperName: string]: any;
}

declare global {
  interface Window {
    [nameMark: string]: any;
  }
}

/**
* 注册一个 $GH 的全局对象 (Global Helper)
*/
export function defineGlobalScope(name: string, obj: any) {
  const nameMark = `__IsSet${name}`;
  if (!window || window[nameMark]) return;

  GlobalObjectMapper[name] = obj;

  Object.assign(GlobalObjectMapper[name], {
    registe: (registeObj: any) => {
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
