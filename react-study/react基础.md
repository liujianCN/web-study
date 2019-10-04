# React基础

- [参考详细组件 API](https://zh-hans.reactjs.org/docs/react-component.html)
- [深入 JSX](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)

## 安装

- script 引入（学习）

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Document</title>
  <!-- 引入React -->
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  
  <!-- 引入ReactDOM -->
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  
  <!-- 引入jsx支持 -->
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/babel">
    // 创建react组件
     const App = () => (
     		<div>APP</div>
     )
     // 挂载到app上
      ReactDOM.render(<App/>,document.getElementById('app'))
    </script>
  </body>
  </html>
  
  ```

- 构建工具
  - 使用react提供的create-react-app
  - 或者自己搭建webpack环境



## JSX

- ### 声明变量：

```js
const element = <h1>Hello, world!</h1>;
```

​	这个有趣的标签语法既不是字符串也不是 HTML。

​	它被称为 JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

​	JSX 可以生成 React “元素”。react [不强制要求](https://zh-hans.reactjs.org/docs/react-without-jsx.html)使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示更多有用的错误和警告消息。

- ### 在 JSX 中嵌入表达式：

  我们声明了一个名为 `name` 的变量，然后在 JSX 中使用它，并将它包裹在大括号中：

  ```
  const name = 'Josh Perez';
  const element = <h1>Hello, {name}</h1>;
  
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  ```

  在 JSX 语法中，你可以在大括号内放置任何有效的 [JavaScript 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)。例如，`2 + 2`，`user.firstName` 或 `formatName(user)` 都是有效的 JavaScript 表达式。

- ### JSX 也是一个表达式

  在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

  也就是说，你可以在 `if` 语句和 `for` 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

  ```
  function getGreeting(user) {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
  }
  ```

- ### JSX 特定属性

  你可以通过使用引号，来将属性值指定为字符串字面量：

  ```
  const element = <div tabIndex="0"></div>;
  ```

  也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

  ```
  const element = <img src={user.avatarUrl}></img>;
  ```

  在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

  > **警告：**
  >
  > 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
  >
  > 例如，JSX 里的 `class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 `tabindex` 则变为 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)。

- ### 使用 JSX 指定子元素

  假如一个标签里面没有内容，你可以使用 `/>` 来闭合标签，就像 XML 语法一样：

  ```
  const element = <img src={user.avatarUrl} />;
  ```

  JSX 标签里能够包含很多子元素:

  ```
  const element = (
    <div>
      <h1>Hello!</h1>
      <h2>Good to see you here.</h2>
    </div>
  );
  ```

- ### JSX上的style

  如果要用JSX来添加样式，很简单，代码如下，此处不解释：

  ```xml
  <script type="text/babel">
      var ok=1;
      var myStyle={
          color:"red",
          fontSize:50
      }
      ReactDOM.render(
          <div>
              <p style={myStyle}>{ok==1?"我很帅":"我很有才华"}</p>
          </div>,
          document.querySelector("#wrap")
      )
  </script>
  ```

  或者：

  ```xml
  <script type="text/babel">
      var ok=1;
      ReactDOM.render(
          <div>
              <p style={{
                  color:"red",
                  fontSize:50
              }}>{ok==1?"我很帅":"我很有才华"}</p>
          </div>,
          document.querySelector("#wrap")
      )
  </script>
  ```

- ### JSX上的数组输出

  JSX可以直接在模板输出JavaScript变量。如果这个变量是一个数组，会自动展开所有元素。

  ```xml
  <script type="text/babel">
      var arr=[
          <h1>你是风儿</h1>,
          <h2>我是沙</h2>,
          <h3>缠缠绵绵到天涯</h3>
      ];
      ReactDOM.render(
          <div>
              {arr}
          </div>,
          document.querySelector("#wrap")
      )
  </script>
  ```

  咱们也可以利用数组的map属性来对其进行数据列表渲染：

  ```xml
  <script type="text/babel">
      var arr=["你是风儿","我是沙","缠缠绵绵到天涯"];
      var lis=arr.map(function(v){
          return <h3>{v}</h3>
      })
      ReactDOM.render(
          <div>
              {lis}
          </div>,
          document.querySelector("#wrap")
      )
  </script>
  ```
- ### JSX当中的注释

  只需要将注释写到{}当中即可，如下：

  ```xml
  <script type="text/babel">
      var arr=[
          <h1>你是风儿</h1>,
          <h2>我是沙</h2>,
          <h3>缠缠绵绵到天涯</h3>
      ];
      ReactDOM.render(
          <div>
              {
                  /*多
                  * 行
                  * 注
                  * 释*/
                  // 单行注释
                  // arr
              }
          </div>,
          document.querySelector("#wrap")
      )
  </script>
  ```

  > JSX其实就是JavaScript。一些关键字不要作为XML的属性名。例如：for,if,class 。另外大括号里是JavaScript，不要加引号，加引号就会被当成字符串。

- ### 不使用JSX

  每个 JSX 元素只是调用 `React.createElement(component, props, ...children)` 的语法糖。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成。

  每个 JSX 元素只是调用 `React.createElement(component, props, ...children)` 的语法糖。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成。

  例如，用 JSX 编写的代码：

  ```
  class Hello extends React.Component {
    render() {
      return <div>Hello {this.props.toWhat}</div>;
    }
  }
  
  ReactDOM.render(
    <Hello toWhat="World" />,
    document.getElementById('root')
  );
  ```

  可以编写为不使用 JSX 的代码：

  ```
  class Hello extends React.Component {
    render() {
      return React.createElement('div', null, `Hello ${this.props.toWhat}`);
    }
  }
  
  ReactDOM.render(
    React.createElement(Hello, {toWhat: 'World'}, null),
    document.getElementById('root')
  );
  ```

  组件可以是字符串，也可以是 `React.Component` 的子类。当组件为无状态组件时，它也可以是一个普通的函数。

  如果你不想每次都键入 `React.createElement`，通常的做法是创建快捷方式：

  ```
  const e = React.createElement;
  
  ReactDOM.render(
    e('div', null, 'Hello World'),
    document.getElementById('root')
  );
  ```



## 元素渲染

- ##### 元素是构成 React 应用的最小砖块。元素描述了你在屏幕上想看到的内容。

  ```
  const element = <h1>Hello, world</h1>;
  
  ```

  **注意：**

  你可能会将元素与另一个被熟知的概念——“组件”混淆起来。组件是由元素构成的。

- ##### 将一个元素渲染为 DOM

  ```
  <div id="root"></div>
  //想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()：
  const element = <h1>Hello, world</h1>;
  ReactDOM.render(element, document.getElementById('root'));
  ```



## 组件 & Props

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

- ### 函数组件

  定义组件最简单的方式就是编写 JavaScript 函数，该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

  > 16.7之前也叫做无状态组件，在react-hooks出现之后，函数组件也可以有状态，故不叫作无状态组件。

  ```
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

- ###  渲染组件

  - 之前，我们遇到的 React 元素都只是 DOM 标签，不过，React 元素也可以是用户自定义的组件：

  ```
  const element = <div />;
  //自定义组件
  const element = <Welcome name="Sara" />;
  ```

  - 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）转换为单个对象传递给组件，这个对象被称之为 “props”。

  ```
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  
  const element = <Welcome name="Sara" />;
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  //输出hello，Sara
  ```

- 让我们来回顾一下这个例子中发生了什么：

  1. 我们调用 `ReactDOM.render()` 函数，并传入 `<Welcome name="Sara" />` 作为参数。
  2. React 调用 `Welcome` 组件，并将 `{name: 'Sara'}` 作为 props 传入。
  3. `Welcome` 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值。
  4. React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

  > **注意：** 组件名称必须以大写字母开头。
  >
  > React 会将以小写字母开头的组件视为原生 DOM 标签。
  >
  > 例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。


- ### props

  当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）转换为单个对象传递给组件，这个对象被称之为 “props”。

  ```
  props:{
      name:'sara'
  }
  ```

  - #### 只读性：

    ##### 组件无论是使用函数声明还是class声明，都决不能修改自身的 props

  - #### 默认props

    ```react
    //函数组件中
    const App = props => <div>{props.name}</div>
    App.defaultProps = {
        name:'zs'
    }
    /* class组件中
     * 1，同函数组件
     * 2，使用类的静态属性
    */
    class App extends React.Components{
        static defaultProps = {
            name：‘zds’
        }
    }
    ```

  - #### props校验

    引入prop-types库

    ```react
    class App extends React.Components{
        static defaultProps = {
            name：‘zds’
        }
        static propTypes = {
            name: PropTypes.string,
            option: PropTypes.number,
            option: PropTypes.bool,
            option: PropTypes.array,
            option: PropTypes.object,
            option: PropTypes.func,
      // 任何可被渲染的元素（包括数字、字符串、元素或数组）
      // (或 Fragment) 也包含这些类型。
      		optionalNode: PropTypes.node,
            
      // 一个 React 元素。
      		optionalElement: PropTypes.element,
            
      // 一个 React 元素类型（即，MyComponent）。
      		optionalElementType: PropTypes.elementType,
            
      // 你可以让你的 prop 只能是特定的值，指定它为
      // 枚举类型。
      		optionalEnum: PropTypes.oneOf(['News', 'Photos']),
            
        // 可以指定一个数组由某一类型的元素组成
      		optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
    
      // 可以指定一个对象由某一类型的值组成
      		optionalObjectOf: PropTypes.objectOf(PropTypes.number),
    
      // 可以指定一个对象由特定的类型值组成
      		optionalObjectWithShape: PropTypes.shape({
        		color: PropTypes.string,
        		fontSize: PropTypes.number
     		}),
        }
        //可以在每项验证后添加isRequired,未传时打印错误
    	//name: PropTypes.string.isRquired
    }
    ```

- ### class 组件

  ```
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```



## State & 生命周期

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

创建class组件：

1. 创建一个 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)，并且继承于 `React.Component`。
2. 添加一个空的 `render()` 方法。
3.  `render()` 方法之中 `return` 。
4. 在 `render()` 方法中使用 `this.props` 替换 `props`。

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

现在 `Clock` 组件被定义为 class，而不是函数。

每次组件更新时 `render` 方法都会被调用，但只要在相同的 DOM 节点中渲染 `<Clock />` ，就仅有一个 `Clock` 组件的 class 实例被创建使用。这就使得我们可以使用如 state 或生命周期方法等很多其他特性。

- ### 初始化state

  在构造函数中初始化state

  ```
  constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    
  // 或
  class Clock extends React.Component {
  	state = {
          name: 'sara'
  	}
    render() {
  
    }
  }
  ```

- ### 添加生命周期

  ```
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  ```

  ```
  让我们来快速概括一下发生了什么和这些方法的调用顺序：
  
  当 <Clock /> 被传给 ReactDOM.render()的时候，React 会调用 Clock 组件的构造函数。因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。
  
  之后 React 会调用组件的 render() 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 Clock 渲染的输出。
  
  当 Clock 的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法。在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 tick() 方法。
  
  浏览器每秒都会调用一次 tick() 方法。 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。这一次，render() 方法中的 this.state.date 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。
  
  一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了。
  ```


## 事件处理

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同:

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。

- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

  ```html
  <!-- 传统HTML：-->
  <button onclick="handleClick()">Click</button>
  
  <!-- JSX -->
  <button onClick={handleClick}>Click</button>
  ```

- 在 React 中（0.14版本之后）另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。

  ```html
  <!-- 例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：-->
  <a href="#" onclick="console.log('The link was clicked.'); return false">
    Click me
  </a>
  
  <!-- React里，必须显示调用e.preventDefault() -->
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
  
    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }
  ```



- ### 回调函数中使用this

  你必须谨慎对待 JSX 回调函数中的 `this`，在 JavaScript 中，class 的方法默认不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。

  这并不是 React 特有的行为；这其实与 [JavaScript 函数工作原理](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)有关。通常情况下，如果你没有在方法后面添加 `()`，例如 `onClick={this.handleClick}`，你应该为这个方法绑定 `this`

  - ##### 在构造函数中bind this

  ```
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // 为了在回调中使用 `this`，这个绑定是必不可少的
      this.handleClick = this.handleClick.bind(this);
    }
  ```

  - ##### public class fields语法

  ```react
  class LoggingButton extends React.Component {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    // 注意: 这是 *实验性* 语法。
    handleClick = () => {
      console.log('this is:', this);
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          Click me
        </button>
      );
    }
  }
  ```

  - ##### 回调中使用箭头函数

  ```react
  class LoggingButton extends React.Component {
    handleClick() {
      console.log('this is:', this);
    }
  
    render() {
      // 此语法确保 `handleClick` 内的 `this` 已被绑定。
      return (
        <button onClick={(e) => this.handleClick(e)}>
          Click me
        </button>
      );
    }
  }
  ```

  此语法问题在于每次渲染 `LoggingButton` 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。**我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。**


- ### 向事件处理程序传递参数

  在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 `id` 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

  ```react
  {/* 箭头函数的方式，事件对象必须显示传递*/}
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  
  {/* 通过bind的方式，事件对象以及更多的参数将会被隐式的进行传递。*/}
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  ```



## 列表 & Key

- JSX 会展开数组中的所有元素

  ```react
  const list = [1,2,3,4]
  ReactDOM.render(<diV>{list}</div>,document.getElementById('root'))
  //页面上输出1234
  ```

- map遍历数组，将数组中的每一项变成li标签，赋给lists

  ```react
  const lists = list.map(i => <li>{i}</li>)
  ReactDOM.render(<ul>{list}</ul>,document.getElementById('root'))
  //页面输出一个 1 到 4 的项目符号列表。
  ```

- ## key

  key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

  > 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据 id 来作为元素的 key
  >
  > 警告：当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key

- **正确使用key**

  **一个好的经验法则是：在 `map()` 方法中的元素需要设置 key 属性。**

  ```react
  function ListItem(props) {
    // 正确！这里不需要指定 key：
    return <li>{props.value}</li>;
  }
  
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      // 正确！key 应该在数组的上下文中被指定
      <ListItem key={number.toString()}
                value={number} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
  ```

- #### 在 JSX 中嵌入 map()

  ```
  function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {
        	numbers.map( number =>
          	<ListItem key={number.toString()}
                    value={number} />
  
        )}
      </ul>
    );
  }
  ```



## 表单

**受控组件**

使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

- **input，textarea**

  ```
  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      this.setState({value: e.target.value});
    }
  
    render() {
      return (
      	<input type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
      );
    }
  }
  ```


- **select标签**

  在 HTML 中，`<select>` 创建下拉列表标签。例如，如下 HTML 创建了水果相关的下拉列表：

  ```html
  <select>
    <option value="grapefruit">葡萄柚</option>
    <option value="lime">酸橙</option>
    <option selected value="coconut">椰子</option>
    <option value="mango">芒果</option>
  </select>
  ```

  注意：react不会使用selected属性，而是在select根标签上使用value属性，更加便捷

  ```react
  class FlavorForm extends React.Component {
    constructor(props) {
      super(props);
      //默认值：椰子
      this.state = {value: 'coconut'};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      this.setState({value: e.target.value});
    }
  
    render() {
      return (
          <label>
            选择你喜欢的风味:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">葡萄柚</option>
              <option value="lime">酸橙</option>
              <option value="coconut">椰子</option>
              <option value="mango">芒果</option>
            </select>
          </label>
      );
    }
  }
  ```

  > 注意
  >
  > 你可以将数组传递到 `value` 属性中，以支持在 `select` 标签中选择多个选项：
  >
  > ```
  > <select mutiple={true} value=['coconut','mango']></select>
  > ```

- #### 处理多个输入

  当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

  ```html
  class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <form>
          <label>
            参与:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            来宾人数:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }
  ```










## Refs

> Refs提供了一种方式，允许我们访问Dom节点，或在render方法中访问创建的React元素
>
> 警告：尽量避免Refs

在典型的 React 数据流中，[props](https://zh-hans.reactjs.org/docs/components-and-props.html) 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

**何时使用 Refs**

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。



- **创建Refs**

  使用`React.createRef()` 创建的（React 16.3之后，之前推荐使用回调Refs），在通过ref属性附加到React元素，在构建组件时，通常将Refs分配给组件实例属性，以便在整个组件中引用到它。

  1, 在元素上创建Refs

  ```react
  //class组件
  class App extends React.Components {
      constructor(props){
          super(props);
          this.inputRef = React.createRef()
      }
  
      handleBtnClick = () => {
          this.inputRef.current.focus()
      }
      render(){
          return (
             <div>
               <input ref = {this.inputRef} />
               <input type="button" value="获取焦点" onClick={this.handleBtnClick}/>
             </div>
          	
          )
      }
  }
  //函数组件
  const App = props => {
      let inputRef = React.createRef()
      return (
          <div>
          	<input ref = {inputRef} />
          </div>
      )
  }
  ```

  2, 在组件上创建Refs

  > **仅在class组件上有效，函数组件无实例**

  ```react
  class AutoFocusApp extends React.Component {
      constructor(props){
          super(props);
          this.inputRef = React.createRef()
      }
      //拿到组件，手动调用组件的方法
      componentDidMount(){
          this.inputRef.current.handleBtnClick()
      }
      render() {
      	return (
        		<CustomTextInput ref={this.textInput} />
      	);
    	}
  }
  ```


- **访问Refs**

  当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

  ```js
  const node = this.inputRef.current
  ```

  ref 的值根据节点的类型而有所不同：

  - 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。

    > React 会在组件挂载时给current属性传入Dom元素，并在组件卸载时传入null，ref会在componentDidMount和componentDidUpdate的生命周期钩子触发前更新。

  - 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。

  - **你不能在函数组件上使用 ref 属性**，因为他们没有实例。


- ### 回调 Refs

  React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。

  不同于传递 `createRef()` 创建的 `ref` 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

  ```react
  const CustomTextInput = (props) => {
    return (
      <div ref={props.inputRef}>
        <input />
      </div>
    );
  }
  
  class Parent extends React.Component {
    componentDidMount() {
      console.log(this.inputElement);
    }
    
    render() {
      return (
        <CustomTextInput
          inputRef={el => this.inputElement = el}
        />
      );
    }
  }
  
  ```

  ### 关于回调 refs 的说明

  如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

  ```
  class CustomTextInput extends React.Component {
    constructor(props) {
      super(props);
  
      this.textInput = null;
  
      this.setTextInputRef = element => {
        this.textInput = element;
      };
    }
  
    componentDidMount() {
      // 组件挂载后，让文本框自动获得焦点
      this.focusTextInput();
    }
  
    render() {
      // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
      // 实例上（比如 this.textInput）
      return (
        <div>
          <input
            type="text"
            ref={this.setTextInputRef}
          />
        </div>
      );
    }
  }
  ```















# React进阶