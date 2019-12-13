import React from 'react';
import { connect } from 'react-redux';
import { test_redux, test_thunk, testSagaRace } from 'actions/common'

const mapStateToProps = state => ({
  headerTitle: state.common.headerTitle,
  loading: state.common.loading,
  counter: state.common.counter
})
const mapDispatchToProps = {
  test_redux,
  test_saga: () => ({ type: 'TEST_SAGA_LATEST' }),
  test_thunk,
  testSagaRace,
  testSagaRaceCancel: () => ({ type: 'TEST_SAGA_CANCEL' }),
  testSagaRaceBGStart: () => ({ type: 'BACKGROUND_TASK_START' }),
  testSagaRaceBGCancel: () => ({ type: 'BACKGROUND_TASK_CANCEL' })
}
const Test = (props) => {
  const {
    headerTitle,
    loading,
    counter,
    test_redux,
    //test_thunk,
    test_saga,
    testSagaRaceCancel,

    testSagaRace,
    testSagaRaceBGStart,
    testSagaRaceBGCancel
  } = props;
  //console.log(props);
  const handleTestSaga = () => {
    test_saga();
  }
  //测试 redux
  const handleTestRedux = () => {
    test_redux('hello redux');
  }
  //测试thunk
  const handleTestThunk = () => {
    //test_thunk()
  }
  //开始race
  const handleSagaRace = () => {
    testSagaRace();
  }
  //取消race
  const handleSagaRaceCancel = () => {
    testSagaRaceCancel();
  }
  //开始后台任务
  const handleTestSagaRaceStart = () => {
    testSagaRaceBGStart();
  }
  //取消后台任务
  const handleTestSagaRaceCancel = () => {
    testSagaRaceBGCancel();
  }
  return (
    <div>
      <button onClick={handleTestSaga}>TEST_SAGA</button><br />
      <button onClick={handleTestThunk}>TEST_Thunk</button><br />
      <button onClick={handleTestRedux}>TEST_Redux</button><br />
      <button onClick={handleSagaRace}>开始异步race</button><br />
      <button onClick={handleSagaRaceCancel}>取消race</button><br />
      <button onClick={handleTestSagaRaceStart}>开启后台</button> ----
      <button onClick={handleTestSagaRaceCancel}>关闭后台</button>
      <div>{headerTitle}</div>
      <div>{loading}</div>
      <div>{counter}</div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);