function compose(...enhancers) {
  console.log(enhancers);
  if( enhancers.length === 0 ) return arg => arg;
  if( enhancers.length === 1 ) return enhancers[0]
  return enhancers.reduce( ( res, cur) => arg => res(cur(arg)))
}

export default function applyMiddleware(...enhancers){
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer);
      let {dispatch, getState} = store;
      let chain = []
      const middlewareApi = {
        getState,
        dispatch: action => dispatch(action)
      }
      chain = enhancers.map(item => {
        return item(middlewareApi)
      });
      dispatch = compose(...chain)(dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}