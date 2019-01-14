function wrapTime(num) {
  let result = num;
  if (num < 10) {
    result = `0${num}`;
  }
  return result;
}

/**
 * 格式化日期和时间，获取特定的时间范围
 * 
 * @param {dateObj} date 时间对象
 * @param {string} format 格式化的
 * @return {string}
 */
export function DateFormat(date, format = "YYYY-MM-DD") {

  let hasSeparator = !(/Y+M+D+/.test(format));

  let time = new Date(date);
  if(!time || time == 'Invalid Date') return date;

  let today = new Date();
  let YYYY = time.getFullYear(date).toString();

  // 如果时间少于今年, 即返回空字符串
  // if(YYYY < today.getFullYear(date).toString()) return '';

  let MM = wrapTimePrefox(time.getMonth(date) + 1);
  let DD = wrapTimePrefox(time.getDate(date));
  let hh = wrapTimePrefox(time.getHours(date));
  let mm = wrapTimePrefox(time.getMinutes(date));
  let ss = wrapTimePrefox(time.getSeconds(date));
  let timeObj = {
    YYYY, MM, DD, hh, mm, ss
  };
  let resultFormat = [];
  Object.keys(timeObj).forEach((key, idx) => {
    format.replace(key, (_match, offset) => {
      let _offset = hasSeparator ? format.charAt(offset - 1) : '';
      resultFormat.push(_offset + timeObj[key].toString());
    });
  });

  function wrapTimePrefox(timeNum) {
    if(timeNum < 10) {
      timeNum = '0' + timeNum;
    }
    return timeNum.toString();
  }
  // format
  return resultFormat.join('');
}

const timeZoneOffset = (new Date()).getTimezoneOffset();
const timeZoneOffsetStamp = timeZoneOffset * 60000;
let timeZone = timeZoneOffset / 60 * -1;
if(Math.abs(timeZone) < 10) timeZone = `0${Math.abs(timeZone)}`;
const timeZoneSuffix = `${timeZone > 0 ? '+' : '-'}${timeZone}:00`;

/**
 * 把格式转化成标准 UTC 时间
 *
 * @param {dateObj} targetDate
 * @return {string}
 */
export function ToUTC(targetDate) {
  let targetDatstamp = Date.parse(targetDate);
  let resDate = new Date(targetDatstamp - timeZoneOffsetStamp).toISOString().split('.')[0] + `${timeZoneSuffix}`;
  return resDate;
}

/**
 * 格式化时间
 *
 * @param {number} [secNum=0]
 * @return {string}
 */
export function TimeFormat(secNum = 0) {
  if(secNum < 0) secNum = 0;
  let sec = secNum % 60;
  let min = Math.floor(secNum / 60);
  let hour = Math.floor(min / 60);

  min = (min - hour * 60);

  return {
    hour: wrapTime(hour),
    min: wrapTime(min),
    sec: wrapTime(sec)
  };
}

const defaultDateRangeOptions = {
  format: 'YYYY-MM-DD',
  extendFormat: [' 00:00:00', ' 23:59:59'],
  toUTC: true
};
/**
 * 返回时间返回的函数
 *
 * @param {number} [startDayOffset=10] 开始时间前移几天，默认前移 10 天
 * @param {number} [endDayOffset=0] 结束位置
 * @param {string} [options={format: 'YYYY-MM-DD', extendFormat: [' 00:00:00', ' 23:59:59'], toUTC: true}] 返回的 format
 * @return {string}
 */
export function DateRange(startDayOffset = 10, endDayOffset = 0, options = defaultDateRangeOptions) {

  const { format, extendFormat, toUTC = true } = options;

  const currTime = Date.parse(new Date());
  const preTime = currTime - (startDayOffset * 24 * 60 * 60 * 1000);
  const nextTime = currTime + (endDayOffset * 24 * 60 * 60 * 1000);
  let startDateFormat = DateFormat(preTime, format) + (extendFormat[0] || '');
  let endDateFormat = DateFormat(nextTime, format) + (extendFormat[1] || '');

  if(toUTC) {
    startDateFormat = ToUTC(startDateFormat);
    endDateFormat = ToUTC(endDateFormat);
  }

  return [startDateFormat, endDateFormat];
}

export function GetDefaultDateInfo(...argument) {
  console.warn('GetDefaultDateInfo 要废弃了，请使用 DateRange 代替');
  DateRange(...argument);
}
