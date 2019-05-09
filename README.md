# Basic Helper

[![Build Status](https://travis-ci.com/SANGET/basic-helper-js.svg?branch=master)](https://travis-ci.com/SANGET/basic-helper-js)
[![install size](https://packagephobia.now.sh/badge?p=basic-helper)](https://packagephobia.now.sh/result?p=basic-helper)

basic-helper 是一个语义化辅助函数库，提供一些基础通用的数据处理函数。

## 安装

```shell
yarn add basic-helper
```

## 使用

### 通用

```js
import { Call } from 'basic-helper';

Call((args1, args2) => {}, args1, args2);
```

### 按需引用

`basic-helper` 的辅助函数按照一定的规则进行了分类，可以按需引入

```js
// 默认引入
import { RemoveArrayItem } from 'basic-helper/array';
import { Call, CallFunc } from 'basic-helper/call';
import { DateFormat, ToUTC, TimeFormat, DateRange } from 'basic-helper/datetime-helper';
import DebounceClass from 'basic-helper/debounce';
import EventEmitterClass from 'basic-helper/event-emitter';
import { 
  StripScript, IsUrl, IsFunc, IsObj, IsEmail,
  IsPhoneNumber, IsPhone, BoolFilter, InArr, HasValue
} from 'basic-helper/filter';
import { UUID, WrapNumbPrefix, GenerateNumberRange, Random } from 'basic-helper/generation';
import { SetBasicUnit, GetBasicUnit, ToBasicUnitMoney, MoneyFormat, UnitFormat } from 'basic-helper/money';
import { GetFloatLen, SetFloatLen, ToFixed, ToggleBasicFloatLen } from 'basic-helper/number';
import 'basic-helper/js-expansion';

// 需要指定引入
import cookies from 'basic-helper/cookies';
import Storage from 'basic-helper/storage';
import numTransformToCN from 'basic-helper/num-to-cn';
```

## 更多扩展

- [订阅发布](./docs/event.md)
- [防抖函数](./docs/debounce.md)
- [本地数据存储](./docs/storage.md)
- [全局注册](./docs/registe.md)