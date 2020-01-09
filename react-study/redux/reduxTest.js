// 打印日志中间件
function patchStoreToAddLogging(store) {
  let next = store.dispatch //此处也可以写成匿名函数    
  store.dispatch = function dispatchAndLog(action) {
    console.log('next state', store.getState())
    let result = next(action)
    return result
  }
}

// 监控错误中间件
function patchStoreToAddCrashReporting(store) {
  //这里取到的dispatch已经是被上一个中间件包装过的dispatch, 从而实现中间件串联    
  let next = store.dispatch
  store.dispatch = function dispatchAndReportErrors(action) {
    try {
      console.log(123);
      return next(action)
    } catch (err) {
      console.error('捕获一个异常!', err)
      throw err
    }
  }
}

/** 
 * patchStoreToAddLogging(store)
 * patchStoreToAddCrashReporting(store)
 * 可以实现dispatch的改造和串联，
 */

/**
 * 可以改造一下，不在每个中间件里替换store的dispatch， 而是返回一个新的dispatch函数
 */

function logger(store) {
  let next = store.dispatch;
  console.log('next state', store.getState())
  return (action) => {
    return next(action)
  }
}

function thunk(store) {
  let next = store.dispatch;
  return (action) => {
    if (typeof action === 'function') {
      return action(store)
    }
    return next(action)
  }
}

/**
 * 增加一个辅助方法，applyMiddleware，用于添加所有的中间件。
 */
function applyMiddleware(store, middlewares) {
  middlewares = [...middlewares];
  middlewares.reverse(); //能够保证串联的中间件的执行顺序。
  middlewares.foreach(middleware => {
    store.dispatch = middleware(store)
  })
}

// applyMiddleware(store, [thunk, logger])

/**
 * 至此完成了简单的中间件的实现, 但是还不够纯
 */

/**
 * 先改造createStore
 */

function createStore(reducer, applyMiddleware) {
  applyMiddleware(createStore)(reducer)
}

/**
 * 改造中间件，柯里化，用参数传递next。
 * next就是dispatch
 */

logger = store => next => action => {
  console.log('进入logger');
  let res = next(action)
  console.log('离开logger');
  return res;
}

thunk = store => next => action => {
  console.log('进入thunk');
  let res = next(action)
  console.log('离开thunk');
  return res
}

redux = store => next => action => {
  console.log('进入redux');
  let res = next(action)
  console.log('离开redux');
  return res
}

/**
 * 改造applyMiddleware
 */

function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      const store = createStore(reducer)
      let {
        getState,
        dispatch
      } = store
    }
    const params = {
      getState,
      dispatch: (action) => dispatch(action)
      //解释一下这里为什么不直接 dispatch: dispatch      
      //因为直接使用dispatch会产生闭包,导致所有中间件都共享同一个dispatch,如果有中间件修改了dispatch或者进行异步dispatch就可能出错    
    }
    const middlewareArr = middlewares.map(middleware => middleware(params))
    dispatch = compose(...middlewareArr)(dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
//compose这一步对应了middlewares.reverse(),是函数式编程一种常见的组合方法
function compose(...fns) {
  if (fns.length === 0) return arg => arg
  if (fns.length === 1) return fns[0]
  return fns.reduce((res, cur) => (...args) => res(cur(...args)))
}

// const { getState, dispatch } = store;
// const params = {
//   getState,
//   dispatch: (action) => dispatch(action)
// }
// 
// middlewareArr = middlewares.map(middleware => middleware(params));
// 等同于
// middlewareArr = [logger(params), thunk(params), redux()]

//dispatch = compose(...middlewareArr)(dispatch)

// dispatch = compose(l, t, r)(dispatch)

// function compose(...fns) {
//   if (fns.length === 0) return arg => arg
//   if (fns.length === 1) return fns[0]
//   return fns.reduce((res, cur) => (...args) => res(cur(...args)))
// }

// compose伪代码

function dispatch(action) {
  console.log(action);
}
var l = next => action => {
  console.log('进入l');
  return next(action)
}
var t = next => action => {
  console.log('进入t');
  return next(action)
}

var r = next => action => {
  console.log('进入r');
  return next(action)
}

// var lt = compose(l, t)
lt = arg => l(t(arg))

ltr = arg => lt(r(arg))

ltr = arg => (arg => l(t(arg)))(r(arg))

ltr = arg => l(t(r(arg)));
// dispatch = lt(dispatch)
/**
 * 1
 * action => {
 *  console.log('进入r');
 *  return dispatch(action)
 * }
 */

/**
 * 2
 * action => {
 *   console.log('进入t');
 *   return 1(action)
 * }
 */

/**
 * 3
 * action => {
 *  console.log('进入l')
 *  return 2(action)
 * }
 * 
 */
dispatch = ltr(dispatch)

dispatch({
  t: 'lt'
})