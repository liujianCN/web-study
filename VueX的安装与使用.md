# Vuex

​	`Vuex` 是一个专为 `Vue.js` 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

状态管理

简单的状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

以下是一个表示“单向数据流”理念的简单示意：

<img src="https://vuex.vuejs.org/flow.png" width=600 alt='state'/>

当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

![](https://vuex.vuejs.org/vuex.png)

# Vuex的安装

- 目录结构
  - assets
  - components
  - store
    - index.js
  - App.vue
  - main.js

### **安装vuex**

```js
import Vue form 'vue';
import Vuex from 'vuex';
//调用use方法，安装vuex
Vue.use(Vuex)
```

### **创建store的实例**

```js
const store = new Vuex.store({
    
})
export default store;
```

### **在vue的实例中挂载store**

```js
import store from './store';
const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```

### new Vuex.store 的option

```js
const store = new VueX.store({
    //全局状态状态
    state:{
        name:'LiuJ',
        age:18
    }
})
```

### 组件中获取store的数据

```vue
<!-- VueX会在vue的原型上添加$store,通过$store可以获取store的数据 -->
<templete>
    <div>
    	{{$store.state.name}}--{{$store.state.age}}
	</div>
</templete>
<script>
    const name = this.$store.state.name;
    const age = this.$store.state.neme;
</script>
```

- 可以使用 this.$store.state.name = 'liuj',但是这不是vuex所规定的改变store里的数据的规则

## 访问数据

- 使用规定好的规则访问数据

  - `component` -- **dispatch** --> `action` -- **commit** --> `mutations` -- **mutate** --> `state` -- **render**--> `component`

  - dispatch：分发任务，可以同步可以异步。
    - action：提交`mutation`，同步或者异步操作。
  - commit：提交改变。
    - mutations：修改`store`中的`state`，必须是同步。
    - 必须同步，以便`devtools`能监听到state的改变。
  - render：store中的数据的改变，触发组件的`render`，重新渲染页面。

# State

## 单一状态树 （single source of truth）

Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

单状态树和模块化并不冲突——在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中。

## 在 `Vue` 组件中获得`Vuex` 状态

那么我们如何在 Vue 组件中展示状态呢？由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态：

```js
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

每当 `store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

`Vuex` 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：

```js
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。让我们更新下 `Counter` 的实现：

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

# Getter

有时候需求需要从store中的state中派生一些数据。

```js
//例如对store中的数据进行过滤并处理。
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

​	但是如果多个组件都想使用此属性，要么复制这个函数，要么抽离，并共享这个函数，但是都不理想。

Vuex允许我们在store中定义getter（ **可以认为是store计算属性 ** ），getter的返回值会根据他的依赖被缓存起来，且只有当他的依赖发生了改变，才会被重新计算。

- getter接受state作为第一个参数。

  ```js
  const store = new vuex.store({
      state:[1,2,3,4,5],
      getters:{
          moreThanOne:state => state.filter( item => item > 1 )
      }
  })
  ```

## **通过属性访问**

- `Getter` 会暴露$store.getters，可以通过属性访问这些值。

  ```js
  this.$store.getters.moreThanOne //[2,3,4,5]
  ```

- `Getter` 也可以接收其他Getter作为第二个参数。

  ```js
  geeters:{
      //...
      count: (state,getters) => {
          return getters.moreThanOne.length
      }
  }
  ```

- 可以在组件中使用它

  ```js
  computed:{
      moreThanOne(){
          return this.$store.getters.moreThanOne
      },
      count(){
          return this.$store.getters.count
      },
  }
  ```

- 注意，`getters`再通过属性访问时，是作为`vue`的响应式系统的一部分缓存其中的。



## **通过方法访问**

- 你也可以让getter返回一个函数，来实现给getter传参

  ```js
  getters:{
      //...
      getTodoById: state => id => state.todos.find(todo => todo.id === id )
  }
  ```

  ```js
  this.$store.getters.getTodoById(2)
  //返回id为2的todo
  ```

- 注意，通过方法访问getter时，每次都会调用getter，不会缓存。



## **`mapGetters`** **辅助函数**

- `mapGetters`辅助函数仅仅是将store中getter映射到**局部计算属性**。

```vue
import { mapGetters } from 'vuex';

export default {
	//...
computed:{
//...展开运算符，将getter混入computed中
	...mapGetters([
		moreThanOne,
		count,
		getTodoById
	])
  }
}
```

- 如果你想要将`getter` 重起一个名字，可以使用对象方式。

  ```vue
  ...mapGetters({
  	//将`this.todeId`映射为`this.$store.getters.getTodoById`
  	todoId: getTodoById
  })
  ```

  

# Mutation

​	更改`vuex`的`store`的状态的唯一方法是提交mutation。它非常类似事件。每个mutation都有一个字符串的事件类型（**type**）和一个回调函数（handler）。这个回调函数就是进行状态修改的地方，并且它会接受**`state`**作为第一个参数。

- #### 注册

  ```js
  const store = new vuex.store({
      state:{
          count:1
      },
      mutations:{
          increment(state){
              state++
          }
      }
  })
  ```

- #### 触发

  ​	你不能直接调用`mutations`里的handler，更像是一个事件注册，当你触发一个类型为`increment`时mutation时，此函数被调用。此时只需要使用`store.commit`触发increment.

  ```js
  this.$store.commit('increment')
  ```

  

## 提交载荷（payload）

- #### 你可以在commit的时候传入额外的参数，即mutation的载荷（payload）。

  ```js
  //......
  mutations:{
      increment(state,n){
          state.count += n
      }
  }
  ```

  ```js
  this.$store.commit('increment',100)
  ```

- #### 大多情况下，`payload`应该是一个对象，这样可以包含多个字段，并且记录的mutation会更易读。

  ```js
  //......
  mutations:{
      increment(state,payload){
          state.count += payload.amount
      }
  }
  ```

  ```
  this.$store.commit('increment',{
      amount: 100
  })
  ```

- #### 对象风格的提交
  - 提交mutation的另一种方式是直接使用包含 `type` 属性的对象
  ```js
  this.$store.commit({
        type:'increment',
        amount:100
  })
  ```
  - 当使用对象风格的提交方式时,整个对象都将作为载荷提交给mutation函数,因此handler可以保持不变

  ```js
  //......
  mutations:{
      increment(state,payload){
          state.count += payload.amount
      }
  }
  ```
## `Mutation`需要遵守`vue`的响应规则
  `vuex`的`store`中的数据是响应式的,当我们变更状态时,监视状态的`vue`组件会自动更新,这就意味着`vuex`中的`mutation`也需要遵守一些规定

   - **最好提前在store中初始化好所有所需属性**
   - **当需要在对象上添加新属性时,可以如下方法**
        1. 使用`vue.set(obj,'newProp','新属性的值')`
        2. 或者替换使用展开运算符替换obj

```js
 state.obj={ ...state.obj,newProp:'新属性的值' }
```



## 使用常量替代 `Mutation` 事件类型

```js
//mutation-types.js
export const INCREMENT = 'INCREMENT';
```

```js
//store.js
import { INCREMENT } from './mutation-types.js';

const store = new vuex.Store({
    state: {...},
    mutations: {
    	//使用ES2015风格的计算属性命名来使用一个常量作为函数名
        [INCREMENT](state){
            //mutate state
        }
   }
})

```



## Mutation 必须是同步函数

- #### 一条重要原则就是 `mutation` 必须是同步函数

  - 异步的`mutation`会导致`devtools`无法追踪到回调函数中的状态变化



## 组件中提交Mutation

​	在组件中使用  `this.$store.commit('INCREMENT')` 提交`mutation`  ,或者使用 `mapMutations`辅助函数,将组件中的`methods` 映射为`store.commit` 调用(需要在根节点注入` store `)

```js
import { mapMutations } from 'vuex';

export defalut {
    //....
    methods: {
        ...mapMutations([
            'increment', //将this.increment()映射为 this.$store.commit('increment')
            //mapMutations也支持载荷
            'incrementBy',
            //this.increment(amount)映射为this.$store.commit('increment',amount)
        ])
        //或者
            ...mapMutations({
                add: 'increment'//将this.add()映射为this.$store.commit('increment')
            })
    }
}
```



# Action

- Action 类似 mutation , 不同之处在于
  1. Action 提交的是 mutation 而不是, 直接变更状态
  2. Action 可以包含任意的异步操作

- 注册一个简单的Action

  ```js
  const store = new vuex.Store({
      state: {
          //...
      },
      mutations:{
          increment(state){
              state.count++
          }
      },
      actions:{
          incrememt(context){
              context.commit('increment')
          }
      }
  })
  ```

  

- Action 函数接受一个与store具有相同属性和方法的context对象, 因此你可以通过调用**`context.commit`**提交mutation, 或者调用 **`context.state`** 获取state, 或者调用**`context.getters`** 获取getters

- 实践中,通常使用ES2015的结构赋值,来简化代码

  ```js
  //...
  actions: {
      increment({ commit }){
          commit('increment')
      }
  }
  ```

  

## 分发Action

- Action 通过 `this.$store.dispatch` 触发:

  ```js
  this.$store.dispatch('increment')
  ```

- Action 内可以进行异步操作:

  ```js
  actions:{
      increment({ commit }){
          setTimeout(() => {
              commit('increment')
          },1000)
      }   
  }
  ```

- Action 支持载荷方式和对象方式进行分发

  ```js
  //载荷形式分发
  this.$store.dispatch('increment',{
      count: 100
  })
  //对象形式分发
  this.$store.dispatch({
      type:'increment'
  })
  ```

  

## 组件中分发Action

​	可以在组件中 直接使用`this.$store.dispatch('...')` 分发Action, 也可以使用 `mapActions` 赋值函数将组件的methods映射为`store.dispatch`调用

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
         // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'increment',

      // `mapActions` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      'incrementBy'

    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```



## 组合Action

Action 通常是异步的, 如何知道action什么时候结束,如何组合多个action,进行复杂的流程控制.

- ##### 首先,`store.dispatch` 可以处理被触发的action的处理函数返回的Promise,并且返回Promise

  ```js
  actions: {
      actionA({ commit }){
          return new Promise((resolve,reject) => {
              setTimeout(() => {
                  commit('increment')
                  resolve()
              },2000,'完成操作')
          })
      }
  }
  ```

  ```js
  store.dispatch('actionA').then(() => {
      // do something
  })
  ```

- ##### 在另一个action里使用

  ```js
  actions: {
      actionB({ commit, dispatch }){
          dispatch('actionA').then(() => {
              commit('xxxx')
          })
      }
  }
  ```

- ##### 如果使用`async/awiat` 可以如下组合

  ```js
  actions: {
      //假设getData,getOtherData返回promise,例如axios
      async actionA({ commit }){
          const { data } = await getData()
          commit('setData', data)
      },
          async actionB({ dispatch, commit }){
              await dispatch('actionA')
              const { data } = await getOtherData
              commit('setOtherData', data)
          }
  }
  ```



# Module

由于使用单一状态

