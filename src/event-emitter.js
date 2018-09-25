/**
 * 订阅发布模块
 * 
 * 使用
 * const eventEmitter = new EventEmitterClass();
 *
 * subscribe 事件
 * eventEmitter.subscribe('LOGIN_SUCCESS', (emitObj) => {
 *   console.log(emitObj);
 * }, execTime = 0);
 *
 * Emit 事件
 * eventEmitter.emit('LOGIN_SUCCESS', {
 *   desc: '发送描述'
 * });
 *
 * unsubscribe 事件
 * eventEmitter.unsubscribe('LOGIN_SUCCESS', function() {});
 */
import { CallFunc, IsFunc, RemoveArrayItem } from './basic';

export default class EventEmitterClass {
  constructor() {
    /**
     * 结构
     * {
     *   'eventName': [
     *     {
     *       handle: function,
     *       executed: 0, // 已执行次数
     *       execTime: 0  // 预期执行次数，0 为无限次
     *     }
     *   ]
     * }
     */
    this.subscribeList = {};
  }
  on() {
    this.subscribe.apply(this, arguments);
  }
  rm() {
    this.unsubscribe.apply(this, arguments);
  }
  once() {
    this.subscribe.apply(this, [...arguments, 1]);
  }
  checkFuncIsExist(eventName, func) {
    return this.subscribeList[eventName].indexOf(func) != -1;
  }
  subscribe(eventName, func, execTime = 0) {
    if(!func) return console.warn('func is required');

    let subObj = this.subscribeList[eventName];
    if(!subObj) this.subscribeList[eventName] = [];
    Object.assign(func, {
      execTime, executed: 0
    });
    this.subscribeList[eventName].push(func);
  }
  unsubscribe(eventName, func) {
    if(!this.subscribeList[eventName]) return;
    if(this.checkFuncIsExist(eventName, func)) {
      this.subscribeList[eventName] = RemoveArrayItem(this.subscribeList[eventName], func);
    }
  }
  emit(eventName, emitObj) {
    let currSubList = this.subscribeList[eventName] || [];
    for (var i = 0; i < currSubList.length; i++) {
      if(IsFunc(currSubList[i])) {
        currSubList[i].executed += 1;
        let { execTime, executed } = currSubList[i];
        if(execTime !== 0 && executed === execTime) {
          this.unsubscribe(eventName, currSubList[i]);
        }
      }
      CallFunc(currSubList[i])(emitObj);
    }
  }
}
