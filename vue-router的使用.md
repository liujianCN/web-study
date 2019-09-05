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
  <!-- 函数式 -->
  this.$router.push('/user/lisi)
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

- $router是new的全局的Router实例对象。

- $route是当前活跃的路由组件


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

- 同动态路由

### 通过`query`传递

- 路由正常配置：'/home'
- 传递路径：'/home?name=zhangshan'