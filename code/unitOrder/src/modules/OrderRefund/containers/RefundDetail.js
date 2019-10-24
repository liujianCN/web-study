import React from 'react';
import { connect } from 'react-redux';

import {
  getOrderPassengers,
  getOrderAirData,
  getOrderPayInfos,
  getRefundPsg
} from 'selectors/ticketOrderSelector';

import OrderTopPosition from 'components/OrderTopPosition';
//import RefundAndChangeRules from 'components/RefundAndChangeRules';
import RefundFlightInfo from '../components/RefundFlightInfo';
import RefundPassengers from '../components/RefundPassengers';
import RefundDetailStatus from '../components/RefundDetailStatus';

const mapStateToProps = state => ({
  passengers: getOrderPassengers(state),
  airData: getOrderAirData(state),
  payInfos: getOrderPayInfos(state),
  refundPsg: getRefundPsg(state)
});
const mapDispatchToProps = {
};

const OrderRefundContainer = props => {
  let { passengers, airData } = props;
  return (
    <div>
      <OrderTopPosition
        position="首页 > 订单详情 > 退票跟踪"
      />
      <RefundFlightInfo
        flightInfos={airData}
        title="退票跟踪"
      />
      <RefundPassengers
        hasCheckbox={false}
        passengers={passengers}
      />
      <RefundDetailStatus />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderRefundContainer);