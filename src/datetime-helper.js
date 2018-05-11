/**
 * 简单的时间处理函数
 * 格式化日期和时间，获取特定的时间范围
 */

export function dateFormat(date, format = "YYYY-MM-DD") {

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

export function timeFormat(secNum = 0) {
  if(secNum < 0) secNum = 0;
  let sec = secNum % 60;
  let min = Math.floor(secNum / 60);
  let hour = Math.floor(min / 60);

  min = (min - hour * 60);

  return {
    hour: wrapTime(hour),
    min: wrapTime(min),
    sec: wrapTime(sec)
  }
}

function wrapTime(num) {
  let result = num;
  if (num < 10) {
    result = `0${num}`;
  }
  return result;
}

/**
 * 默认的时间控件的时间间隔, 将查询时间调为 5 天以内的
 */
const _startDayOffset = 10;
const _endDayOffset = 0;
export function getDefaultDateInfo(startDayOffset = _startDayOffset, endDayOffset = _endDayOffset, format = 'YYYY-MM-DD', extendFormat = [' 00:00:00', ' 23:59:59']) {

  const currTime = Date.parse(new Date());
  const preTime = currTime - (startDayOffset * 24 * 60 * 60 * 1000);
  const nextTime = currTime + (endDayOffset * 24 * 60 * 60 * 1000);
  let startDateFormat = dateFormat(preTime, format) + (extendFormat[0] || '');
  let endDateFormat = dateFormat(nextTime, format) + (extendFormat[1] || '');

  return [startDateFormat, endDateFormat];
}
