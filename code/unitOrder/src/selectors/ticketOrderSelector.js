import { createSelector } from 'reselect';

//获取订单详情的全部state
export const getTicketOrderState = state => state.ticketOrder;

//获取退票乘客
export const getRefundPsg = createSelector(
  getTicketOrderState,
  getTicketOrderState =>{
    return getTicketOrderState.refundCheckedPsg;
  }
);
//获取改升乘客
export const getChangePsg = createSelector(
  getTicketOrderState,
  getTicketOrderState =>{
    return getTicketOrderState.changeCheckedPsg;
  }
);
//获取所选改升航班
export const getChangeFlight = createSelector(
  getTicketOrderState,
  getTicketOrderState =>{
    return getTicketOrderState.changeCheckedFlight;
  }
);

//获取订单详情
export const getOrderDetail = createSelector(
  getTicketOrderState,
  (getTicketOrderState) => {
    return getTicketOrderState.orderDetail;
  }
);
//获取联系人信息
export const getOrderContact = createSelector(
  getOrderDetail,
  orderDetail => {
    return orderDetail.contact;
  }
);
//获取支付信息
export const getOrderPayInfos = createSelector(
  getOrderDetail,
  orderDetail => {
    return orderDetail.payInfos;
  }
);
//获取订单号
export const getOrderNo = createSelector(
  getOrderDetail,
  orderDetail => {
    return orderDetail.orderNo;
  }
);
//获取红包
export const getRedAmount = createSelector(
  getOrderDetail,
  orderDetail => {
    return orderDetail.redAmount;
  }
);
//获取订单状态
export const getOrderStatus = createSelector(
  getOrderDetail,
  orderDetail => {
    return orderDetail.orderStatus;
  }
);
//获取订单渠道
export const getOrderBussinessCode = createSelector(
  getOrderDetail,
  orderDetail => {
    return orderDetail.bussinessCode;
  }
);
//获取订单渠道
export const getOrderStatusCode = createSelector(
  getOrderDetail,
  orderDetail => {
    return orderDetail.statusTypeCode;
  }
);
//获取订单是否是军警残
export const getIsGmjcOrder = createSelector(
  getOrderDetail,
  orderDetail => {
    return orderDetail.isGmjcOrder;
  }
);
//获取的操作code
export const getOrderOperationCode = createSelector(
  getOrderDetail,
  orderDetail => {
    return {
			canBuyAncillary:orderDetail.canBuyAncillary,
			canCancelSeat:orderDetail.canCancelSeat,
			canChange:orderDetail.canChange,
			canChooseSeat:orderDetail.canChooseSeat,
			canRefund:orderDetail.canRefund
		};
  }
);

//获取航班总信息
export const getOrderComponents = createSelector(
  getOrderDetail,
  orderDetail => {
		if(orderDetail.components){
			let {AIR,BAGGAGE,MEAL,INSURANCE} = orderDetail.components;

			let passengers = AIR && AIR.goItinerarys[0].passengers;
			let taxFeeTotals = AIR && AIR.taxFeeTotals;

			let airData=[];
			AIR && airData.push(AIR.goItinerarys);
			AIR && AIR.rtItinerarys && airData.push(AIR.rtItinerarys);

			let baggageData = [];
			BAGGAGE && baggageData.push(BAGGAGE.goItinerarys);
			BAGGAGE && BAGGAGE.rtItinerarys && baggageData.push(BAGGAGE.rtItinerarys);

			let mealData = [];
			MEAL && mealData.push(MEAL.goItinerarys);
			MEAL && MEAL.rtItinerarys && mealData.push(MEAL.rtItinerarys);

			let insuranceData = [];
			INSURANCE && insuranceData.push(INSURANCE.goItinerarys);
			INSURANCE && INSURANCE.rtItinerarys && insuranceData.push(INSURANCE.rtItinerarys);

			return {
				airData,
				baggageData,
				mealData,
				passengers,
				insuranceData,
				taxFeeTotals
			};
		}
		return {};
	}
);

//获取乘机人
export const getOrderPassengers = createSelector(
	getOrderComponents,
	components => {
		return components&&components.passengers;
	}
);

//获取航段信息
export const getOrderAirData = createSelector(
	getOrderComponents,
	components => {
		return components&&components.airData;
	}
);

