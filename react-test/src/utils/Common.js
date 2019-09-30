// 计算星期
export function computeWeek(val) {
  console.log(val);
  let weekZH = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六'
  };
  let localTime = new Date(val).getTime();
  let localOffset = new Date(val).getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let offset = 8;
  let korean = utc + (3600000 * offset);
  let day = weekZH[new Date(korean).getDay()];
  return day;
}

//计算日期
export function getDay(AddDayCount, day) {
  let dd = day == undefined ? new Date() : new Date(day);
  //计算时区开始
  //本地时间
  let localTime = new Date(dd).getTime();
  //本地时间与格林威治时间差
  let localOffset = new Date(dd).getTimezoneOffset() * 60000;
  //计算出utc时间
  let utc = localTime + localOffset;
  //计算出东八区时间
  let offset = 8,
      korean = 0;
  korean = utc + (3600000 * offset);
  dd = new Date(korean);
  //计算时区结束
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  let y = dd.getFullYear();
  let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
  return y + '-' + m + '-' + d;
}

/**
 * 时间戳
 * @param {number} ms - 毫秒数
 * @return - 返回时间戳 yyyy-MM-dd hh:mm
 */
export function formatDate (ms) {
  let date = new Date(ms);
  console.log(date);
  //本地时间
  let localTime = new Date(date).getTime();
  //本地时间与格林威治时间差
  let localOffset = new Date(date).getTimezoneOffset() * 60000;
  //计算出utc时间
  let utc = localTime + localOffset;
  //计算出东八区时间
  let offset = 8;
  let korean = 0;
  korean = utc + (3600000 * offset);
  date = new Date(korean);

  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let mm = date.getMinutes();
  mm = mm < 10 ? ('0' + mm) : mm;
  return y + '-' + m + '-' + d + ' ' + h + ':' + mm;
}