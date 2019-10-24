import qs from 'querystring';
import {
  loginStatusURL,
  orderDetailURL,
  orderCancelURL,
  reqInsurRefundURL,
  reqRefundOrderURL,
  errorRefundDetailURL
} from 'http/api';

import {
  CHECK_LOGIN_STATUS,
  QUERY_ORDER_DETAIL,
  CANCEL_ORDER,
  REQUEST_INSURANCE_REFUND,
  REQUEST_ORDER_REFUND,
  CHECK_ORDER_ERROR_REFUND

} from 'constants/ActionTypes';

const APICONFIG = {
  [CHECK_LOGIN_STATUS]: {
    url: loginStatusURL
  },
  [QUERY_ORDER_DETAIL]: {
    url: orderDetailURL
  },
  [CANCEL_ORDER]: {
    url: orderCancelURL
  },
  [REQUEST_INSURANCE_REFUND]: {
    url: reqInsurRefundURL
  },
  [REQUEST_ORDER_REFUND]: {
    url: reqRefundOrderURL
  },
  [CHECK_ORDER_ERROR_REFUND]: {
    url: errorRefundDetailURL
  }
};

//检查登陆状态
export function checkLoginStatus() {
  return {
    type: CHECK_LOGIN_STATUS,
    conf: APICONFIG[CHECK_LOGIN_STATUS]
  };
}

/**------------------------------------------------- */
/**-------------     订单详情相关      -------------- */
/**------------------------------------------------- */

//订单详情接口
export function queryOrderDetail(p = {}) {
  return {
    type: QUERY_ORDER_DETAIL,
    conf: APICONFIG[QUERY_ORDER_DETAIL],
    p
  };
}

//取消订单接口
export function cancelOrder(p, callback) {
  let orderData = qs.stringify({ orderNumber: p });
  return {
    type: CANCEL_ORDER,
    conf: APICONFIG[CANCEL_ORDER],
    p: orderData,
    callback
  };
}

//保险差错退款
export function reqInsurRefund(p, callback) {
  let refundData = qs.stringify(p);
  return {
    type: REQUEST_INSURANCE_REFUND,
    conf: APICONFIG[REQUEST_INSURANCE_REFUND],
    p: refundData,
    callback
  };
}

//机票差错退款
export function reqRefundOrder(p, callback) {
  let orderData = qs.stringify(p);
  return {
    type: REQUEST_ORDER_REFUND,
    conf: APICONFIG[REQUEST_ORDER_REFUND],
    p: orderData,
    callback
  };
}

//机票差错退款申请后查看处理结果
export function checkErrorRefundResult(p, callback) {
  let orderData = qs.stringify(p);
  return {
    type: CHECK_ORDER_ERROR_REFUND,
    conf: APICONFIG[CHECK_ORDER_ERROR_REFUND],
    P: orderData,
    callback
  };
}