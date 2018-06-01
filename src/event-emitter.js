import {CallFunc, RemoveArrayItem} from './basic';

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
export default class EventEmitterClass {
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
      this.subscribeList[eventName] = RemoveArrayItem(this.subscribeList[eventName], func);
    }
  }
  emit(eventName, emitObj) {
    let currSubList = this.subscribeList[eventName] || [];
    for (var i = 0; i < currSubList.length; i++) {
      CallFunc(currSubList[i])(emitObj);
    }
  }
}
