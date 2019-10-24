import {
  RD_SAVE_ORDER_REFUND_CHECKED_PSG,
  CU_SAVE_ORDER_CHANGE_CHECKED_PSG,
  CU_SAVE_ORDER_CHANGE_CHECKED_FLIGHT
} from 'constants/ActionTypes';

//存放需要退票的乘机人
export function action_to_save_refund_checked_psg(params) {
  return { type: RD_SAVE_ORDER_REFUND_CHECKED_PSG, params };
}
//存放需要改升的乘机人
export function action_to_save_change_checked_psg(params) {
  return { type: CU_SAVE_ORDER_CHANGE_CHECKED_PSG, params };
}
//存放要改升的航班
export function action_to_save_change_checked_flight(params) {
  return { type: CU_SAVE_ORDER_CHANGE_CHECKED_FLIGHT, params };
}
