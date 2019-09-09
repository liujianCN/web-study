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

### 单一状态树 （single source of truth）

Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

单状态树和模块化并不冲突——在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中。

### 在 `Vue` 组件中获得`Vuex` 状态

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
      getter:{
          moreThanOne:state => state.filter( item => item > 1 )
      }
  })
  ```

- 通过属性访问

  - `Getter` 会暴露$store.getters，可以通过属性访问这些值。

    ```js
    this.$store.getters.moreThanOne //[2,3,4,5]
    ```

  - `Getter` 也可以接收其他Getter作为第二个参数。

