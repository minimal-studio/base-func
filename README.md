## Basic Helper
#### 提供基础的数据处理函数，简单方便

### 概念

作用域 scope

使用了 *作用域* 的概念，通过 *defineGlobalScope* 方法实现，并且已定义的作用域不能任意改变
作用域挂载在 window 或者 global 下，作用于命名建议使用 *$* 前缀，并且全大写

```js
import {defineGlobalScope} from 'basic-helper';

const GlobalObj = {
  test: () => {
    console.log('test')
  }
};

defineGlobalScope('$SCOPE', GlobalObj);

$SCOPE.test(); // 输出 test

$SCOPE.test = () => {
  console.log('change test');
}
$SCOPE.name = 'name'; // 设置无效

$SCOPE.test(); // 还是输出 test，上面的更改无效
```

定义后便可以使用 $SCOPE 进行操作，并且提供 *registe* 方法更改作用域中的值

```js
// 修改方式， 确保作用域的正确
$SCOPE.registe({
  test: () => {
    console.log('change test 3th')
  },
  name: 'name'
});
```

### 用法

basic-helper 提供了一组通用的，基础的数据处理函数，详情参考 basic.js