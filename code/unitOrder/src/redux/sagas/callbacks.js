import Modal from 'components/Modal';
import {
  CANCEL_ORDER,
  REQUEST_INSURANCE_REFUND,
  REQUEST_ORDER_REFUND,
  CHECK_ORDER_ERROR_REFUND
} from 'constants/ActionTypes';

const callbacks = {

  //取消订单
  [CANCEL_ORDER]: (action, data) => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (data.result === 'success') {
      Modal.alert({
        content: '取消订单成功'
      });
      const { callback } = action;
      typeof callback === 'function' && callback();
    } else {
      Modal.alert({
        content: '取消订单失败'
      });
    }
  },

  //保险差错退款
  [REQUEST_INSURANCE_REFUND]: (action, data) => {
    if (data) {
      Modal.alert({
        content: '您的差错退款申请已提交成功'
      });
      const { callback } = action;
      typeof callback === 'function' && callback();
    } else {
      Modal.alert({
        title: status,
        content: '系统繁忙，请稍后重试！'
      });
    }
  },

  //机票差错退款
  [REQUEST_ORDER_REFUND]: (action, data) => {
    if (data.result === 'ok') {
      const { callback } = action;
      Modal.alert({
        content:
          '你的申请已提交，我司会在10个工作日内对你的申请进行审核，请注意手机短信。'
        // 查看处理结果
      });
      typeof callback === 'function' && callback();
    } else if (data.result === 'error') {
      Modal.alert({
        content: data.errorMessage
      });
    } else {
      Modal.alert({
        content: '接口返回异常，result字段返回错误!'
      });
    }
  },

  //差错退款申请后查看处理结果
  [CHECK_ORDER_ERROR_REFUND]: (action, data) => {
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
      const { callback } = action;
      const refundInfo = {
        paymentGatewayType,
        errRefundStatus,
        payTime: retrunData.payTime,
        amount: retrunData.amountPayBack,
        showErrorRefund: true
      };
      typeof callback === 'function' && callback(refundInfo);
    } else {
      Modal.alert({
        content: '获取差错退款申请单失败'
      });
    }
  }
};
export default callbacks;