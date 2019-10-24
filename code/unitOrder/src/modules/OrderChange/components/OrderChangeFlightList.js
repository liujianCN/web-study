import React from 'react';

import FormInput from 'components/FormInput';
import useInput from 'components/useInput';

const flightListTitle = [
  { text: '航段', width: 280 }, { text: '出发/到达<span>当地</span>', width: 180 }, { text: '航班号/机型', width: 120 },
  { text: '飞行时间', width: 118 }, { text: '舒心飞', width: 100 }, { text: '大众游', width: 100 }, { text: '欢乐抢', width: 100 }];

const TicketOrderChangeFlightList = () => {
  const {value, handleInputChange} = useInput();
  return (
    <div className="Ticket_Order_Change_Flight_List__Container">
      <div className="Ticket_Order_Change_Flight_List_Title">
        {
          flightListTitle.map(item => (
            item.text.includes('当地') ?
              <div
                dangerouslySetInnerHTML={{ __html: item.text }}
                key={item.text}
                style={{ width: item.width + 'px' }}
              ></div> :
              <div
                key={item.text}
                style={{ width: item.width + 'px' }}
              >{item.text}</div>
          ))
        }
      </div>
      <table className="Ticket_Order_Change_Flight_List__Content">
        <tbody>
          <tr className="Ticket_Order_Change_Flight_List_Item">
            <td>
              <dl className="Ticket_Order_Change_Flight_Item_Info">
                <dd className="Flight_Item_Info_Seg">北京南苑机场----上海虹桥机场</dd>
                <dd className="Flight_Item_Info_Date"><span>2019-08-11 07:50</span><br /><span>2019-08-11 07:50</span></dd>
                <dd className="Flight_Item_Info_FlightNum"><span>KN7438</span><br /><span>73V</span></dd>
                <dd className="Flight_Item_Info_Duration"><span>直飞</span><br /><span>2小时</span></dd>
              </dl>
            </td>
            <td className="Ticket_Order_Change_Flight_Item_Brand">
              <FormInput
                checked={value === 'SXF'}
                handleInputChange={handleInputChange}
                type="radio"
                value="SXF"
              /><br />
              ￥ <span>1788</span> 9.99折
            </td>
            <td className="Ticket_Order_Change_Flight_Item_Brand">
              <FormInput
                checked={value === 'DZY'}
                handleInputChange={handleInputChange}
                type="radio"
                value="DZY"
              /><br />
              ￥ <span>88</span> 4.99折</td>
            <td className="Ticket_Order_Change_Flight_Item_Brand">--</td>
          </tr>
          {
            value!==''&&
            <tr className="Order_Change_Item_Brand_Detail">
              <td colSpan={4}>
                <ul>
                  <li>北京-上海</li>
                </ul>
                <dl className="fixFloat">
                  <dt>承运航空公司</dt>
                  <dd>中国联合航空公司</dd>
                </dl>
                <dl className="fixFloat">
                  <dt>出发时间</dt>
                  <dd>2019-08-11 07:50 北京南苑机场(北京) --航站楼</dd>
                </dl>
                <dl className="fixFloat">
                  <dt>到达时间</dt>
                  <dd>2019-08-11 09:50 上海虹桥机场(上海) T2航站楼</dd>
                </dl>
                <dl className="fixFloat">
                  <dt>餐食</dt>
                  <dd>无餐食</dd>
                </dl>
                <dl className="fixFloat Order_Change_Item_Brand_Detail_Baggages">
                  <dt>行李规定</dt>
                  <dd>
                    <p>手提随身行李体积不得超过20X30X40厘米，且重量不得超过10KG。免费托运行李：购买舒心飞（W舱）的旅客，每人可免费托运30KG行李。购买大众游（ Y/B/M/A/E 舱）的旅客，每人可免费托运20KG行李。购买大众游（ H/K/L/N/D/R 舱）和欢乐抢（S/V/J/T/I/Z/U舱）的旅客，不支持免费托运行李。免费托运行李单件体积不得超过40X60X100厘米。</p>
                  </dd>
                </dl>
                <dl className="fixFloat">
                  <dt>飞行时间</dt>
                  <dd>2小时</dd>
                </dl>
                <dl className="fixFloat">
                  <dt>经停</dt>
                  <dd>直飞</dd>
                </dl>
                <dl className="fixFloat">
                  <dt>红包</dt>
                  <dd>60</dd>
                </dl>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(TicketOrderChangeFlightList);