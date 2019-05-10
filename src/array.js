/**
 * 删除数组中相同项
 * @param  {array} arr
 * @param  {string | number | boolean} item
 * @return {array}
 */
export function RemoveArrayItem(arr, item) {
  let nextArr = [].concat(arr);
  let itemIdx = nextArr.indexOf(item);
  if (itemIdx !== -1) {
    nextArr.splice(itemIdx, 1);
  }
  return nextArr;
}

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