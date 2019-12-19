# @mini-code/base-func

@mini-code/base-func 是一个语义化辅助函数库，提供通用的数据处理函数。

![Build Status](https://travis-ci.com/minimal-studio/base-func.svg?branch=master)
![coverage](https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_74.svg)
![install size](https://packagephobia.now.sh/badge?p=basic-helper)

## 安装

```shell
yarn add @mini-code/base-func
```

## 使用

### 调用不确定函数

```js
import { Call } from '@mini-code/base-func';

let func;

Call(func, args1, args2);
```

## 更多扩展

- [订阅发布](./docs/event.md)
- [本地数据存储](./docs/storage.md)
- [全局注册](./docs/registe.md)
