import { call, put, all, takeLatest } from 'redux-saga/effects';
import { post } from 'http/axios';
import history from '@/history';
import HOST from 'CONF';
import Modal from 'components/Modal';
import callbacks from './callbacks';

import {
  CHECK_LOGIN_STATUS,
  QUERY_ORDER_DETAIL,
  CANCEL_ORDER,
  REQUEST_INSURANCE_REFUND,
  REQUEST_ORDER_REFUND
} from 'constants/ActionTypes';
import {
  action_comm_changeLoading,
  action_comm_saveDataToStore
} from 'actions/commonActions';

//console.log(HOST);

function loadingIntercept(url){
  let commonReqUrlList = [
    'loginStatus'
  ].filter(item => url.indexOf(item) !== -1);
  //commonReqUrlList 特殊处理路径匹配 则不加载
  return commonReqUrlList.length > 0;
}

function* fetchData(action) {
  console.log(action);
  try {
    const url = action.conf.url;
    if(!loadingIntercept(url)){
      yield put(action_comm_changeLoading(true));
    }
    const {data} = yield call(
      post,
      HOST+action.conf.url,
      action.p || null
    );
    console.log('saga 拦截的数据--->');
    console.log(data);
    /**
     * 统一处理错误
     */
    const commonRes = data.commonRes;
    if(commonRes &&
      !commonRes.isOk &&
      commonRes.code !== 'BOOK0039'
      ){
      //
      Modal.alert({
        content:data.commonRes.message
      });
    }

  /**
    * 两种情况，
    * 1，请求到数据，存入store，执行下一步操作
    * 2，只请求接口，不存入store数据
  */
    if(!Object.prototype.hasOwnProperty.call(callbacks, action.type)){
      //存入store
      if(data.commonRes.isOk){
        yield put(action_comm_saveDataToStore(action.type, data));
      }
      if(action.nextAction){
        const { nextAction: { actionFn, params, conf} } = action;
        actionFn && actionFn(params, conf);
      }
    }else{
      // eslint-disable-next-line no-debugger
      debugger;
      callbacks[action.type](action, data);
    }

    //如果有跳转
    action && action.navigateTo && action.conf.needJump && data.commonRes.isOk && history.push(action.navigateTo);
    if(!loadingIntercept(url)){
      yield put(action_comm_changeLoading(false));
    }
  } catch (err) {
    console.log('错误信息：');
    console.log(err);
    let { code } = err,
        message = '';
    switch(code){
      case '500':
        message = '错误代码：500，系统错误！';
        break;
      default:
        message = '系统错误';
    }
    //console.log(message);
    Modal.alert({
      content:message
    });
    //yield put(GET_ERROR(e));
    yield put(action_comm_changeLoading(false));
  }
}

function* watchGetPostData() {
  yield takeLatest(CHECK_LOGIN_STATUS, fetchData);
  yield takeLatest(QUERY_ORDER_DETAIL, fetchData);
  yield takeLatest(CANCEL_ORDER, fetchData);
  yield takeLatest(REQUEST_INSURANCE_REFUND, fetchData);
  yield takeLatest(REQUEST_ORDER_REFUND, fetchData);
}
export default function* rootSaga() {
  yield all([
    watchGetPostData()
  ]);
}