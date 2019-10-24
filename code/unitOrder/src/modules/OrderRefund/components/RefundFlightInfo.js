import React, { memo } from 'react';
import Card from 'components/Card';
import Table from 'components/Tableee';
import indexJS from 'indexJS';
import { getPassengersType } from 'utils/TicketOrder';
import RefundAndChangeRules from 'components/RefundAndChangeRules';
import useShowRefundRules from 'components/useHooks/useShowRefundRules';


const defaultProps = {
  flightInfos: [],
  title: ''
};
const OrderContactTableTitle = ['航段', '航班号', '航班日期', '起飞/到达时间', '产品/舱位', '支付价格', '退改签'];
const RefundFlightInfo = ({ flightInfos, title }) => {
  const [rulesIndex,rulesInfo,toggleRefundRule] = useShowRefundRules();
  console.log('render------');
  return (
    <div style={{ width: '1000px', margin: '0 auto' }}>
      <h3>{title}</h3>
      <Card
        icon={indexJS.cardTitleIconFlightURL}
        title="航班信息"
      >
        <Table
          title={OrderContactTableTitle}
        >
          {
            flightInfos.map((element, index) => (
              element.map((item, i) => (
                <tr className="Order_Table_Item" key={index + '' + i + item.arrTime}>
                  <td>{`${item.orgAirPort.name} ( ${item.orgAirPort.code} )`}<br />{`${item.dstAirPort.name} ( ${item.dstAirPort.code} )`}</td>
                  <td>{item.flightNo}</td>
                  <td>{item.depDate}</td>
                  <td>{`${item.depTime} / ${item.arrTime}`}</td>
                  <td>{`${item.brandInfo.brandName} / ${item.bookClass}舱`}</td>
                  <td>
                    {
                      item.passengers.map(psg => (
                        <React.Fragment key={psg.idNumber}>
                          <span>{`￥${psg.details[0].amount} ( ${getPassengersType(psg.passType)} )`}</span><br />
                        </React.Fragment>
                      ))
                    }
                  </td>
                  <td style={{ position: 'relative' }}>
                    <a
                      href="javascript:void(0);"
                      onMouseEnter={() => { toggleRefundRule((`${index}${i}`), item.brandInfo.refundOrChangeTicketRule); }}
                      onMouseLeave={() => { toggleRefundRule((`${index}${i}`)); }}
                    >
                      详细
                    </a>
                    {
                      rulesIndex === `${index}${i}` &&
                      <RefundAndChangeRules
                        rules={rulesInfo}
                        style={{ top: 60, right: -100 }}
                      />
                    }
                  </td>
                </tr>
              ))
            ))
          }
        </Table>
      </Card>
    </div>
  );
};

RefundFlightInfo.defaultProps = defaultProps;
export default memo(RefundFlightInfo);