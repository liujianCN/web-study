import React from 'react';
import Table from 'components/Tableee';
import { getPassengersType } from 'utils/TicketOrder';
import RefundAndChangeRules from 'components/RefundAndChangeRules';
import useShowRefundRules from 'components/useHooks/useShowRefundRules';

const defaultProps = {
  airData: []
};

const TicketOrderChangeFlightInfo = ({ airData }) => {
  console.log(airData);
  const [rulesIndex, rulesInfo, toggleRefundRule] = useShowRefundRules();
  const orderChangeFlightInfoTableTitle = ['航段', '航班号', '航班日期', '起飞/到达时间', '产品/舱位', '价格', '退改签'];
  return (
    <div>
      <Table
        className="orderChange"
        title={orderChangeFlightInfoTableTitle}
      >
        {
          airData.map((element, index) => (
            element.map((item, i) => (
              <tr className="Order_Table_Item" key={index + '' + i + item.arrTime}>
                <td>{`${item.orgAirPort.name}机场`} - {`${item.dstAirPort.name}机场`}</td>
                <td>{item.flightNo}</td>
                <td>{item.depDate}</td>
                <td>{`${item.depTime} / ${item.arrTime}`}</td>
                <td>{`${item.brandInfo.brandName}/${item.bookClass}舱`}</td>
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
                    href="javascript:void(0)"
                    onMouseEnter={() => { toggleRefundRule((`${index}${i}`), item.brandInfo.refundOrChangeTicketRule); }}
                    onMouseLeave={() => { toggleRefundRule((`${index}${i}`)); }}
                  >详细</a>
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
    </div>
  );
};

TicketOrderChangeFlightInfo.defaultProps = defaultProps;

export default React.memo(TicketOrderChangeFlightInfo);