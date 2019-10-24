import React,{ memo } from 'react';
// import PropTypes from 'prop-types';
import Card from 'components/Card';
import indexJS from 'indexJS';
// import { useHistory } from 'react-router-dom';

const defaultProps = {
  operationCode:{}
};
//军警残时显示

const TicketOrderFlightInfo = ({
    orderStatus,
    operationCode,
    handleCancel,
    // handleOrderChange,
    // handleRefund,
    // handleOrderPay,
    isGmjcOrder
  }) => {
  // const history = useHistory();
  return (
      <Card
        icon={indexJS.cardTitleIconPointURL}
        title="其他相关服务"
      >
          <div className="Ticket_Order_Detail_Operation fixFloat">
            {/* 暂时不上 */}
            {/* {operationCode.canRefund=='true' && !isGmjcOrder && <div onClick={handleRefund}>申请退票</div>}
            {operationCode.canChange=='true' && !isGmjcOrder && <div onClick={handleOrderChange}>改期升舱</div>} */}
            {/* {operationCode.canChange=='true' && <div onClick={}>网上值机</div>} */}
            {orderStatus=='未支付' &&
              <React.Fragment>
              {/* 暂时不上 */}
                {/* <div onClick={handleOrderPay}>去支付</div> */}
                <div onClick={handleCancel}>取消订单</div>
              </React.Fragment>
            }
            {
              operationCode.canRefund=='true' || operationCode.canChange=='true' && isGmjcOrder &&
              <div>
                温馨提示 : 如您需要申请客票变更或退票，请联系客服400-102-6666
              </div>
            }
            {/* <div onClick={()=>{history.push('/start');}}>申请差额退款</div> */}
          </div>
      </Card>
  );
};
TicketOrderFlightInfo.defaultProps = defaultProps;
export default memo(TicketOrderFlightInfo);