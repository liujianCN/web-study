# `vue-router` 的使用

## 路由映射配置

- 导入组件，建立路由映射

  - 路由配置的重定向

  ```javascript
  import A from '../../A';
  import B from '../../B';
  const routers = [
      //配置重定向
      {
          path: '/',
          redirect: A
      },
      {
          path: '/A',
          component: A
      },
      {
          path: '/B',
          component: B
      }
  ]
  ```


## 路由组件的展示

- 使用`router-view`进行展示

  - 在路由切换时展示路由映射的组件

  ```html
  <div id='#app>
  	<router-view></router-view>
  </div>
  ```


## 路由的跳转

### 声明式（router-link）

- `to='/A'`  <u>**to**</u>  属性，与路由映射中相对应。

- `tag ='li'`  **<u>tag</u>**  属性，router-link最终渲染的元素，默认为   **<u>a</u>**  标签。

- `replace`   **<u>replace</u>**  属性，不会留下history记录，不添加replace时，默认留下history记录。

- `router-link-active`  `vue-router`在router-link被点击时动态添加上的class。

- `active-calss`  给router-link-active重命名。

  ```
  <div id='#app>
  	<router-link to='/A' tag='li' replace>我是A组件</router-link>
  	<router-link to='/A' active-calss='active'>我是A组件</router-link>
  </div>
  <style>
  	.router-link-active{
         color:'#ccc'                                       
  	}
  	//或者重命名
  	.active{
         color:'#ccc'                                       
  	}
  </style>
  ```




- 在路由实例中配置  `linkActiveClass`  统一重命名router-link-active

  ```
  const router = new Router({
      routes,
      mode:'history',
      linkActiveClass:'active'
  })
  ```


### 函数式（$router）

- `vue-router`会在每个组件对象上添加一个`$router`属性。

  ```javascript
  //在方法中调用
  methods:{
      //push方法
      handleClick(){
          this.$router.push('/A')
      },
      //或者使用replace方法
      handleClick(){
          this.$router.replace('/A')
      }
  }
  ```


## 动态路由

- 路由映射配置：

  ```javascript
  const = [
      {
          path:'/user/:name',
          component:User
      }
  ]
  ```



- 路由跳转：

  ```html
  <!-- 静态 -->
  <router-link to='user/zhangsan'>用户界面</router-link>
  <!-- 动态 + 在data里定义name-->
  <router-link :to='"user"/name'>用户界面</router-link>
  <!-- 编程式 -->
  this.$router.push('/user/lisi);
  this.$router.push({
  	path:'/user',
  	
  })
  ```


- 获取动态路由的参数（<u>**$route**</u>）

  ```javascript
  /*
  *vue-router会在路由里添加$route,可以在当前活跃的路由组件
  *里获取到this.$route,获取当前的路由的一些信息
  */
  const name = this.$route.params.name
  ```

## $router和$route

- 源码


```js
  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
//向Vue.prototyp添加$router,即全局new的vueRouter实例
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
//向Vue.prototyp添加$route，当前活跃的路由
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
```

- $router是new的全局的Router实例对象。

  ![](C:\Users\Administrator\Desktop\web-study\image\$router.JPG)

  

- $route是当前活跃的路由组件

  ![](C:\Users\Administrator\Desktop\web-study\image\$route.JPG)


## 路由懒加载

- 使用`ES6`的模块导入，配合`webpack`进行代码分割，实现路由懒加载

  ```javascript
  //import A from '../A';
  //import B from '../B';
  const A = () => import('../A');
  const B = () => import('../B');
  const routes = [
      {
          path:'/A',
          component:A
      },
      {
          path:'/B',
          component:B
      }
  ]
  ```


## 嵌套路由

### 1，配置对应子路由的映射

- 配置对应路由的children属性。

  - 嵌套路由也可以重定向

  ```javascript
  //配置嵌套子组件时，子组件的path不需要’/‘，跳转时会自动添加
  const routes = [
      {
          path='/home',
          component:Home,
          children:[
          	{
          		path:'',
          		redirect:A
      		}，
          	{
          		path:'A',
          		component:A
      		},
      		{
          		path:'B',
          		component:B
      		}
          ]
      }
  ]
  ```


### 2，在对应组件内部使用router-view

- 在对应组件例如Home组件中使用router-view。
  - router-link需要完整的路径'/home/A'

```
<teplate>
	<div>
		<router-link to='/home/A'>子组件A</router-link>
		<router-link to='/home/B'>B子组件</router-link>
		<router-view></router-view>
	</div>
</tmplate>
```



## 参数的传递

### 通过`params`传递

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` (如果 URL 中有查询参数)、`$route.hash` 等等。你可以查看 [API 文档](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1) 的详细说明。

### 响应路由参数的变化

提醒一下，当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 通过`query`传递

- 路由正常配置：'/home'

- 传递路径：'/home?name=zhangshan&age=18'

  ```
  <router-link to={path:'/home',query:{name:'zs',age:18}}>用户界面</router-link>
  this.$router.push({
      path:'/home',
      query:{
          name:'zs',
          age:18
      }
  })
  ```

- 获取`query`参数

  ```javascript
  const query = this.$route.query;
  /*
  *	query:	{
  *		name:'zs',
  *		age:18
  *	}
  */
  ```

  

## 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

这两种方式都会把路由导航到 `/user/123` 路径。



## 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

## 导航守卫

- “**<u>导航</u>**”表示路由正在发生改变。

  正如其名，`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

  记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过[观察 `$route` 对象](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

### 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
    next(...)
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

- **to: Route**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
- **from: Route**: 当前导航正要离开的路由
- **next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **next()**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **next(false)**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **next('/') 或者 next({ path: '/' })**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **next(error)**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

**确保要调用 next 方法，否则钩子就不会被 resolved。**

### 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享的守卫

你可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

这些守卫与全局前置守卫的方法参数是一样的。

### 组件内的守卫

最后，你可以在路由组件内直接定义以下路由导航守卫：

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。