import { createStore, applyMiddleware } from './index.js'
import reducer from './reducer.js';

//最里层的next就是createStore的dispatch
const logger = ({getState}) => next => action => {
  console.log('进入了logger');
  console.log(action);
  next(action)
  console.log('离开了logger');
  console.log(getState());
}

const thunk = ({getState, dispatch}) => next => action => {
  console.log('进入thunk');
  if(typeof action === 'function' ){
    return action(dispatch, getState)
  }
  next(action)
  console.log('离开thunk');
}


const store = createStore(reducer, applyMiddleware(logger, thunk));
// store.subscribe((state) => console.log('订阅1', state.count))
// store.subscribe((state) => console.log('订阅2', state.count))
// debugger
store.dispatch((dispatch) => { 
  setTimeout(() => {
    dispatch({
      type: 'SUB'
    })
  },1000)
})