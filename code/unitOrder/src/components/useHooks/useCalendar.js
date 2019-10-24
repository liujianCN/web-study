import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
const useCalendar = (date = dayjs()) => {
  let [day, setDay] = useState(date);
  //const [dateList, setDateList] = useState();
  /**
 * @description:  获取日期数组
 * @method: getDayList
 * @param {日期对象} null
 * @return: 日期数组dateList
 */
  const getDayList = useCallback( date => {
    const first = date.startOf('month'), end = date.endOf('month');
    const firstDay = first.get('day'), endDay = end.get('day'), days = end.date();
    let dayList = new Array(firstDay).fill('null');
    for (let i = 1; i <= days; i++) {
      dayList.push(i);
    }
    dayList = dayList.concat(new Array(6 - endDay).fill('null'));
    return dayList;
  },[]);
  /**
* @description: 获取
* @method:
* @param {type} null
* @return: null
*/
  const getDateList = useCallback(( date = dayjs(), type = 'month', n = 2 ) => {
    let dateList = [];
    for (let i = 0; i < n; i++) {
      const dateN = date.add(i, type);
      dateList.push({
        date: dateN,
        dateList: getDayList(dateN)
      });
    }
    return dateList;
  },[getDayList]);

  const add = useCallback((hadeler, type = 'month') => {
    setDay(day=>day.add(1, type));
    hadeler(getDateList(day,type));
  },[getDateList,day]);

  const sub = useCallback((hadeler, type = 'month') => {
    setDay(day=>day.add(1, type));
    hadeler(getDateList(day,type));
  },[getDateList,day]);

  return { getDateList, add, sub };
};
export default useCalendar;