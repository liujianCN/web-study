import {post} from '../conf/axios';
import {
orderDetailURL,
orderCancelURL,
reqInsurRefundURL,
reqRefundOrderURL,
errorRefundDetailURL
} from '../conf/api';

//订单详情接口
export const queryOrderDetail = (params) => {
  return post(orderDetailURL, params);
};
//取消订单
export const cancelOrder = (params) => {
  return post(orderCancelURL, params);
};
//保险差错退款
export const reqInsurRefund = (params) => {
  return post(reqInsurRefundURL, params);
};
//机票差错退款
export const reqRefundOrder = (params) => {
  return post(reqRefundOrderURL, params);
};
//查看机票差错退款结果
export const errorRefundDetail = (params) => {
  return post(errorRefundDetailURL, params);
};