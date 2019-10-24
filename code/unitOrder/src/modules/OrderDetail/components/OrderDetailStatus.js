import React,{ memo }from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import indexJS from 'indexJS';

const defaultProps = {
  orderNo: '',
  orderStatus: ''
};

const propsTypes = {
  baggageNum: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.string.isRequired
  ]),
  selectedBag: PropTypes.object.isRequired
};

const TicketDetailStatus = ({ orderNo, orderStatus}) => {
  return (
      <Card
        icon={indexJS.cardTitleIconPointURL}
        title="您的订单已经生成！"
      >
        <div className="OrderDetail_Status__Content">
          <p className="OrderDetail_Status_Id">订单编号：<a href="javascript:void(0);">{orderNo}</a></p>
          <p className="OrderDetail_Status_Tip">我们将以短信和邮件的形式通知您订单出票成功，您的行程将在收到通知后得到确认和保障</p>
          <p className="OrderDetail_Status">订单状态：{orderStatus} {orderStatus?<i style={{backgroundImage:'url(' + indexJS.orderDetailSuccessURL + ')'}}></i>:''}</p>
        </div>
      </Card>
  );
};
TicketDetailStatus.defaultProps = defaultProps;
TicketDetailStatus.propsTypes = propsTypes;
export default memo(TicketDetailStatus);