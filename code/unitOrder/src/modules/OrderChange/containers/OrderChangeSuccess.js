import React from 'react';
//import { connect } from 'react-redux';

import Card from 'components/Card';
import Button from 'components/Button';
import OrderChangeStep from '../components/OrderChangeStep';

const OrderChangeSuccessContainer = () => {

  function handleNextClick(){
  }
  return (
    <div className="Ticket_Order_Change_Success__Container" >
      <OrderChangeStep
        changeStep="changedSuccess"
        confirmAndPayFinished
        flightSelectFinished
      />
      <div className="Ticket_Order_Change_Position">
        <span>您的位置： </span>
        <a href="/">首页</a>
        <span> > </span>
        <span>改期升舱</span>
      </div>

      <Card
        title="改升出票完成"
      >
        <div className="Order_Change_Success_Info">
          <div className="Order_Change_Success_Info_Detail">
            <span>订单编号 ： </span>
            <a href="#">793049jcs38742734</a>
            <span>票号 ： </span>
            <span className="Order_Change_Success_Info_Passengers">测试/822987654898</span>
            <span className="Order_Change_Success_Info_Passengers">测试/822987654898</span>
            <span className="Order_Change_Success_Info_Passengers">测试/822987654898</span>
            <p>我们将通过短信和邮件的方式通知您订票出票成功，您的行程将在收到通知后得到确认和保障</p>
            <p className="Order_Change_Success_Pay_Amount"><span>您的支付总额 ： ￥308</span></p>
            <Button
              handleClick={handleNextClick}
            >查看订单</Button>
          </div>
        </div>
        <div className="Order_Change_Success_Tips">
          <ol>
            <li><span>国内航班</span>建议您在航班起飞<span>前90分钟</span>（国际航班建议您<span>提前150分钟</span>）到达机场办理登机手续，具体提前办理乘机手续时间以机场公布为准，您也可提前一天在网上办理</li>
            <li>如需报销行程单</li>
          </ol>
        </div>
      </Card>
    </div>
  );
};

export default OrderChangeSuccessContainer;
