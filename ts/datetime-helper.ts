type DateFormatDate = any;

function wrapTime(num: number): string {
  let result: string = num.toString();
  if (num < 10) {
    result = `0${num}`;
  }
  return result;
}

function wrapTimePrefix(timeNum: number): string {
  let nextTimeNum: string = timeNum.toString();
  if (timeNum < 10) {
    nextTimeNum = `0${timeNum}`;
  }
  return nextTimeNum.toString();
}

/**
 * 检查是否时间对象
 * @param {any} dateObj dateObject
 */
function isValidDate(dateObj: any): boolean {
  return dateObj && !isNaN(dateObj.getTime());
}
type DateTimeArr = 'YYYY' | 'MM' | 'DD' | 'hh' | 'mm' | 'ss';
interface DateTimeObj {
  YYYY: string;
  MM: string;
  DD: string;
  hh: string;
  mm: string;
  ss: string;
}

/**
 * 格式化日期和时间，获取特定的时间范围
 *
 * @param {any} date 可以转化成 date object 的参数
 * @param {string} format 格式
 * @return {string}
 */
export function DateFormat(date: DateFormatDate, format = "YYYY-MM-DD"): string {
  const hasSeparator = !(/Y+M+D+/.test(format));

  const dateObj = new Date(date);
  /** 判断是否 Invalid Date */
  if (!isValidDate(dateObj)) return date;

  // let today = new Date();
  const YYYY = dateObj.getFullYear().toString();

  // 如果时间少于今年, 即返回空字符串
  // if(YYYY < today.getFullYear(date).toString()) return '';

  const MM = wrapTimePrefix(dateObj.getMonth() + 1);
  const DD = wrapTimePrefix(dateObj.getDate());
  const hh = wrapTimePrefix(dateObj.getHours());
  const mm = wrapTimePrefix(dateObj.getMinutes());
  const ss = wrapTimePrefix(dateObj.getSeconds());
  const timeObj: DateTimeObj = {
    YYYY, MM, DD, hh, mm, ss
  };
  const resultFormat: string[] = [];
  const replacer = (key: DateTimeArr) => (_match: string, offset: number) => {
    const _offset = hasSeparator ? format.charAt(offset - 1) : '';
    resultFormat.push(_offset + timeObj[key].toString());
    return _match;
  };
  Object.keys(timeObj).forEach((key: DateTimeArr) => {
    format.replace(key, replacer(key));
  });
  // format
  return resultFormat.join('');
}

const timeZoneOffset = (new Date()).getTimezoneOffset();
const timeZoneOffsetStamp = timeZoneOffset * 60000;
const timeZone: number = timeZoneOffset / 60 * -1;
let timeZoneStr: string = timeZone.toString();
if (Math.abs(timeZone) < 10) timeZoneStr = `0${Math.abs(timeZone)}`;
const timeZoneSuffix = `${timeZone > 0 ? '+' : '-'}${timeZoneStr}:00`;

/**
 * 把格式转化成标准 UTC 时间
 *
 * @param {dateObj} targetDate
 * @return {string}
 */
export function ToUTC(targetDate: DateFormatDate) {
  const targetDateRes = DateFormat(targetDate, 'YYYY/MM/DD hh:mm:ss');
  /** 兼容 safari 对于时间格式的解析问题 */
  // targetDate = targetDate.replace(/-/g, '/');
  const targetDatstamp = Date.parse(targetDateRes);
  let resDate;
  if (targetDatstamp) {
    resDate = `${new Date(targetDatstamp - timeZoneOffsetStamp).toISOString().split('.')[0]}${timeZoneSuffix}`;
  } else {
    console.log('请输入有效时间');
  }
  return resDate;
}

/**
 * 格式化时间
 *
 * @param {number} [secNum=0]
 * @return {string}
 */
export function TimeFormat(secNum = 0, toString = false) {
  let secNumRes = secNum;
  if (secNumRes < 0) secNumRes = 0;
  const sec = secNumRes % 60;
  let min = Math.floor(secNumRes / 60);
  const hour = Math.floor(min / 60);

  min -= hour * 60;

  return toString ? `${hour}:${min}:${sec}` : {
    hour: wrapTime(hour),
    min: wrapTime(min),
    sec: wrapTime(sec)
  };
}

const defaultDateRangeOptions = {
  format: 'YYYY-MM-DD',
  extendFormat: ['00:00:00', '23:59:59'],
  toUTC: true
};

export interface DateRangeOptions {
  format?: string;
  extendFormat?: string[];
  toUTC?: boolean;
}
/**
 * 返回时间返回的函数
 *
 * @param {number} [startDayOffset=10] 开始时间前移几天，默认前移 10 天
 * @param {number} [endDayOffset=0] 结束位置
 * @param {DateRangeOptions} [options=defaultDateRangeOptions] 返回的 format
 * @return {string}
 */
export function DateRange(startDayOffset = 10, endDayOffset = 0, options?: DateRangeOptions) {
  const {
    format, extendFormat, toUTC = true
  } = Object.assign({}, defaultDateRangeOptions, options);

  const currTime = Date.now();
  const preTime = currTime - (startDayOffset * 24 * 60 * 60 * 1000);
  const nextTime = currTime + (endDayOffset * 24 * 60 * 60 * 1000);
  let startDateFormat = `${DateFormat(preTime, format)} ${(extendFormat[0] || '')}`;
  let endDateFormat = `${DateFormat(nextTime, format)} ${(extendFormat[1] || '')}`;

  if (toUTC) {
    startDateFormat = ToUTC(startDateFormat);
    endDateFormat = ToUTC(endDateFormat);
  }

  return [startDateFormat, endDateFormat];
}

/**
 * DateParseHook had Deprecated
 */
export function DateParseHook() {
  return console.warn('DateParseHook had Deprecated');
}

/**
 * GetDefaultDateInfo Deprecated
 */
export function GetDefaultDateInfo() {
  return console.warn('GetDefaultDateInfo 要废弃了，请使用 DateRange 代替');
}
