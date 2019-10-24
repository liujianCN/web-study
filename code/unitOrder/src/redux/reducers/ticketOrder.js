import {
  QUERY_ORDER_DETAIL,
  RD_SAVE_ORDER_REFUND_CHECKED_PSG,
  CU_SAVE_ORDER_CHANGE_CHECKED_PSG,
  CU_SAVE_ORDER_CHANGE_CHECKED_FLIGHT
} from 'constants/ActionTypes';
//import {test} from  '../../modules/Start/test'

let initState={
  // orderDetail:test.orderDetail,//订单详情所有数据
  orderDetail:{},//订单详情所有数据
  refundCheckedPsg:[],//退票乘客
  changeCheckedPsg:[],//改期乘客
  changeCheckedFlight:{}//改期航班

};
export default function reducer(state = initState, action) {
  switch (action.type) {
    case `RECEIVE_POSTS_${QUERY_ORDER_DETAIL}`: {
      let orderDetail = action.data;
      delete orderDetail.commonRes;
      return {
        ...state,
        orderDetail: orderDetail.pipOrderDetail
      };
    }
    case RD_SAVE_ORDER_REFUND_CHECKED_PSG: {
      let refundCheckedPsg = action.params;
      console.log(refundCheckedPsg);
      return {
        ...state,
        refundCheckedPsg
      };
    }
    case CU_SAVE_ORDER_CHANGE_CHECKED_PSG: {
      let changeCheckedPsg = action.params;
      console.log(changeCheckedPsg);
      return {
        ...state,
        changeCheckedPsg
      };
    }
    case CU_SAVE_ORDER_CHANGE_CHECKED_FLIGHT: {
      let changeCheckedFlight = action.params;
      console.log(changeCheckedFlight);
      return {
        ...state,
        changeCheckedFlight
      };
    }
    default:
      return state;
  }
}