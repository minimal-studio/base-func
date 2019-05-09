import { RemoveArrayItem } from './array';

/**
 * 拓展 String 原型，加入马赛克功能
 */
String.prototype.Mosaics = function(unseelen = 3, mark = '*') {
  let str = this;
  unseelen = str.length - unseelen;
  let result = '';
  str.split('').map((str, idx) => {
    let _str = idx < unseelen ? mark : str;
    result += _str;
  }).join('');
  return result;
};

/**
 * 拓展 Array 功能，实现数组去重
 */
Array.prototype.deduplication = function() {
  let arr = this;
  let deduplicationObj = {};
  for (let i = 0; i < arr.length; i++) {
    let currItem = arr[i];
    if (!deduplicationObj.hasOwnProperty(currItem)) {
      deduplicationObj[currItem] = null;
    }
  }
  return Object.keys(deduplicationObj);
};

Array.prototype.remove = function (targetItem) {
  return RemoveArrayItem(this, targetItem);
};