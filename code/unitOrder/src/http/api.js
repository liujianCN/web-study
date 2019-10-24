/**
 *  基础组件相关接口地址配置
 */
//城市列表相关接口
export const queryAirportURL = '/cuss/pip/book/queryAirportCnAndAb';
//低价日历接口
export const priceClenderURL = '/cuss/pip/book/PriceCalender';



/**
 *  登录注册相关接口
 **/
//获取登录状态
export const loginStatusURL = '/sso/loginStatus.json';


//--------------------------- 订单详情 ------------------------------
// 订单详情
export const orderDetailURL = '/pip/ticketOrder/orderDetail.json';
//取消订单
export const orderCancelURL = '/ticketOrder/ticketOrderCancel.html';
//保险差错退款
export const reqInsurRefundURL = '/anclOrder/reqInsurErrorRefund.json';
//机票差错退款
export const reqRefundOrderURL = '/ticketorder/reqErrorRefund.json';
//查看机票差错退款结果
export const errorRefundDetailURL = '/ticketorder/errorRefundDetail.json';
//报案接口
export const insuranceReportURL = '/ticketorder/viewOrder/reportInsurance.json';