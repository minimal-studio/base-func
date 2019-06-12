# ChangeLogs of Basic Helper

## v3.0.0

### 新特性

- 全面支持 typescript，优化开发体验

### 旧接口移除

- DateParseHook
- GetDefaultDateInfo
- GenerteID
- Cookies

---------

## v2.0.0

### 重构项目

`./src/basic.js` 中的函数提取到单独的对应的文件中

### 升级指南

#### Storage 引用

> before

```js
import 'basic-helper';

window.Storage.getItem();
```

> now

```js
import { Storage } from 'basic-helper/storage'

Storage.getItem();
```

#### 按需引用

`basic-helper` 的辅助函数按照一定的规则进行了分类，可以按需引入

```js
import { RemoveArrayItem } from 'basic-helper/array';
import { Call, CallFunc } from 'basic-helper/call';
import cookies from 'basic-helper/cookies';
import { DateFormat, ToUTC, TimeFormat, DateRange } from 'basic-helper/datetime-helper';
import DebounceClass from 'basic-helper/debounce';
import EventEmitterClass from 'basic-helper/event-emitter';
import { StripScript, IsUrl, IsFunc, IsObj, IsEmail, IsPhoneNumber, IsPhone, BoolFilter, InArr, HasValue } from 'basic-helper/filter';
import { UUID, WrapNumbPrefix, GenerateNumberRange, Random } from 'basic-helper/generation';
import { SetBasicUnit, GetBasicUnit, ToBasicUnitMoney, MoneyFormat, UnitFormat } from 'basic-helper/money';
import { GetFloatLen, SetFloatLen, ToFixed, ToggleBasicFloatLen } from 'basic-helper/number';
import numTransformToCN from 'basic-helper/num-to-cn';
import Storage from 'basic-helper/storage';
```

### 废弃接口

```js
DateParseHook
```

---------

## v1.4.11

- 修复 ToUTC 传入空值时报错的问题

## v1.4.9

- 兼容 safari 对于时间格式的解析问题

## v1.4.8

- 调整 DateHelper 的导出配置

## v1.4.7

- 调整 DateRange 的 options

## v1.4.6

- 新增 ToUTC 时间的接口
- GetDefaultDateInfo 改名为 DateRange

## v1.4.5

- 调整 HasValue 的判断

## v1.4.2

- 新增一个 Call 的 Api，用于执行方法

```js
import { Call } from 'basic-helper';
Call(func[, args]);
```

---------

## v1.4.*

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

## v1.3.*

- defineGlobalObj 更名为 defineGlobalScope

---------

## v1.2.4

删除几个业务相关的 API

- GetDisplayRate
- GetDisplayRateNumber
- RateNumberToRate

---------

## v1.2.*

1. 提供 defineGlobalObj 接口, 用于注册挂载在 window 中的作用域

---------

## v1.1.*

1. 修改全局方法的命名规则，只设置一个全局的 $GH 对象，里面挂靠对应的方法
2. 提供一个 $GH.registe(newVal) API, 可以向 $GH 对象注册对应的内容
