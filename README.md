## Basic Helper
#### 全局基础函数

## update logs

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
2. 提供一个 GH.RegisteGlobalHelper(newVal) API, 可以向 $GH 对象注册对应的内容
