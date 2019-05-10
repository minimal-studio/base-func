## Storage

与 React Native 的 Storage 行为一致的 web localStorage 实现，并且带有数据过期销毁功能

```js
import Storage from 'basic-helper/storage';

Storage.setItem('ITEM_NAME', { data })
Storage.getItem('ITEM_NAME', (res) => { })
Storage.removeItem('ITEM_NAME')
```