import { Call } from './basic';

(function(factory) {
  if (typeof module !== 'undefined') {
    // factory();
  } else {
    factory();
  }
}(function() {
  /**
   * localStorage 的兼容接口，与 React Native 的 AyncStoage 的相同
   */
  if(window && window.localStorage) {
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
      Call(callback, null, result);
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
}));