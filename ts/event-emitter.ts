// import { CallFunc, IsFunc, RemoveArrayItem } from './basic';
import { CallFunc } from './call';
import { IsFunc } from './filter';
import { RemoveArrayItem } from './array';

/**
 * 订阅发布模块
 *
 * @example
 * // 使用 basic helper 提供的内置全局 EventEmitter 对象
 * import { EventEmitter } from 'basic-helper';
 *
 * // 或者自定义一个全新的对象
 * const _EventEmitter = new EventEmitterClass();
 *
 * const callback = () => {};
 *
 * // 订阅: on, 参数说明 (eventName, callback, execTime)
 * // eventName: 订阅的事件的名字
 * // callback:  事件被触发后执行的回调
 * // execTime:  监听该事件的次数，0 为无限
 * EventEmitter.on('LOGIN_SUCCESS', callback, execTime = 0);
 *
 * // 广播: emit
 * // 第二个参数为广播内容，会作为对应事件中的回调中的参数
 * EventEmitter.emit('LOGIN_SUCCESS', {
 *   desc: '发送描述'
 * });
 *
 * // 删除订阅的事件
 * EventEmitter.rm('LOGIN_SUCCESS', callback);
 */

export type SubscriptFunction = Function;

export interface SubscribeList {
  [SubscribeItemName: string]: SubscriptFunction[];
}

class EventEmitterClass {
  subscribeList!: SubscribeList;

  constructor() {
    this.subscribeList = {};
  }

  on(...args: any[]) {
    this.subscribe.apply(this, [...args]);
  }

  rm(...args: any[]) {
    this.unsubscribe.apply(this, [...args]);
  }

  once(...args: any[]) {
    this.subscribe.apply(this, [...args, 1]);
  }

  checkFuncIsExist(eventName: string, func: Function) {
    return this.subscribeList[eventName].indexOf(func) !== -1;
  }

  subscribe(eventName: string, func: Function, execTime = 0): void {
    if (!func) return console.warn('func is required');

    const subObj = this.subscribeList[eventName];
    if (!subObj) this.subscribeList[eventName] = [];
    Object.assign(func, {
      execTime, executed: 0
    });
    this.subscribeList[eventName].push(func);
  }

  unsubscribe(eventName: string, func: Function) {
    if (!this.subscribeList[eventName]) return;
    if (this.checkFuncIsExist(eventName, func)) {
      this.subscribeList[eventName] = RemoveArrayItem(this.subscribeList[eventName], func);
    }
  }

  emit(eventName: string, emitObj: any) {
    const currSubList = this.subscribeList[eventName] || [];
    for (let i = 0; i < currSubList.length; i++) {
      if (IsFunc(currSubList[i])) {
        currSubList[i].executed += 1;
        const { execTime, executed } = currSubList[i];
        if (execTime !== 0 && executed === execTime) {
          this.unsubscribe(eventName, currSubList[i]);
        }
      }
      CallFunc(currSubList[i])(emitObj);
    }
  }
}

const EventEmitter = new EventEmitterClass();

export { EventEmitter };
export default EventEmitterClass;
