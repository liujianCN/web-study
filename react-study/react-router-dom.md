

# React-Router-dom

react-router-dom里有三个主要类别的组件：

- **Router**组件 ：<BrowserRouter>和<HashRouter>
- **Route**组件：<Route>和<Switch>
- **Navgation**组件：<Link>、<navLink>和<Redirect>



## Router

react-router-dom提供2个Router组件：<BrowserRouter>和<HashRouter>

- #### <BrowserRouter>

  使用正常的URL路径，但是需要后台进行配置，否则会找不到路径资源。

- #### <HashRouter>

  使用URL的hash存储当前路径，例如：`http://example.com/#/your/page`，它不会发送到服务器，故不需要后台配置，即可直接使用。

- #### 使用Router

  通常使用Router包裹根组件：

  ```jsx
  import { BrowserRouter } from 'react-router-dom';
  ReactDOM.render(
  	<BrowserRouter>
          <App/>
      </BrowserRouter>
  ,domcument.getElementById(#root))
  ```



## Route匹配



两个路由匹配组件：<Switch>和<Route>

- ### Switch

  当Switch组件渲染时，它会搜索它的子组件<Route>，当寻找到与当前URL匹配的path的<Route>，就会渲染然后忽略其他的<Route>，没有匹配到，就渲染null

  ```
  import React from "react";
  import ReactDOM from "react-dom";
  import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
  
  function App() {
    return (
      <div>
        <Switch>
  
          <Route path="/about">
            <About />
          </Route>
  
          <Route path="/contact/:id">
            <Contact />
          </Route>
          <Route path="/contact">
            <AllContacts />
          </Route>
  
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
  
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
  ```

- ### Route

  > Route 的path属性匹配的是以路径开头，而不是整个路径，所以path='/'，会默认被匹配，解决方案：
  >
  > 1. 在Switch组件里，将其放在最后一个待匹配项
  > 2. 使用exact，进行精准匹配



## Link

声明式的导航

- to: String

  字符串，由path、query(可选)、hash(可选)组成

  ```
  <Link to="/courses?sort=name" />
  ```

- to: Object

  拥有下列属性的对象

  1. pathname：路径字符串
  2. search：查询参数字符串
  3. hash：放置在URL里的hash字符串
  4. state：location中的state

  ```jsx
  <Link
      to={{
          pathname:'/',
          search:'?sort=name',
          hash:'#id',
          state:{name='zs'}
      }}
  />
  ```

- replace：Bool

  替换当前路径，而不是push

  ```jsx
  <Link to='/' replace />
  ```



## Redirect

将导航到一个新位置，去掉历史栈中的当前位置记录

- to: String

  ```jsx
  <Route path='/' exact>
  	{login ? <Home/> : <Redireact to='login'/>}
  </Route>
  ```

- to: Object

  ```jsx
  <Redirect
    to={{
      pathname: "/login",
      search: "?utm=your+face",
      state: { referrer: currentLocation }
    }}
  />
  ```

- from: String

  from:有from属性时必须在Switch标签下，否则无效果

  ```jsx
  <Switch>
    <Redirect from='/old-path' to='/new-path' />
    <Route path='/new-path'>
      <Place />
    </Route>
  </Switch>
  ```

- exact：

  精准匹配，仅仅当Redirect有from属性时，才能精准匹配from

  ```
  <Switch>
    <Redirect exact from="/" to="/home" />
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
  </Switch>
  ```


## Route

匹配当前URL，不匹配时渲染null，匹配时渲染组件

```jsx
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/news">
        <NewsFeed />
      </Route>
    </div>
  </Router>,
  node
)
//如果应用程序的位置是/UI层次结构，则类似于：
<div>
  <Home />
  <!-- react-empty: 2 -->
</div>
//如果应用程序的位置是/newsUI层次结构，则将是
<div>
  <!-- react-empty: 1 -->
  <NewsFeed />
</div>
```

- route的渲染

  建议在<Route>组件包裹组件的方式渲染你的组件，也提供一些其他方法，主要为了支持钩子函数引入之前的版本的兼容。

  1. <Route component />
  2. <Route render/>
  3. <Route children/>

- 这三种方式都有三个相同的三个route prop

  1. match

  2. location

  3. history


- component

  当位置匹配时，组件会被渲染。使用`component`时，router会调用reac.createElement创建组件，如果给内联函数给component属性，在现有组件更新时会导致组件的卸载和重新挂载，而不是更新。如果使用内联函数，请使用render或者children

  ```jsx
  <Route path="/user/:username" component={User} />
  //默认将三个route prop传入组件
  ```

  ![1570369149040](C:\Users\liuji\Desktop\web-study\image\1570369149040.png)

- render

  不同于component创建新元素，render函数在路由匹配时被调用，它会访问相同的render props（match，location，history），作为组件的props传入

  ```jsx
  <Route path="/user/:username" render={() => <div>home</div>} />
  //此时组件的props不含任何route prop
  // {}
  
  // 将route prop全部传递给组件
  
  <Route path="/user/:username" render={
          routeProps => (
          	<FadeIn>
              	<Home {...routeProps} />
              </FadeIn>
          )
      } />
  
  //或者传入部分route prop
  <Route path='/three' render={({location,history})=><Three location={location} history={history}/>}/>
  ```

  ![1570369489328](C:\Users\liuji\Desktop\web-study\image\1570369489328.png)

> component 会覆盖render函数，只在同一Route里使用一种渲染方式



- children

  它像render函数（默认不传给组件任何route prop）渲染一样渲染组件，但它不管路由是否匹配，**都会渲染**，当路径匹配时，它的参数和render或者component的route props一样，但是当不匹配时，match为null，可以动态的控制UI，或者使用动画。

  ```jsx
  
  function ListItemLink({ to, ...rest }) {
    return (
      <Route
        path={to}
        children={({ match }) => (
          <li className={match ? "active" : ""}>
            <Link to={to} {...rest} />
          </li>
        )}
      />
    )
  }
  
  ReactDOM.render(
    <Router>
      <ul>
        <ListItemLink to="/somewhere" />
        <ListItemLink to="/somewhere-else" />
      </ul>
    </Router>,
    node
  )
  This could also be useful for animations:<Route
    children={({ match, ...rest }) => (
      <Animate>
        {match && <Something {...rest}/>}
      </Animate>
    )}
  />
  ```

  > children优先级最大，会覆盖前面两种方式，所以只在一个Route上使用一种方式

- path：String || [ ]

  字符串或者字符串数组

  ```
  <Route path="/users/:id">
    <User />
  </Route>
  <Route path={["/users/:id", "/profile/:id"]}>
    <User />
  </Route>
  ```

- exact：bool

  是否进行精准匹配

  path='/home'和path='/home/one'

- strict：bool

  是否严格匹配

  path='/one'和path='/one/'

- sensitive：bool

  区分大小写

  path='/one'和path='/One'

- Switch

  它会渲染第一个匹配的<Route>或者<Redirect>的to属性的路径，如果一个Route没有to属性或者Redirect没有from属性，则它后面所有的Route都将匹配它所对应的组件



### history

引用的是history库，通常有下列方法和属性

- length：浏览器历史栈数量
- action：当前的操作(push,pop,replace)
- location
- push：新标签入栈
- replace：
- go(n)：
- goBack()
- goForward()

history is mutable，所以在访问location时使用route prop的location而不是history里的location

```jsx
class Comp extends React.Component {
  componentDidUpdate(prevProps) {
    // 新的location
    const locationChanged = this.props.location !== prevProps.location

    // INCORRECT, will *always* be false because history is mutable.
    const locationChanged =
      this.props.history.location !== prevProps.history.location
  }
}

;<Route component={Comp} />
```

路径由one->two时组件更新时的location和history的变化。

![1570375776926](C:\Users\liuji\Desktop\web-study\image\1570375776926.png)

### location

表示应用当前的位置信息，在哪，打哪儿来，到哪儿去，location时不可变的，在组件中使用它来确定何时导航，数据获取或者动画时很有用，

```jsx
// 通常是字符串
<Link to="/somewhere"/>

// 需要某些状态时，可以使用location代替
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```



### match

match对象包含了Route如何匹配URL的信息，包含如下属性：

- param：(object)从动态路由的URL里解析的键值对

- isExact：(bool)，是否是精准匹配

- path：(String)，路由的匹配模式，用于构建嵌套的Route

- url：(String)，url的一部分，用于构建嵌套的Link

  ```
  match:{
      path: "/home/:name",
      url: "/home/zhangsan"
  }
  ```




## withRouter

通过withRouter高阶组件包裹的非Route组件有能力访问当前最近的Route组件的route props。

```jsx

```



## hooks

5.1版本的react-router-dom新增了4个hooks，能访问router的state和进行导航，react必须>=16.8。

### useHistory

能够访问history的实例，以便进行导航

```jsx
import { useHistory } from 'react-router-dom';
function UseHistory(props) {
   const history = useHistory()
   return <div onClick={()=>history.push('/one')}>useHistory</div>
}
```



### useLocation

每当路由变化时，返回一个新的当前URL的location对象。

```jsx
import { useLocation } from 'react-router-dom';
function UseLocation(props) {
  const [n,setN] = React.useState(0)
  const location = useLocation();
  React.useEffect(()=>{
    console.log('不同的location');
  },[location])
  return (
    <div>
      <div>{n}</div>
      <div onClick={()=>setN(n => n+1)}>UseLocation</div>
     </div>
   )
}
```



### useParams

useParams访问当前Rotute的match.params，返回匹配的URL的键值对。

```jsx
function UseParams(props) {
    //const p = useParams();
    //console.log(p);
    //{name:'lisi'}
    //结构赋值
    const { name } = useParams
    return <div>{name}</div>
}
```



### useRouteMatch

useRouteMatch会和Route一样尝试匹配当前路由，匹配到就返回当前的URL的match对象，否者返回null。

```jsx
function UseRouteMatch(params) {
  const match = useRouteMatch('/home/:id')
  console.log('useRouteMatch');
  console.log(match);
  return <div>useRouteMatch</div>
}
//useRouteMatch不匹配返回null

//useRouteMatch匹配返回match对象
match:{
    isExact: true,
	params: {id: "zs"},
	path: "/home/:id",
	url: "/home/zs"
}
```



# Demo





































