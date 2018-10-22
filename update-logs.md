# Basic Helper

## update logs

---------

### v1.4.2

- 新增一个 Call 的 Api，用于执行方法

```js
import { Call } from 'basic-helper';
Call(func[, args]);
```

---------

### v1.4.*

- 优化 eventEmitter 模块的机制，新增以下 API

```js
import { EventEmitter } from 'basic-helper';
const eventEmitter = new EventEmitter();

// 简写 Alias
eventEmitter.on('event', callback) === eventEmitter.subscribe('event', callback)
eventEmitter.rm('event', callback) === eventEmitter.unsubscribe('event', callback)

// 新增执行次数 execTime, 如果为 0，则为无限次
eventEmitter.on('event', callback, execTime = 0);

// 新增只绑定一次的 api once
eventEmitter.once('event', callback) === eventEmitter.on('event', callback, execTime = 1) === eventEmitter.subscribe('event', callback, 1)
```

---------

### v1.3.*

- defineGlobalObj 更名为 defineGlobalScope

---------

### v1.2.4

删除几个业务相关的 API

- GetDisplayRate
- GetDisplayRateNumber
- RateNumberToRate

---------

### v1.2.*

1. 提供 defineGlobalObj 接口, 用于注册挂载在 window 中的作用域

---------

### v1.1.*

1. 修改全局方法的命名规则，只设置一个全局的 $GH 对象，里面挂靠对应的方法
2. 提供一个 $GH.registe(newVal) API, 可以向 $GH 对象注册对应的内容
