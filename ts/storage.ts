import { Call } from './call';

/**
 * localStorage 的兼容接口，与 React Native 的 AyncStoage 的相同
 */
const Storage = {
  getItem(itemName, callback, timeout = false) {
    const timestampName = `${itemName}_TIMER`;
    const prevTimer = +(localStorage.getItem(timestampName));
    const today = Date.now();
    let result = null;
    if (!!timeout && !!timestampName && (today - prevTimer) / 1000 > timeout) {
      localStorage.removeItem(itemName);
    } else {
      result = localStorage.getItem(itemName);
    }
    Call(callback, null, result);
    return result;
  },
  setItem(itemName, value) {
    const timestampName = `${itemName}_TIMER`;
    const _value = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(itemName, _value);
    localStorage.setItem(timestampName, Date.now().toString());
  },
  removeItem(itemName) {
    localStorage.removeItem(itemName);
  }
};

export default Storage;
// if(window && window.localStorage) {
//   window.Storage.getItem = function(itemName, callback, timeout = false) {
//     let timestampName = itemName + '_TIMER';
//     let prevTimer = +(localStorage.getItem(timestampName));
//     let today = Date.now();
//     let result = null;
//     if (!!timeout && !!timestampName && (today - prevTimer) / 1000 > timeout) {
//       localStorage.removeItem(itemName);
//     } else {
//       result = localStorage.getItem(itemName);
//     }
//     Call(callback, null, result);
//     return result;
//   };
//   window.Storage.setItem = function(itemName, value) {
//     let timestampName = itemName + '_TIMER';
//     let _value = typeof value === 'string' ? value : JSON.stringify(value);
//     localStorage.setItem(itemName, _value);
//     localStorage.setItem(timestampName, Date.now().toString());
//   };
//   window.Storage.removeItem = function(itemName) {
//     localStorage.removeItem(itemName);
//   };
// }
