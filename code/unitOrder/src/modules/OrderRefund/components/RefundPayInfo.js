import React, { memo } from 'react';
import Card from 'components/Card';
import Table from 'components/Tableee';
import indexJS from 'indexJS';

const defaultProps = {
  payInfos: []
};

const TicketOrderPayInfo =  ({ payInfos }) => {

  const OrderContactTableTitle = ['支付单号', '支付银行', '支付时间', '支付金额', '支付状态'];
  console.log('render payInfo');
  return (
    <Card
      icon={indexJS.cardTitleIconMoneyURL}
      title="支付信息"
    >
      <Table
        title={OrderContactTableTitle}
      >
        {
          payInfos.map(item => (
            <tr className="Order_Table_Item" key={item.transactionNo}>
              <td>{item.transactionNo}</td>
              <td>{item.payType}</td>
              <td>{item.paytime}</td>
              <td>{item.payAmount}</td>
              <td>{item.payAmount}</td>
            </tr>
          ))
        }
      </Table>
    </Card>
  );
};

TicketOrderPayInfo.defaultProps = defaultProps;
export default memo(TicketOrderPayInfo);