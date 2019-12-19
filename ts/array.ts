/**
 * 删除数组中相同项
 */
export function RemoveArrayItem(targetArr: any[], item: any) {
  const nextArr = [].concat(targetArr);
  const itemIdx = nextArr.indexOf(item);
  if (itemIdx !== -1) {
    nextArr.splice(itemIdx, 1);
  }
  return nextArr;
}

interface DeduplicationObj {
  [item: string]: any;
}

declare global {
  interface Array<T> {
    deduplication(): T[];
    remove(targetItem: T): T[];
  }
}

/**
 * 拓展 Array 功能，实现数组去重
 */
function deduplication() {
  const arr: [] = this;
  const deduplicationObj: DeduplicationObj = {};
  for (let i = 0; i < arr.length; i++) {
    const currItem = arr[i];
    if (!Object.prototype.hasOwnProperty.call(deduplicationObj, currItem)) {
      deduplicationObj[currItem] = null;
    }
  }
  return Object.keys(deduplicationObj);
}

function arrayRemove(targetItem: any) {
  return RemoveArrayItem(this, targetItem);
}

Array.prototype.deduplication = deduplication;
Array.prototype.remove = arrayRemove;
