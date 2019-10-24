import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Modal from 'components/Modal';
//import { HOST } from 'CONF';
import { getUrlData } from 'utils/Common';
import {
  queryOrderDetail,
  cancelOrder,
  reqInsurRefund,
  checkErrorRefundResult
} from 'actions/asyncAction';
import {
  getOrderComponents,
  getOrderContact,
  getOrderOperationCode,
  getOrderPayInfos,
  getOrderNo,
  getOrderStatus,
  getIsGmjcOrder,
  getRedAmount,
  getOrderStatusCode
} from 'selectors/ticketOrderSelector';

import { getLoadingStatus } from 'selectors/commonSelector';

import OrderTopPosition from 'components/OrderTopPosition';
import OrderContact from '../components/OrderDetailContact';
import OrderFlightInfo from '../components/OrderDetailFlightInfo';
import OrderDetailOperation from '../components/OrderDetailOperation';
import OrderPayInfo from '../components/OrderDetailPayInfo';
import DetailStatus from '../components/OrderDetailStatus';

const mapStateToProps = (state) => ({
  LoadingStatus: getLoadingStatus(state),
  orderNo: getOrderNo(state),
  orderStatus: getOrderStatus(state),
  components: getOrderComponents(state),
  contact: getOrderContact(state),
  operationCode: getOrderOperationCode(state),
  payInfos: getOrderPayInfos(state),
  isGmjcOrder: getIsGmjcOrder(state),
  redAmount: getRedAmount(state),
  statusTypeOrder: getOrderStatusCode(state)
});

const mapDispathToProps = {
  queryOrderDetail,
  cancelOrder,
  reqInsurRefund,
  checkErrorRefundResult
};

const OrderDetailContainer = (props) => {
  const history = useHistory();
  //const params = useParams();
  const location = useLocation();
  const query = getUrlData(location.search);
  //console.log(params);
  console.log(location);
  //debugger;
  const {
    bussinessCode,
    cancelOrder,
    queryOrderDetail
  } = props;

  console.log(props);
  const initPage = () => {
    console.log('init');

    queryOrderDetail({ orderNo: query.orderNo});
    //queryOrderDetail()
  };

  useEffect(initPage, [query.orderNo]);

  const handleRefund = () => {
    history.push({
      pathname: '/Tick_OrderRefund'
    });
  };
  const handleOrderPay = () => {
    //console.log(props)
    history.push(`/orderDetailPay/${query.orderNo}`);
  };
  const handleOrderChange = () => {
    history.push('/Tick_OrderChange');
  };

  //点击乘机人已改期或已退票跳转
  const goPassenOrder = (detail) => {
    if (detail.afterChangeOrderNo) {
      let orderNo = detail.afterChangeOrderNo;
      history.push(`/orderDetail/?orderNo=${orderNo}`);
    }
  };

  const handleCancel = () => {
    Modal.confirm({
      width: '500px',
      content: '您的订单会在10分钟内随机取消，当日取消订单达3次时，当日不能继续购票',
      onConfirm: () => {
        let orderNo = props.orderNo;
        //cancelTicket(orderNo);
        if (bussinessCode === 'OFFLINE') {
          Modal.alert({
            content: '该项操作不支持线下渠道订单!'
          });
          return;
        }
        cancelOrder(orderNo, initPage);
      }
    });
  };
  const handleInsurErrorRefund = () => {
    Modal.alert({
      content: '退票成功'
    });
  };

  let {
    orderNo,
    orderStatus,
    components, // 航班信息，行李，餐食
    operationCode,
    contact,
    payInfos,
    isGmjcOrder,//军警残
    redAmount,//红包信息
    reqInsurRefund,
    checkErrorRefundResult
  } = props;
  return (
    <div>
      <OrderTopPosition
        position="首页 > 订单中心 > 订单管理 > 机票订单 > 订单详情"
      />
      <DetailStatus
        orderNo={orderNo}
        orderStatus={orderStatus}
      />
      <OrderFlightInfo
        checkErrorRefundResult={checkErrorRefundResult}
        components={components}
        goPassenOrder={goPassenOrder}
        payInfos={payInfos}
        reqInsurRefund={reqInsurRefund}
      />
      <OrderDetailOperation
        handleCancel={handleCancel}
        handleInsurErrorRefund={handleInsurErrorRefund}
        handleOrderChange={handleOrderChange}
        handleOrderPay={handleOrderPay}
        handleRefund={handleRefund}
        isGmjcOrder={isGmjcOrder}
        operationCode={operationCode}
        orderStatus={orderStatus}
      />
      <OrderContact
        contact={contact}
      />
      {
        payInfos && payInfos.length != 0 &&
        <OrderPayInfo
          payInfos={payInfos}
          redAmount={redAmount}
        />
      }
    </div>
  );
};

export default connect(mapStateToProps, mapDispathToProps)(OrderDetailContainer);