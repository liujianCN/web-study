import {
  BASE_API,
  ORDER_API
} from 'http';

import {
  BS_RECEIVE_QUERYBAGPAYSTATUS,
  BS_RECEIVE_QUERYBAGORDERSTATUS,
  TS_RECEIVE_PRICECALENDER,
  TS_RECEIVE_AIRPORTLIST,
  TS_RECEIVE_QUERYPAYSTATUS,
  TS_RECEIVE_QUERYORDERSTATUS,
  QUERY_ORDER_DETAIL
} from 'constants/ActionTypes';
import Modal from 'components/Modal';
import qs from 'querystring';

// eg
const API_TEST = 'API/TEST';
export function testPostMessage(param = {}) {
  return async (dispatch) => {
    let { data } = await BASE_API.loginStatus(param);
    if (data.commonRes.isOk) {
      Modal.alert({ content: data.userName });
      dispatch({
        type: API_TEST,
        data
      });
    } else {
      Modal.alert({ content: data.commonRes.channel });
    }
  };
}

// handler
async function resivePostHandler(
  data,
  dispatch,
  actionType,
  callBackFunc,
  callBackFuncParams
) {

  if (data.commonRes.isOk) {
    dispatch && dispatch({
      type: actionType,
      params: data
    });
    callBackFunc &&
      Object.prototype.toString.call(callBackFunc) === '[object Function]' &&
      callBackFunc(callBackFuncParams);
  } else {
    if (
      actionType !== BS_RECEIVE_QUERYBAGPAYSTATUS &&
      actionType !== BS_RECEIVE_QUERYBAGORDERSTATUS &&
      actionType !== TS_RECEIVE_PRICECALENDER &&
      actionType !== TS_RECEIVE_AIRPORTLIST &&
      actionType !== TS_RECEIVE_QUERYPAYSTATUS &&
      actionType !== TS_RECEIVE_QUERYORDERSTATUS
    ) Modal.alert({ content: data.commonRes.message });
  }
}
/**------------------------------------------------- */
/**-------------     公共接口      ------------------ */
/**------------------------------------------------- */
//验证登陆状态
export function checkLoginStatus(params = {}, callBackFunc) {
  return async () => {
    let { data } = await BASE_API.checkLoginStatus(params);
    console.log(data);
    Object.prototype.toString.call(callBackFunc) === '[object Function]' &&
      callBackFunc(data.isOk || (data.commonRes && data.commonRes.isOk));
  };
}

//发送手机验证码
export function sendSignVarifyCode(params = {}, callBackFunc) {
  return async () => {
    let { data } = await BASE_API.getSignVarifyCode(params);
    Object.prototype.toString.call(callBackFunc) === '[object Function]' &&
      callBackFunc(data.commonRes);
  };
}

//登录
export function authRandomPasswordLogin(params = {}, callBackFunc) {
  return async () => {
    let { data } = await BASE_API.authRandomPassword(params);
    Object.prototype.toString.call(callBackFunc) ===
      '[object Function]' && callBackFunc(data.commonRes);
  };
}

/**------------------------------------------------- */
/**-------------     订单详情相关      -------------- */
/**------------------------------------------------- */
//订单详情接口
export function queryOrderDetail(params = {}) {
  return async dispatch => {
    let { data } = await ORDER_API.queryOrderDetail(params);
    await resivePostHandler(data, dispatch, QUERY_ORDER_DETAIL);
  };
}
//退票接口
export function cancelOrder(params, callBackFunc) {
  return async () => {
    let orderData = qs.stringify({ orderNumber: params });
    let { data } = await ORDER_API.cancelOrder(orderData);
    if (data.result === 'success') {
     Modal.alert({
       content: '取消订单成功'
     });
     Object.prototype.toString.call(callBackFunc) === '[object Function]' &&
       callBackFunc();
    } else {
     Modal.alert({
       content: '取消订单失败'
     });
    }
  };
}
//保险差错退款
export function reqInsurRefund(params, callBackFunc) {
  let refundData = qs.stringify(params);
  return async () => {
    let { data, status } = await ORDER_API.reqInsurRefund(refundData);
    console.log(data);
   if (status === 200 || status === 304) {
    Modal.alert({
      content: '您的差错退款申请已提交成功'
    });
    Object.prototype.toString.call(callBackFunc) === '[object Function]' &&
      callBackFunc();
   } else {
    Modal.alert({
      title: status,
      content: '系统繁忙，请稍后重试！'
    });
   }
  };
}
//机票差错退款
export function reqRefundOrder(params, callBackFunc) {
  let orderData = qs.stringify(params);
  return async () => {
    let { data } = await ORDER_API.reqRefundOrder(orderData);
    if (data.result === 'ok') {
      Modal.alert({
        content:
          '你的申请已提交，我司会在10个工作日内对你的申请进行审核，请注意手机短信。'
        // 查看处理结果
      });
      Object.prototype.toString.call(callBackFunc) === '[object Function]' &&
        callBackFunc();
    } else if (data.result === 'error') {
      Modal.alert({
        content: data.errorMessage
      });
    } else {
      Modal.alert({
        content: '接口返回异常，result字段返回错误!'
      });
    }
  };
}
//差错退款申请后查看处理结果
export function checkErrorRefundResult(orderNo, callBackFunc) {
  let orderData = qs.stringify(orderNo);
  console.log(orderData);
  return async () => {
    let { data } = await ORDER_API.errorRefundDetail(orderData);
    if (data.result === 'ok') {
      let retrunData = data.res;
      let paymentGatewayType = '';
      if (retrunData.paymentGatewayType === '002') {
        paymentGatewayType = '支付宝';
      } else if (retrunData.paymentGatewayType === '001') {
        paymentGatewayType = '融易付';
      } else if (retrunData.paymentGatewayType === '003') {
        paymentGatewayType = '银联支付';
      } else if (retrunData.paymentGatewayType === '004') {
        paymentGatewayType = '微信支付';
      } else if (retrunData.paymentGatewayType === '005') {
        paymentGatewayType = '支付宝';
      } else if (retrunData.paymentGatewayType === '006') {
        paymentGatewayType = '微信支付';
      } else if (retrunData.paymentGatewayType === '007') {
        paymentGatewayType = '支付宝';
      } else if (retrunData.paymentGatewayType === '008') {
        paymentGatewayType = '支付宝';
      } else if (retrunData.paymentGatewayType === '009') {
        paymentGatewayType = '电话支付';
      } else if (retrunData.paymentGatewayType === '010') {
        paymentGatewayType = '微信扫码';
      } else if (retrunData.paymentGatewayType === '011') {
        paymentGatewayType = '微信H5';
      } else if (retrunData.paymentGatewayType === '012') {
        paymentGatewayType = '民生信用卡分期支付';
      } else if (retrunData.paymentGatewayType === '013') {
        paymentGatewayType = '民生信用卡快捷支付';
      } else if (retrunData.paymentGatewayType === '014') {
        paymentGatewayType = '对公转账';
      } else {
        paymentGatewayType = '虚拟支付';
      }
      let errRefundStatus = '';
      if (retrunData.errRefundStatus === 'REQUEST') {
        errRefundStatus = '等待审核';
      } else if (retrunData.errRefundStatus === 'AGREE') {
        errRefundStatus = '审核通过';
      } else if (retrunData.errRefundStatus === 'REJECT') {
        errRefundStatus = '审核拒绝';
      } else if (retrunData.errRefundStatus === 'REFUNDED') {
        errRefundStatus = '已退款';
      }
      let refundInfo = {
        paymentGatewayType,
        errRefundStatus,
        payTime: retrunData.payTime,
        amount: retrunData.amountPayBack,
        showErrorRefund: true
      };
      Object.prototype.toString.call(callBackFunc) === '[object Function]' &&
        callBackFunc(refundInfo);
    } else {
      Modal.alert({
        content: '获取差错退款申请单失败'
      });
    }
  };
}
