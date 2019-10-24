import React,{ memo } from 'react';
import Card from 'components/Card';
import Table from 'components/Tableee';
import indexJS from 'indexJS';

const defaultProps = {
  payInfos: []
};

const TicketOrderPayInfo = ({ payInfos, redAmount }) => {
  const OrderDetailsPayInfoTableTitle = ['支付单号', '支付银行', '支付时间', '支付金额', '红包抵扣'];
  return (
    <Card
      icon={indexJS.cardTitleIconMoneyURL}
      title="支付信息"
    >
      <Table
        title={OrderDetailsPayInfoTableTitle}
      >
        {
          payInfos.map(item => (
            <tr className="Order_Table_Item" key={item.transactionNo}>
              <td>{item.transactionNo}</td>
              <td>{item.payType}</td>
              <td>{item.paytime}</td>
              <td>{item.payAmount}</td>
              <td>￥{redAmount ? redAmount : 0}</td>
              {/* <td>
                {
                  item.isPayForTicket == 'false' ?
                    <button
                      onClick={() => { handleErrorRefund(item.errorRefundRes, item.transactionNo, item.bussinessCode); }}
                    >
                      {item.errorRefundRes ? '查看处理结果' : '申请差错退款'}
                    </button> :
                    '支付完成'
                }
              </td> */}
            </tr>
          ))
        }
      </Table>
    </Card>
  );
};
TicketOrderPayInfo.defaultProps = defaultProps;
export default memo(TicketOrderPayInfo);