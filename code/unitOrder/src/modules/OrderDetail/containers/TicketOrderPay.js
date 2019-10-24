import React, { useEffect } from 'react';
//import { connect } from 'react-redux';
//import { ORDER_API } from 'http';
import useInput from 'components/useInput';

import Card from 'components/Card';
import Button from 'components/Button';
import FormInput from 'components/FormInput';
import OrderTopPosition from 'components/OrderTopPosition';

//const contentText = '若购票时儿童随成人同行，儿童一定要随成人做更改；若成人与儿童未一起更改，或更改后的行程信息不一致，可能会导致你们不能同行或不能继续旅行，责任由您自己承担';

const OrderChangeConfirmContainer = (props) => {
  const { value, handleInputChange } = useInput('');

  useEffect(() => {

  },[]);
  // handleBtnSearch(){

  // }
  function handleNextClick() {
    props.history.push({
      pathname: '/Tick_OrderChange_Success'
    });
  }
  //function handleCancleClick() {
  //  props.history.goBack()
  //}


  return (
    <div>
      <OrderTopPosition
        position="首页 > 订单详情 > 订单支付"
      />
      <Card
        title="您的订单已经生成！"
      >
        <div className="Order_Pay__Content">
          <p>我们将为您保留15分钟，请尽快完成支付。</p>
          <p className="Order_Pay_Tips">我们将通过短信及邮件方式通知您订单出票成功，您的行程将在收到通知后得到确认和保障</p>
          <p className="Order_Pay_OrderNo">订单编号：<a href="javascript:void(0);">20J7P1Q0MJX0</a></p>
        </div>
      </Card>
      <Card
        title="选择支付方式"
      >
        <div className="Order_Change_Confirm_Pay_Methods fixFloat">
          <div>支付宝</div>
          <div>微信</div>
          <div>易宝</div>
        </div>
        <div className="Order_Change_Confirm_Pay_Tips">
          <ol>
            <li>网上支付即需在网上完成付款，一般适用于已开通网上银行的储蓄卡、信用卡等，具体情况各直连银行、各第三方支付平台有差异，请咨询各银行。</li>
            <li>预定24小时外的航班，请您务必在订单生成后15分钟内完成支付；预定24小时（含）内的航班，请在订单生成后15分钟内完成支付。超过规定时间完成付款，我们无法保证座位。请在下面选择支付银行，尽快完成付款。</li>
            <li>支付完成后，若未能正常显示出票成功页面，请您先到“我的订单”中查询订单状态是否为“完成购票（已出票）”，如不是，请及时联系我们的客服。</li>
            <li>若出现无法弹出支付窗口的情况，请您查看是否为浏览器禁用了弹出窗口。</li>
          </ol>
        </div>
      </Card>
      <Card
        title="选择行程单配送方式"
      >
        <div className="Order_Change_Confirm_Pay_Itinerary">
          <div className="Order_Change_Confirm_Pay_Itinerary_Type fixFloat">
            <div>
              <FormInput
                checked={value === 'need'}
                handleInputChange={handleInputChange}
                type="radio"
                value="need"
              />
            </div>
            <div className="Order_Change_Confirm_Pay_Itinerary__Yes">不需要行程单</div>
            <div className="Order_Change_Confirm_Pay_Itinerary__Text">
              <p>由于网上销售的机票为电子机票，如您不需要报销，请凭购票时登记的有效身份证件直接办理乘机手续和登机即可</p>
            </div>
          </div>
          <div className="Order_Change_Confirm_Pay_Itinerary_Type fixFloat">
            <div>
              <FormInput
                checked={value === 'noNeed'}
                handleInputChange={handleInputChange}
                type="radio"
                value="noNeed"
              />
            </div>
            <div className="Order_Change_Confirm_Pay_Itinerary__No">邮寄行程单</div>
            <div className="Order_Change_Confirm_Pay_Itinerary__Text">
              <p>行程单在客票全部使用完成后5个工作日内，拨打我司客服电话400-102-6666联系邮寄行程单。</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="Order_Change_Confirm_Pay_Amount">
        您的支付总额为：<span className="Order_Change_Confirm_Pay_Money">￥ 308</span>
      </div>

      <div className="Order_Change_Confirm_Operation_Btn">
        <Button
          handleClick={handleNextClick}
          style={{ height: '40px', width: '128px' }}
        >下一步</Button>
      </div>
    </div>
  );
};

export default OrderChangeConfirmContainer;