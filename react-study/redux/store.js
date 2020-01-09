import { createStore, applyMiddleware } from './index.js'
import reducer from './reducer.js';

//最里层的next就是createStore的dispatch
// 最里层的res：next(action)，即createStore的dispatch的返回值。
const logger = ({getState}) => next => action => {
  console.groupCollapsed('进入了logger');
  console.log('action: ',action);
  console.log('preState: ',getState());
  console.groupEnd();
  let res = next(action);
  console.groupCollapsed('离开了logger');
  console.log('action: ',action);
  console.log('nextState: ',getState());
  console.groupEnd();

  return res;
}

const thunk = ({getState, dispatch}) => next => action => {
  if(typeof action === 'function' ){
    return action(dispatch, getState)
  }
  return next(action)
}


const store = createStore(reducer, applyMiddleware(logger, thunk));
// store.subscribe((state) => console.log('订阅1', state.count))
// store.subscribe((state) => console.log('订阅2', state.count))
// debugger
store.dispatch((dispatch) => { 
  setTimeout(() => {
    dispatch({
      type: 'SUB'
    });
  },1000)
})