import React from 'react';
import { connect } from 'react-redux';
import {
  getOrderPassengers,
  getOrderAirData,
  getOrderContact
} from 'selectors/ticketOrderSelector';

import Card from 'components/Card';
import Button from 'components/Button';
import FormInput from 'components/FormInput';
//import NormalPage from 'components/NormalPage';
import OrderTopPosition from 'components/OrderTopPosition';
import OrderChangeStep from '../components/OrderChangeStep';
import OrderChangeTips from '../components/OrderChangeTips';
import OrderChangeItem from '../components/OrderChangeItem';
import OrderChangeContact from '../components/OrderChangeContact';
import OrderChangeFlightInfo from '../components/OrderChangeFlightInfo';
import OrderChangePassengers from '../components/OrderChangePassengers';

import useInput from 'components/useInput';


const mapStateToProps = state => ({
  passengers: getOrderPassengers(state),
  airData: getOrderAirData(state),
  contact: getOrderContact(state)
});
const mapDispatchToProps = {
};

const contentText = '若购票时儿童随成人同行，儿童一定要随成人做更改；若成人与儿童未一起更改，或更改后的行程信息不一致，可能会导致你们不能同行或不能继续旅行，责任由您自己承担';
const OrderChangeConfirmContainer = props => {
  // props
  const {
    passengers,
    airData,
    contact
  } = props;
  // hooks
  const { value, handleInputChange } = useInput();

  const handleNextClick = () => {
    props.history.push({
      pathname: '/Tick_OrderChange_Success'
    });
  };
  const handleCancleClick = () => {
    props.history.goBack();
  };

  return (
    <div className="Ticket_Order_Change_Confirm__Container">
      <OrderChangeStep
        changeStep="confirmAndPay"
        flightSelectFinished
      />
      <OrderTopPosition
        position="首页 > 改期升舱"
      />

      <OrderChangeTips contentText={contentText} />

      <OrderChangeItem
        title="原航班信息"
      >
        <OrderChangeFlightInfo
          airData={airData}
        />
      </OrderChangeItem>

      <OrderChangeItem
        title="新航班信息"
      >
        <OrderChangeFlightInfo />
      </OrderChangeItem>

      <OrderChangeItem
        title="旅客信息"
      >
        <OrderChangePassengers
          isOrderChangeConfirm
          passengers={passengers}
        />
      </OrderChangeItem>

      <OrderChangeItem
        title="联系人信息"
      >
        <OrderChangeContact
          contact={contact}
        />
      </OrderChangeItem>

      <Card
        title="选择支付方式"
      >
        <div className="Order_Change_Confirm_Pay_Methods fixFloat">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
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
        您的支付总额为：<span className="Order_Change_Confirm_Pay_Money">CNY308</span>
      </div>

      <div className="Order_Change_Confirm_Operation_Btn">
        <Button
          handleClick={handleCancleClick}
          style={{ height: '40px', width: '163px', marginRight: '90px' }}
          type="ghost"
        >取消改期升舱</Button>
        <Button
          handleClick={handleNextClick}
          style={{ height: '40px', width: '128px' }}
        >下一步</Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderChangeConfirmContainer);
