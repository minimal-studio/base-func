/**
 * 默认的格式化数字的小数点位数长度
 */
const BASIC_FLOAT_LEN = 4;

/**
 * 应用于 ToFixed 格式化数字的小数点位数长度，默认为 4
 */
let floatLen = BASIC_FLOAT_LEN;

/**
 * 用于是否显示做浮点数开关
 */
let floatStore = [floatLen, 0];

/**
 * 获取 floatLen
 *
 * @return {number}
 */
export function GetFloatLen() {
  return floatLen;
}

/**
 * 设置 floatLen
 *
 * @param {number} len 长度
 * @return {void}
 */
export function SetFloatLen(len) {
  const _len = parseInt(len);
  if (!_len || _len < 0 || _len > 5) return;
  floatLen = len;
  floatStore = [floatLen, 0];
}

/**
 * 隐藏小数点的开关
 *
 * @return {boolean} 是否隐藏了小数点
 */
export function ToggleBasicFloatLen() {
  floatStore.reverse();
  floatLen = floatStore[0];
  const isDisplay = floatLen !== 0;
  return isDisplay;
}

/**
 * 修正数字的小数点后的位数
 *
 * @param {number | string} targetNumber 目标数字
 * @param {number} [limit=GetFloatLen()] 小数点后的长度
 * @param {boolean} [isStr=false] 是否返回字符串
 * @return {number | string} 根据 isStr 返回调整过后的数字或者字符串
 */
export function ToFixed(targetNumber, limit = GetFloatLen(), isStr = false) {
  let numb = +targetNumber || 0;
  const numbStr = isStr ? numb.toFixed(6) : numb.toString();
  let [_int, _float] = numbStr.split('.');
  if (_float) {
    _float = _float.substr(0, limit);
    numb = `${_int}.${_float}`;
  }
  return isStr ? numb : +numb;
}
