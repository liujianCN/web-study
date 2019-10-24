import React, { useMemo, useCallback, useReducer, memo } from 'react';
import dayjs from 'dayjs';
import { upperCaseMonth } from 'utils/Common';
/**
 * @param {onDateChange} 日期改变时的回调；
 * @param {inputStyle} /input框样式；
 * @param {minDate} 最小日期; yyyy-mm-dd
 * @param {maxDate} 最大日期; yyyy-mm-dd
 */
const holidayMap = {
  '2019-10-01': '国庆',
  '2020-01-01': '元旦',
  '2020-01-24': '除夕',
  '2020-01-25': '春节',
  '2020-02-08': '元宵',
  '2020-04-04': '清明',
  '2020-05-01': '五一',
  '2020-06-25': '端午',
  '2020-10-01': '国庆',
  '2021-01-01': '元旦',
  '2021-02-11': '除夕',
  '2021-02-12': '春节',
  '2021-02-26': '元宵',
  '2021-04-04': '清明',
  '2021-05-01': '五一',
  '2021-06-14': '端午',
  '2021-10-01': '国庆'
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'setVisible':
      return { ...state, visible: action.p };
    case 'setDate':
      return { ...state, date: action.p };
    case 'setSelectDay':
      return { ...state, selectDay: action.p, visible: false };
    default:
      throw new Error('Unexpected action');
  }
};
const DatePicker = (props) => {

  const today = useMemo(() => dayjs(), []);
  const { onDateChange, inputStyle, maxDay = today.add(2,'year'), minDay = today } = props;
  const minDate = dayjs(minDay);
  const initialState = {
    visible: false,
    date: minDate,
    selectDay: '',
    dateList: []

  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { visible, date, selectDay } = state;

  /**
   * @description: 获取每个月的日期列表
   * @method: getDayList
   * @param {date} 每个月的日期 (YYYY-MM)
   * @return: dayList
   */
  const getDayList = useCallback(date => {
    const first = date.startOf('month'), end = date.endOf('month');
    const firstDay = first.get('day'), endDay = end.get('day'), days = end.date();
    let dayList = new Array(firstDay).fill(null);
    for (let i = 1; i <= days; i++) {
      dayList.push(i+'');
    }
    dayList = dayList.concat(new Array(6 - endDay).fill(null));
    return dayList;
  }, []);

  /**
   * @description: 获取所需要的日期列表数组
   * @method: getDateList
   * @param { type, n } 可配置月或者年'month','year',展示多少月份
   * @return: 日期列表数组 [ {dayList: [] },{dayList: [] }]
   */
  const getDateList = useMemo(() => {
    let dateList = [];
    for (let i = 0; i < 2; i++) {
      const dateN = date.add(i, 'month');
      dateList.push({
        date: dateN,
        dateList: getDayList(dateN)
      });
    }
    return dateList;
  }, [date, getDayList]);

  //日历循环的列表
  const dateList = getDateList;

  //加月
  const add = (type = 'month') => {
    const nexDate = date.add(1, type);
    let maxDate = dayjs(maxDay);
    if (nexDate.isAfter(maxDate, 'month') || nexDate.isSame(maxDate, 'month')) return;
    dispatch({ type: 'setDate', p: nexDate });
    console.log(date);
  };
  //减月
  const sub = (type = 'month') => {
    const lastDate = date.subtract(1, type);
    let minDate = dayjs(minDay);
    if (lastDate.isBefore(minDate, 'month')) return;
    dispatch({ type: 'setDate', p: lastDate });
  };

  const formatDate = day => {
    const year = day.format('YYYY');
    const month = upperCaseMonth(day.format('MM'));
    //const date = upperCaseMonth(day.format('MM'));
    const date = `${year}年 ${month}月`;
    return date;
  };
  //最小日期之气的日期置灰
  const isTodayBefore = useCallback(day => {
    const date = dayjs(day);
    return (date.isAfter(minDate)) || (date.isSame(minDate, 'day'));
  }, [minDate]);
  //是否是今天
  const isToday = day => {
    const date = dayjs(day);
    return date.isSame(today,'day');
  };
  //选中日期
  const handleSelect = day => {
    const date = dayjs(day), selectDay = date.format('YYYY-MM-DD');
    dispatch({ type: 'setSelectDay', p: selectDay });
    onDateChange && onDateChange(selectDay);
  };

  return (
    <div className="DatePicker__Container">
      <input
        className="DatePicker_Input"
        onFocus={() => { dispatch({ type: 'setVisible', p: true }); }}
        readOnly
        style={inputStyle && inputStyle}
        value={selectDay}
      />
      {
        visible &&
        <div className="DatePicker__Content_Calendar">
          {
            dateList.map((e, i) => {
              const { date, dateList } = e;
              return (
                <div className="DatePicker__Item__Content" key={i}>
                  <header className="DatePicker__Content_Header fixFloat">
                    {
                      i === 0 &&
                      <div
                        className="DatePicker_Header_Left_Arrow"
                        onClick={() => sub()}
                      />
                    }
                    <div className="DatePicker_Header_Middle_Date">
                      <div>{formatDate(date)}</div>
                    </div>
                    {
                      i === 1 &&
                      <div
                        className="DatePicker_Header_Right_Arrow"
                        onClick={() => add()}
                      />
                    }
                  </header>
                  <section className="DatePicker__Main_Group">
                    <div className="DatePicker__Main_Week fixFloat">
                      <div>日</div>
                      <div>一</div>
                      <div>二</div>
                      <div>三</div>
                      <div>四</div>
                      <div>五</div>
                      <div>六</div>
                    </div>
                    <div className="DatePicker__Main_Date fixFloat">
                      {
                        dateList.map((dayItem, i) => {
                          const dateT = dayItem?`${date.format('YYYY-MM')}-${dayItem[1]?dayItem:'0'+dayItem}`:dayItem;
                          return (
                            <div
                              className={`DatePicker_Item_Common
                            ${dayItem === null ? 'DatePicker_Empty' : ''}
                            ${isToday(dateT) ? 'DatePicker_Item_Today' : ''}
                            ${selectDay === dateT ? 'DatePicker_Item_Select' : ''}
                            ${(i % 7 === 0) || ((i + 1) % 7 === 0) ? 'DatePicker_Item_Weekend' : ''}
                            ${isTodayBefore(dateT) ? 'DatePicker_Item' : 'DatePicker_Item_Today_Before'}

                            ${holidayMap[dateT] ? 'DatePicker_Item_Holiday' : ''}
                          `}
                              key={i + new Date() + 'dayItem' + dayItem}
                              onClick={() => handleSelect(dateT)}
                            >
                              {
                                Object.prototype.hasOwnProperty.call(holidayMap, dateT) ? holidayMap[dateT] : dayItem
                              }
                            </div>
                          );
                        })
                      }
                    </div>

                  </section>
                </div>
              );
            })
          }
        </div>
      }
    </div>
  );
};

export default memo(DatePicker);