import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  getOrderPassengers,
  getOrderAirData,
  getChangePsg,
  getChangeFlight
} from 'selectors/ticketOrderSelector';

import Button from 'components/Button';
//import FormInput from 'components/FormInput';
import Modal from 'components/Modal';

import OrderTopPosition from 'components/OrderTopPosition';
import OrderChangeStep from '../components/OrderChangeStep';
import OrderChangeTips from '../components/OrderChangeTips';
import OrderChangeItem from '../components/OrderChangeItem';
import OrderChangeFlightInfo from '../components/OrderChangeFlightInfo';
import OrderChangePassengers from '../components/OrderChangePassengers';
import OrderChangeFlightList from '../components/OrderChangeFlightList';
import DatePicker from 'components/DatePicker';
//import useInput from 'components/useInput';
const mapStateToProps = state => ({
  passengers: getOrderPassengers(state),
  airData: getOrderAirData(state),
  changePsg: getChangePsg(state),
  changeFlight: getChangeFlight(state)
});
const mapDispatchToProps = {
};

const contentText = '若购票时儿童随成人同行，儿童一定要随成人做更改；若成人与儿童未一起更改，或更改后的行程信息不一致，可能会导致你们不能同行或不能继续旅行，责任由您自己承担';

const OrderDetailContainer = props => {
  const { passengers, airData, changePsg, changeFlight } = props;
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSeletedDate] = useState('');

  const handleBtnSearch = () => {

  };
  const handleNextClick = () => {
    if (!changePsg.length === 0) {
      console.log(this.props.changePsg);
      console.log(this.props.changeFlight);
      Modal.alert({
        content: '请至少选择一位乘客'
      });
      return;
    }
    if (!changeFlight.flightName) {
      Modal.confirm({
        content: '请选择航班',
        onConfirm: () => { props.history.push('/Tick_OrderChange_Confirm'); }
      });
      return;
    }
    props.history.push('/Tick_OrderChange_Confirm');
    console.log('----confirm');
  };

  return (
    <div className="Ticket_Order_Change_Select__Container">
      <OrderChangeStep />
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
        title="旅客信息"
      >
        <OrderChangePassengers
          isOrderChangeSelect
          passengers={passengers}
        />
      </OrderChangeItem>
      <OrderChangeItem
        title="改期升舱选择"
      >
        <div
          className="Ticket_Order_Change_Search_Flight"
        >
          <div className="Ticket_Order_Change_Select_Date_Tip">
            请重新选择出行时间
          </div>
          <div className="Ticket_Order_Change_Select_Date_Input">
            <DatePicker
              onDateChange={date => { setSeletedDate(date); }}
            />
          </div>
          <Button handleClick={handleBtnSearch} style={{ height: '44px', width: '96px' }}>立即查询</Button>
        </div>
      </OrderChangeItem>
      <OrderChangeFlightList />
      <div className="Ticket_Order_Change_Operation_Btn">
        <Button style={{ height: '40px', width: '163px', marginRight: '90px' }} type="ghost">取消改期升舱</Button>
        <Button
          handleClick={handleNextClick}
          style={{ height: '40px', width: '128px' }}
        >下一步</Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailContainer);