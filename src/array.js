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