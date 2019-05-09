function wrapTime(num) {
  let result = num;
  if (num < 10) {
    result = `0${num}`;
  }
  return result;
}

function wrapTimePrefix(timeNum) {
  if(timeNum < 10) {
    timeNum = '0' + timeNum;
  }
  return timeNum.toString();
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

  // let today = new Date();
  let YYYY = time.getFullYear(date).toString();

  // 如果时间少于今年, 即返回空字符串
  // if(YYYY < today.getFullYear(date).toString()) return '';

  let MM = wrapTimePrefix(time.getMonth(date) + 1);
  let DD = wrapTimePrefix(time.getDate(date));
  let hh = wrapTimePrefix(time.getHours(date));
  let mm = wrapTimePrefix(time.getMinutes(date));
  let ss = wrapTimePrefix(time.getSeconds(date));
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
  targetDate = DateFormat(targetDate, 'YYYY/MM/DD hh:mm:ss');
  /** 兼容 safari 对于时间格式的解析问题 */
  // targetDate = targetDate.replace(/-/g, '/');
  let targetDatstamp = Date.parse(targetDate);
  let resDate;
  if(targetDatstamp) {
    resDate = new Date(targetDatstamp - timeZoneOffsetStamp).toISOString().split('.')[0] + `${timeZoneSuffix}`;
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
  if(secNum < 0) secNum = 0;
  let sec = secNum % 60;
  let min = Math.floor(secNum / 60);
  let hour = Math.floor(min / 60);

  min = (min - hour * 60);

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
/**
 * 返回时间返回的函数
 *
 * @param {number} [startDayOffset=10] 开始时间前移几天，默认前移 10 天
 * @param {number} [endDayOffset=0] 结束位置
 * @param {string} [options={format: 'YYYY-MM-DD', extendFormat: [' 00:00:00', ' 23:59:59'], toUTC: true}] 返回的 format
 * @return {string}
 */
export function DateRange(startDayOffset = 10, endDayOffset = 0, options) {

  const { format, extendFormat, toUTC = true } = Object.assign({}, defaultDateRangeOptions, options);

  const currTime = Date.parse(new Date());
  const preTime = currTime - (startDayOffset * 24 * 60 * 60 * 1000);
  const nextTime = currTime + (endDayOffset * 24 * 60 * 60 * 1000);
  let startDateFormat = DateFormat(preTime, format) + ` ${(extendFormat[0] || '')}`;
  let endDateFormat = DateFormat(nextTime, format) + ` ${(extendFormat[1] || '')}`;

  if(toUTC) {
    startDateFormat = ToUTC(startDateFormat);
    endDateFormat = ToUTC(endDateFormat);
  }

  return [startDateFormat, endDateFormat];
}

/**
 * 兼容浏览器对时间格式的认知
 * @param  {string} dateStringInRange
 * @return {string}                  
 */
export function DateParseHook(dateStringInRange) {
  console.warn('DateParseHook 要废弃了，请使用 ToUTC');
  if (!dateStringInRange) return dateStringInRange;
  let resDateStr = dateStringInRange + '+0000';
  let date = new Date(resDateStr);
  if (date == 'Invalid Date') date = new Date(resDateStr.replace(/-/g, '/'));
  return date;
}

export function GetDefaultDateInfo(...argument) {
  console.warn('GetDefaultDateInfo 要废弃了，请使用 DateRange 代替');
  DateRange(...argument);
}
