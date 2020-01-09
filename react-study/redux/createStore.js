export default function createStore(reducer, initialState, enhancer) {
  if(typeof initialState === 'function' && typeof enhancer === 'undefined'){
    enhancer = initialState;
    initialState = undefined;
  }
  if(typeof enhancer !== 'undefined'){
    if(typeof enhancer === 'function') {
      return enhancer(createStore)(reducer)
    }
  }
  let curState = initialState;
  let currentListeners = []

  function getState() {
    return curState
  }

  function dispatch(action) {
    curState = reducer(curState, action);
    currentListeners.forEach(listener => listener(curState))
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  dispatch({ type: '@@REDUX_INIT' })

  return {
    getState,
    dispatch,
    subscribe
  }
}