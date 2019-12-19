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
let floatStore: number[] = [floatLen, 0];

/**
 * 获取 floatLen
 */
export function GetFloatLen(): number {
  return floatLen;
}

/**
 * 设置 floatLen
 */
export function SetFloatLen(len: number | string): void {
  const _len = +(len);
  if (!_len || _len < 0 || _len > 5) return;
  floatLen = _len;
  floatStore = [floatLen, 0];
}

/**
 * 隐藏小数点的开关
 */
export function ToggleBasicFloatLen(): boolean {
  floatStore.reverse();
  const [nextFlotLen] = floatStore;
  floatLen = nextFlotLen;
  const isDisplay = floatLen !== 0;
  return isDisplay;
}

/**
 * 修正数字的小数点后的位数
 */
export function ToFixed(
  targetNumber: number | string, limit = GetFloatLen(), returnAsStr = false
): number | string {
  const numb = +targetNumber || 0;
  const numbStr = returnAsStr ? numb.toFixed(6) : numb.toString();
  let numbStrRes: string = numbStr;
  let [_int, _float] = numbStr.split('.');
  if (_float) {
    _float = _float.substr(0, limit);
    numbStrRes = `${_int}.${_float}`;
  }
  return returnAsStr ? numbStrRes : +numbStrRes;
}
