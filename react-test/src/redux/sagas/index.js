/* eslint-disable no-unused-vars */

import { put, race, select, take, all, takeLatest, takeEvery, call } from 'redux-saga/effects';
const delay = ms => new Promise(r => setTimeout(r, ms, 'hello 中国大兴'))
//const timeOut = ms => new Promise(r => setTimeout(r, ms, '超时'))
const p = (ms, n) => new Promise(r => setTimeout(r, ms, n+1))
function* testSaga(action) {
  console.log(action);
  //debugger;
  const data = yield delay(3000)
  console.log(data);
  yield put({ type: 'TEST_SAGA', payload: data })
}

/**
 * @description: saga 的race效果：2个异步
 * @method: testSagaRace
 * @param {type} null
 * @return: null
 */
function* testSagaRace() {
  yield take('TEST_SAGA_RACE')
  const { asyncA, asyncB} = yield race({
    asyncA: delay(5000),
    // asyncB: delay(4000) //1，race2个异步
    asyncB: take('TEST_SAGA_CANCEL') //2，取消第一个异步
  })
  //console.log(state);
  if (asyncA) {
    console.log(asyncA);
    yield put({ type: 'TEST_SAGA_COUNTER', payload:'23333'})
    //yield put({{type:'TEST_SAGA',payload:}})
  } else {
    console.log(asyncB);//1，返回异步结果；2，返回action
  }
}

function* saga() {
  yield takeLatest('TEST_SAGA_LATEST', testSaga)
  yield takeLatest('TEST_SAGA_RACE', testSagaRace)

}

/**
 * @description: takeEvery实现记录每一次的action和变化后的结果
 * @method: watchAndLog
 * @param {type} null
 * @return: null
 */
function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()
    // select() 拿到store

    console.log('action', action)
    console.log('state after', state)
  })
}

/**
 * @description: 使用take实现每次的action的变化
 * @method: watchAndLogWithTake
 * @param {type} null
 * @return: null
 */
function* watchAndLogInTake() {
  while (true) {
    const action = yield take('*')
    const state = yield select()
    console.log('action in take', action)
    console.log('state after in take', state)
  }

}

/**
 * @description: 后台任务，每3秒counter+1
 * @method: backgroundTask
 * @param {type} null
 * @return: null
 */
function* backgroundTask() {
  while (true) {
    const state = yield select()
    const counter = state.common.counter
    const res = yield p(3000, counter)
    console.log(res);
    yield put({ type: 'TEST_SAGA_COUNTER', payload: res })
  }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('BACKGROUND_TASK_START')
    yield race({
      task: call(backgroundTask),
      cancel: take('BACKGROUND_TASK_CANCEL')
    })
  }
}

// export default saga
// export default watchAndLog
export default function* rootSaga() {

  yield all([
    //saga(),
    testSagaRace(),
    //watchAndLog(),
    //watchAndLogInTake(),
    //watchStartBackgroundTask()
    //watchAndLogInTake(),
    watchStartBackgroundTask()
  ])
}