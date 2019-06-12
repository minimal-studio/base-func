const defaultNumMapper = '零壹貳叁肆伍陸柒捌玖';

/**
 * 去除重复数据
 */
export function removeRepeatItem(str: string, mark: string) {
  const strArr = str.split(mark);
  const lastSecItem = strArr[strArr.length - 2];
  strArr[strArr.length - 2] = lastSecItem + mark;

  return strArr.join('');
}
/**
 * 数字转中文
 * @type {String}
 */
export default function numTransformToCN(target: number, numMapper = defaultNumMapper) {
  let resultStr = '不符合规则';
  if (!Number.isNaN(+target)) {
    // const CNNumMatrix = '零一二三四五六七八九'.split('');
    const CNNumMatrix: string[] = numMapper.split('');
    const unitMatrix = '元十百千万___亿____'.split('');
    const unitLength = unitMatrix.length;
    const [targetIntegerMatrix, targetFloorMatrix] = target.toString().split('.');
    const targetIntegerArr: string[] = targetIntegerMatrix.toString().split('');
    // const targetFloorArr = targetFloorMatrix ? targetFloorMatrix.toString().split('') : [];
    // const targetLength = targetIntegerArr.length;

    let unitCursor = 4;

    const result: string[] = [];
    let _resultStr = '';

    targetIntegerArr.reverse().forEach((item, cursor) => {
      if (item !== '0') {
        const currNumCN = CNNumMatrix[+item];
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
