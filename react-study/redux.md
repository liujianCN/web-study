# Redux基础

JavaScript应用程序的可预测状态容器

## 安装

- script引入



- `npm` 或者`yarn` 安装

  ```
  npm i redux -S
  //或者
  yarn add redux
  ```


## 三项原则

- #### 单一数据源

  整个应用的state存在store的对象树中

- #### 状态只读

  更改状态的唯一方法是触发一个action，一个描述了发生了什么的对象

- #### 只能使用纯函数进行更改

  更改状态的reducer必须是一个纯函数，它接收上一个状态和一个动作返回下一个状态，返回的是一个新的状态也不是上一个状态的修改



## Actions

Actions是信息的有效负载，这些信息将被从应用程序发送到store，它是store的唯一数据来源，

```
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

action是普通的JavaScript对象，必须有`type`指定动作的类型，通常为字符串常量。

- Action Creators

  - 在`redux`里Action Creators仅仅返回一个`action`

  ```js
  function addTodo(text) {
    return {
      type: ADD_TODO,
      text
    }
  }
  ```

  - 在传统的flux里，Action Creators调用时就派发action

  ```js
  function addTodoWithDispatch(text) {
    const action = {
      type: ADD_TODO,
      text
    }
    dispatch(action)
  }
  ```

  - 但在`redux`里要派发action，需要将Action Creators调用的结果传给dispatch
  - 或者创建一个action动作绑定器，自动派发action

  ```js
  dispatch( addTodo(text))
  //或者
  const addTodoWithDispatch = text => dispatch(addTodo(text))
  
  ```



## Reducer

store的state如何变化，Actions描述了发生了什么，而Reducer描述了store如何变化。

- 设计状态

  `redux`里的状态都存储为单个对象

  ```js
  {
    visibilityFilter: 'SHOW_ALL',
    todos: [
      {
        text: 'Consider using Redux',
        completed: true
      },
      {
        text: 'Keep all state in a single tree',
        completed: false
      }
    ]
  }
  ```

- 处理action

  编写Reducer：其与Array.prototype.reduce(reducer,initialValue)的reducer类似

  ```
  （previousState，action）=> newState;
  ```

  reducer保持纯净非常重要，不能在reducer里做如下操作：

  - 改变传入的参数
  - 执行副作用：例如接口请求，路由跳转。
  - 调用非纯函数：例如`new Date() 或 Math.random()`

- `combineReducers`

  在reducer的逻辑过多时，需要分割reducer时，`redux`提供了一个`combineReducers`，用于分割reducer

  ```js
  import { combineReducers } from 'redux'
  
  const todoApp = combineReducers({
    visibilityFilter,
    todos
  })
  
  export default todoApp
  
  //请注意，这等效于：
  
  export default function todoApp(state = {}, action) {
    return {
      visibilityFilter: visibilityFilter(state.visibilityFilter, action),
      todos: todos(state.todos, action)
    }
  }
  ```


- 源代码

  ```js
  import { combineReducers } from 'redux'
  import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
  } from './actions'
  const { SHOW_ALL } = VisibilityFilters
  
  function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter
      default:
        return state
    }
  }
  
  function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return [
          ...state,
          {
            text: action.text,
            completed: false
          }
        ]
      case TOGGLE_TODO:
        return state.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      default:
        return state
    }
  }
  
  const todoApp = combineReducers({
    visibilityFilter,
    todos
  })
  
  export default todoApp
  ```


## Store

有了`Actions`和`Reducer`，需要使用`Store`将他们整合起来。Store需要功能：

- 保存`state`
- 允许访问`state`，通过`getState()`
- 允许state更新，通过`dispatch()`
- 注册监听，通过`subScribe(listener)`
- 注销监听，通过返回`subScribe(listener)`

应用程序中只有一个store，拆分处理逻辑时，使用`combineReducers`



- #### 创建store

  ```js
  import { createStore } from 'redux';
  import todoApp from './reducers';
  
  const store = createStore(todeApp);
  ```

- #### 获取store

  ```js
      const { createStore } = Redux;
      const initialState = [
        {
          title: '待办事项1'
        }
      ]
      const todoApp = (state = initialState, action) => {
        switch (action.type) {
          case 'ADD_TODO':
            return [
              ...state,
              action.text
            ];
          default:
            return state;
        }
      }
      const store = createStore(todoApp);
  	//获取state
      console.log(store.getState());
  	//派发action
      const add = text => store.dispatch({type:'ADD_TODO',text});
  	//监听函数
      const s = () => console.log(store.getState());
      const subscribe = store.subscribe( s )
  ```



## 单项数据流

`redux`遵循严格的单项数据流。

任何`redux`应用的生命周期都遵循下面4个步骤。

1. `dispatch(action)`

   一个action是一个普通对象，描述了发生了什么。

   ```
    { type: 'LIKE_ARTICLE', articleId: 42 }
    { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
    { type: 'ADD_TODO', text: 'Read the Redux docs.' }
   ```

2.  `Redux` 调用你传入的`Reducer`

   `store`将会给`Reducer`传入2个参数：当前`state树`和当前派发的`acton`，

   ```
   // 当前的state树
   let previousState = {
     visibleTodoFilter: 'SHOW_ALL',
     todos: [
       {
         text: 'Read the docs.',
         complete: false
       }
     ]
   }
   
   // 当前正在执行的action
   let action = {
     type: 'ADD_TODO',
     text: 'Understand the flow.'
   }
   
   // Reducer处理数据，返回新的state树
   let nextState = todoApp(previousState, action)
   ```

3. `combineReducers`可以将多个`reducer`合并到一个state树上

   ```js
   function todos(state = [], action) {
     // Somehow calculate it...
     return nextState
   }
   
   function visibleTodoFilter(state = 'SHOW_ALL', action) {
     // Somehow calculate it...
     return nextState
   }
   
   let todoApp = combineReducers({
     todos,
     visibleTodoFilter
   })
   ```

   当您发出动作时，由`combineReducers`返回`todoApp`将调用两个reducer：

   ```js
   let nextTodos = todos(state.todos, action)
   let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)
   
   复制
   ```

   然后它将两个结果集合并为一个状态树：

   ```js
   return {
     todos: nextTodos,
     visibleTodoFilter: nextVisibleTodoFilter
   }
   ```

4. store保存由根Reducer返回的完整state树。

   这个新的state树，就是你的应用的下一个状态，每一个通过`store.sunscribe(listener)`的监听函数，都在这时被调用。



# Redux进阶

有这样一个问题？我们之前用的`Redux`都是在`Action`发出之后立即执行`Reducer`,计算出`state`,这是同步操作。如果想异步操作呢？即过一段时间再执行`Reducer`怎么办？这里就需要用到中间件`middleware`。

先放一张图看看：

![img](C:\Users\liuji\Desktop\web-study\image\162dcb142c194bfb-1570113234779)

## 中间件

`Redux` 是有流程的，将异步操作放在哪一个流程内比较合适呢

1. `Reducer`只承担计算`state`的功能，不适合其他功能。
2. `view`与`state`对应，可以看作是state的视觉层，也不适合。
3. `Action`只是一个普通JavaScript对象，被派发，也不适合。

只有`dispatch`比较适合，如何在`dispatch`里添加其他操作：

```js
let next = store.dispatch;
store.dispatch = function(action) {
    console.log('旧state'：store.getState())
    next(action)
    console.log('新state'：store.getState())
}
```

上面的代码中，重写了store的dispatch，在dispatch的前后输出state，这是中间件的雏形。

- #### 中间件的使用方法

  ```
  import {applyMiddleware,createStore} from 'redux';
  import reduxLogger form 'redux-logger';
  
  const store = reateStore(reducer,inital_state,applyMiddleware(thunk,reduxLogger));
  
  ```

- #### `applyMiddleware`内部原理

  ```
  //
  ```


常用中间件：

- `redux-thunk`，`redux-saga`

  处理异步操作

- `redux-logger`

  监听store的每一次的action派发并打印

​		

1. ### `redux-thunk`

   一个通用的异步解决方案，核心是判断`action`是否为函数，如果是函数，就执行这个函数。

   ```js
   //redux-thunk源代码
   function createThunkMiddleware(extraArgument) {
     return ({ dispatch, getState }) => (next) => (action) => {
       if (typeof action === 'function') {
         return action(dispatch, getState, extraArgument);
       }
   
       return next(action);
     };
   }
   
   const thunk = createThunkMiddleware();
   thunk.withExtraArgument = createThunkMiddleware;
   
   export default thunk;
   ```

   使用`redux-thunk`

   ```js
   //Action Creator
   const fetchData = p => {
       return async (dispatch,getState) => {
           let data = await fetch('xxxx');
           dispatch(type:'RECIVE_DATA',data)
       }
   }
   ```

   ```js
   //调用
   dispatch(fetchData(p))
   
   ```


2. `redux-saga`

   `redux-saga`是一个使应用程序的副作用（例如：异步请求，访问浏览器缓存等）更易于管理，更有效的执行，易于测试和故障处理的库。

   它像是应用程序的一个单独线程一样，仅仅负责副作用。

   示例：

   ```js
   //mySaga.js
   import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
   function* fetchData(action) {
       try{
       	const data = yeild call(axios, URl, p);
           yeild put({type:'RECEIVE_DATA'，data})
       }catch(err){
           yeild put({type:'ERROR'， message: err.message})
       }
   
   }
   // 执行每一次的take，放在请求队列里
   function* mySaga() {
     yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
   }
   
   /*
   	另外你也可以使用 takeLatest。
   	只执行最后的一次take
   */
   function* mySaga() {
     yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
   }
   export default mySaga;
   ```

   ```js
   //store.js
   //创建store，使用saga中间件，运行mySaga
   import { createStore, applyMiddleware } from 'redux';
   import { createSagaMiddleware } from 'redux-saga';
   import mySaga from './mySaga';
   import rootReducer from './reducer';
    
   const sagaMiddleware = createSagaMiddleware();
   const store = createStore(
       rootReducer,
   	applyMiddleware(sagaMiddleware)
   )
   //执行mySaga
   sagaMiddleware.run(mySaga);
   
   export default store;
   
   ```

- saga helper

  ```
  takeEvery，takeLastest
  ```

- 声明式的effects

  ```
  put, call, take, fork,
  ```

- effects组合

  ```
  race，all
  ```








## react-redux

`react-redux`是一个连接`React`和`Redux`的库，使React程序更方便的从`redux`里获取`state`，和派发`action`更新`store`里的数据。

- 为什么需要 `react-redux`

  `redux`是一个独立的库，尽管经常与`react`一起使用，但它们是彼此独立的，`redux`可以和其他的框架一起使用，无论`redux`与哪个UI库绑定一起，通常都是使用`UI绑定`库将UI和`Redux`绑定在一起，而不是直接通过UI代码直接与store进行交互。

  无论将Redux与什么UI库进行绑定都需要如下步骤：

  1. 创建Store
  2. 订阅更新
  3. 在订阅更新的回调中，
     1. 获取state
     2. 提取当前组件所需要的state
     3. 使用数据更新视图
     4. 派发action更新数据

  **尽管可以手动编写此逻辑，但这样做会变得非常重复。另外，优化UI性能将需要复杂的逻辑。**

### mapStateToProps

传递给`connect`的第一个参数，它从store中取出当前组件所需要的数据，通常使用`mapState`简称。

- 每当state更改时都会调用它
- 它接受整个state，并返回当前所需要的state。

定义`mapStateToProps`，箭头函数或function都行，接受`state`和`ownProps`，返回一个包含当前组件所需的state的对象。

- #### state

  第一个参数是整个`Redux`所存储的state（与调用`store.getState()`的返回值相同），`mapState`必须传入state。

- #### ownProps(可选)

  如果组件取回的state，需要组件自身的props里传入的数据，则可传入第二个参数，

  > 不必将`ownProps`加到`mapState`返回的数据中，`react-redux`会自动合并不同来源的props

```js
//接受state和ownProps，返回一个包含当前组件所需的state的对象
function mapState = (state, ownProps) => {
  	const { todos } = state
  	return { todoList: todos.allIds }
}
//或者
const mapState = (state, ownProps) => {
	const { visibilityFilter } = state
  	const { id } = ownProps
  	const todo = getTodoById(state, id)

  	return { todo, visibilityFilter }
}
```
- #### 返回值确定您的组件是否重新渲染

  `react-redux`在内部实现了该`shouldComponentUpdate`方法，以便在组件所需的数据发生更改时，包装器组件可以准确地重新渲染。默认情况下，`react-redux`在通过对返回的对象的每个字段`mapStateToProps`进行`===`比较（“浅相等性”检查）来确定返回的对象的内容是否不同。如果任何字段已更改，则将重新渲染您的组件，以便它可以将更新的值作为prop接收。**请注意，返回相同引用的变异对象是一个常见错误，它可能导致您的组件在预期时无法重新呈现。**

  `react-redux`进行了浅层比较，以查看`mapStateToProps`结果是否已更改。每次意外返回新对象或数组引用很容易，即使数据实际上相同，这也会导致您的组件重新呈现。

  许多常见的操作会导致创建新的对象或数组引用：

  - 使用`someArray.map()`或创建新数组`someArray.filter()`

  - 与合并数组 `array.concat`

  - 选择数组的一部分 `array.slice`

  - 用复制值 `Object.assign`

  - 用价差运算符复制值 `{ ...oldState, ...newData }`

- #### 仅在数据更改时执行昂贵的操作

  转换数据通常可能是昂贵的（*并且*通常导致创建新的对象的引用）。为了使您的`mapStateToProps`功能尽可能快，您仅应在相关数据已更改时重新运行这些复杂的转换。

  有几种方法可以解决此问题：

  - 可以在动作创建者或约简中计算一些转换，并且转换后的数据可以保存在商店中
  - 转换也可以用组件的`render()`方法完成
  - 如果确实需要在`mapStateToProps`函数中完成转换，那么建议使用`memoized selector functions`以确保仅在输入值已更改时才运行转换。

- #### 声明的参数会影响执行效率

  如果只有state的情况下，声明（state, ownProps) ，会导致，mapState会在state和ownProps变化时都执行，**除非需要ownProps，否则不要添加该参数**


### mapDispatchToProps

`mapDispatchToProps`是传递给`connect()`的第二个参数，使用`react-redux`，组件不会直接与store交互，而是通过`connect()`,react-redux提供了2种派发action的方式

1. 未指定mapDispatchToProps时，默认在props里加入dispatch，可以通过props.dispatch派发action

   ```js
   function Counter({ count, dispatch }) {
     return (
       <div>
         <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
         <span>{count}</span>
         <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
         <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
       </div>
     )
   }
   
   connect(mapState,null)(Counter)
   ```

2. 指定mapDispatchToProps时，可以将Action Creator作为props传入组件中

   **2种形式的mapDispatchToProps**：

   1. function形式：更具灵活性，可以访问dispatch，和ownProps
   2. 对象形式：更具说明性，更易使用。

