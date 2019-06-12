import { Call } from './call';

/**
 * localStorage 的兼容接口，与 React Native 的 AyncStoage 的相同
 */
const Storage = {
  getItem(itemName: string, callback?: Function, timeout?: number) {
    const timestampName = `${itemName}_TIMER`;
    const prevTimer = +(localStorage.getItem(timestampName));
    const today = Date.now();
    let result = null;
    if (!!timeout && !!timestampName && ((today - prevTimer) / 1000) > timeout) {
      localStorage.removeItem(itemName);
    } else {
      result = localStorage.getItem(itemName);
    }
    Call(callback, null, result);
    return result;
  },
  setItem(itemName: string, value: any) {
    const timestampName = `${itemName}_TIMER`;
    const _value = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(itemName, _value);
    localStorage.setItem(timestampName, Date.now().toString());
  },
  removeItem(itemName: string) {
    localStorage.removeItem(itemName);
  }
};

export default Storage;
