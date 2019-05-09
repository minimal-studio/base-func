# 订阅发布 EventEmitter

```js
import { EventEmitter, EventEmitterClass } from 'basic-helper';
// EventEmitter 为内置的对象
// 可以重新构造一个
const eventEmitter = new EventEmitterClass();

// 简写 Alias
eventEmitter.on('event', callback) === eventEmitter.subscribe('event', callback)
eventEmitter.rm('event', callback) === eventEmitter.unsubscribe('event', callback)

// 新增执行次数 execTime, 如果为 0，则为无限次
eventEmitter.on('event', callback, execTime = 0);

// 新增只绑定一次的 api once
eventEmitter.once('event', callback) === eventEmitter.on('event', callback, execTime = 1) === eventEmitter.subscribe('event', callback, 1)

```

可以继承 EventEmitterClass ，实现异步事件监听

```js
import { EventEmitterClass } from 'basic-helper';

class Demo extends EventEmitterClass {
  onRes() {
    this.emit('res', {something});
  }
}
Demo.on('res', (resConfig) => {
  
});
```