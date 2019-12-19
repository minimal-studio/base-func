const scriptReg = /<?script.*?>.*?<\/script>/ig;
const urlReg = new RegExp(/(http(s)?:)?\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
const mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

/**
* 过滤 script 字符
*/
export function StripScript(s: string) {
  return s.replace(scriptReg, '');
}

/**
 * 检查输入是否 url
 */
export function IsUrl(url: string) {
  return urlReg.test(url);
}

/**
 * 检查输入是否为函数
 */
export function IsFunc(func: any) {
  return typeof func === 'function';
}
/**
 * 判断输入是否对象
 */
export function IsObj(obj: any) {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}

/**
 * 判断输入是否为 Email
 */
export function IsEmail(val: string) {
  return mailReg.test(val);
}

/**
 * 判断输入是否为有效的中国手机号码
 */
export function IsPhoneNumber(val: string | number) {
  const valStr = val.toString();
  return phoneReg.test(valStr);
}

/**
 * 判断输入是否为有效的中国手机号码
 */
export const IsPhone = IsPhoneNumber;

/**
 * 把输入转化成 boolean
 */
export function BoolFilter(boolNum: any) {
  return !!boolNum;
}

/**
 * 判断是否有值，如果为 0 则返回 true，其他按照 js 的解析逻辑返回
 */
export function HasValue(val: any): boolean {
  if (val === 0) return true;
  return !!val;
}

/**
 * 检查目标元素是否包含在目标数组中
 */
export function InArr<T>(targetArr: T[], item: T) {
  if (!targetArr || !HasValue(item)) return false;
  return targetArr.indexOf(item) > -1;
}
