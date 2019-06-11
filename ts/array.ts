/**
 * 删除数组中相同项
 * @param  {array} arr
 * @param  {string | number | boolean} item
 * @return {array}
 */
export function RemoveArrayItem(arr: [], item: any) {
  const nextArr = [].concat(arr);
  const itemIdx = nextArr.indexOf(item);
  if (itemIdx !== -1) {
    nextArr.splice(itemIdx, 1);
  }
  return nextArr;
}

interface DeduplicationObj {
  [item: string]: any;
}

/**
 * 拓展 Array 功能，实现数组去重
 */
function deduplication() {
  const arr: [] = this;
  const deduplicationObj: DeduplicationObj = {};
  for (let i = 0; i < arr.length; i++) {
    const currItem = arr[i];
    if (!deduplicationObj.hasOwnProperty(currItem)) {
      deduplicationObj[currItem] = null;
    }
  }
  return Object.keys(deduplicationObj);
}

Array.prototype.deduplication = deduplication;

Array.prototype.remove = function (targetItem: any) {
  return RemoveArrayItem(this, targetItem);
};
