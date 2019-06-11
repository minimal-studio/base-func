/**
 * 数字转中文
 * @type {String}
 */

const defaultNumMapper = '零壹貳叁肆伍陸柒捌玖';

export default function numTransformToCN(target, numMapper = defaultNumMapper) {
  let resultStr = '不符合规则';
  if (/\d/.test(target)) {
    // const CNNumMatrix = '零一二三四五六七八九'.split('');
    const CNNumMatrix = numMapper.split('');
    const unitMatrix = '元十百千万___亿____'.split('');
    const unitLength = unitMatrix.length;
    const [targetIntegerMatrix, targetFloorMatrix] = target.toString().split('.');
    const targetIntegerArr = targetIntegerMatrix.toString().split('');
    // const targetFloorArr = targetFloorMatrix ? targetFloorMatrix.toString().split('') : [];
    // const targetLength = targetIntegerArr.length;

    let unitCursor = 4;

    const result = [];
    let _resultStr = '';

    targetIntegerArr.reverse().forEach((item, cursor) => {
      if (item !== '0') {
        const currNumCN = CNNumMatrix[item];
        let currUnitCN = unitMatrix[cursor] || '';
        let currUnitOffset = '';
        let _result = currNumCN + currUnitCN;
        if (cursor > unitCursor) {
          currUnitCN = unitMatrix[unitCursor];
          currUnitOffset = unitMatrix[cursor % unitCursor] || '';
          _result = currNumCN + currUnitOffset + currUnitCN;
          if (cursor === unitLength - unitCursor - 1) {
            unitCursor += unitCursor;
          }
        }
        result.push(_result);
      }
    });
    _resultStr = result.reverse().join('').replace(' ', '');
    resultStr = removeRepeatItem(_resultStr, '万');
  }
  return resultStr;
}
export function removeRepeatItem(str, mark) {
  const strArr = str.split(mark);
  const lastSecItem = strArr[strArr.length - 2];
  strArr[strArr.length - 2] = lastSecItem + mark;

  return strArr.join('');
}
