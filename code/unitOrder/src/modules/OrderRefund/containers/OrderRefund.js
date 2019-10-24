import React from 'react';
import { connect } from 'react-redux';
import {
  getOrderPassengers,
  getOrderAirData,
  getOrderPayInfos,
  getRefundPsg
} from 'selectors/ticketOrderSelector';

//import NormalPage from 'components/NormalPage';
import OrderTopPosition from 'components/OrderTopPosition';
import RefundFlightInfo from '../components/RefundFlightInfo';
import RefundPassengers from '../components/RefundPassengers';
import RefundPayInfo from '../components/RefundPayInfo';
import RefundApplicationForm from '../components/RefundApplicationForm';

const mapStateToProps = state => ({
  passengers: getOrderPassengers(state),
  airData: getOrderAirData(state),
  payInfos: getOrderPayInfos(state),
  refundPsg: getRefundPsg(state)
});
const mapDispatchToProps = {

};

const OrderRefundContainer = props => {

  let { passengers, payInfos, airData, refundPsg } = props;
  //let { showRefundRule, checkedPsg } = this.state;
  //console.log(showRefundRule)
  //console.log(this.state.checkedPsg)
  return (
    <div>
      <OrderTopPosition
        position="首页 > 订单详情 > 申请退票"
      />
      <RefundFlightInfo
        flightInfos={airData}
        title="申请退票"
      />
      <RefundPassengers
        passengers={passengers}
        refundPsg={refundPsg}
      />
      <RefundPayInfo
        payInfos={payInfos}
      />
      <RefundApplicationForm />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderRefundContainer);
