# VueX

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

# VueX的安装

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

### new VueX.store 的option

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