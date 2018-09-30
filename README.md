# Basic Helper

[![Build Status](https://travis-ci.com/SANGET/basic-helper-js.svg?branch=master)](https://travis-ci.com/SANGET/basic-helper-js)
[![install size](https://packagephobia.now.sh/badge?p=basic-helper)](https://packagephobia.now.sh/result?p=basic-helper)

基础语义化辅助函数，提供一些基础的、通用的数据处理等方法，提供定义全局作用域的方法

引入即可获取内置的 $GH 函数，所有的内置函数都挂在在 $GH 对象下

- 处理时间
- 处理数字格式
- 常用的判断函数，例如 IsFunc, IsObj, IsPhone 等
- 保持浏览器端的 localStorage 与 React Native 的 AyncStoage 兼容的 window.Storage 接口
- 提供定义全局作用域的方式

## 安装

```shell
npm i basic-helper --save
```

## 订阅发布 EventEmitter

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

## 辅助函数

- TODO: 完善使用说明
- [参考源码](./src/basic.js)

## 作用域 scope

- 通过 *defineGlobalScope* 定义全局作用域
- 已定义的作用域，只能通过特定的接口 *registe* 来覆盖之前的定义
- 作用域挂载在 *window* 或者 *global* 下
- 作用于命名建议使用 *$* 前缀，并且全大写的英文

### 例如

```js
import {defineGlobalScope} from 'basic-helper';

const GlobalObj = {
  test: () => {
    console.log('test')
  }
};

// 作用域定义后便可以使用 $SCOPE 或者 window.$SCPOE，可以使用 registe 方法更改作用域中的值
defineGlobalScope('$SCOPE', GlobalObj);

$SCOPE.test(); // 输出 test

$SCOPE.test = () => {
  console.log('change test');
}
$SCOPE.name = 'name'; // 设置无效

$SCOPE.test(); // 还是输出 test，上面的更改无效


// 修改方式，确保作用域的正确
$SCOPE.registe({
  test: () => {
    console.log('change test 3th')
  },
  name: 'name'
});
```
