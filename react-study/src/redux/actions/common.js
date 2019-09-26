export const test_redux = payload => {
  return {
    type: 'TEST_REDUX',
    payload
  }
}

export const test_thunk = () => {
  console.log('tttttt');
  return async dispatch => {
    const res = await new Promise(r=>{
      setTimeout( r,1000,'测试thunk')
    })
    //await dispatch({type: 'TEST_REDUX', payload: res});
    dispatch({type: 'TEST_REDUX', payload: res});
    // console.log('kkkkkkk');
    // const data = await new Promise(r=>{
    //   setTimeout( r,3000,'欢迎中国大兴')
    // })
    // dispatch({type: 'TEST_SAGA', payload: data});
  }
}

export const testSagaRace = payload => ({
  type:'TEST_SAGA_RACE',
  payload
})