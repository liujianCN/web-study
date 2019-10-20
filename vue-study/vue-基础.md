# `vue`  基础

##  1，MVVM

前端的几个发展阶段

- **完全静态：**超文本标记语言（`HyperText Markup Language`），简称HTML，1993年成为互联网草案。早期的HTML页面是完全静态的，在服务器上存放好预习写好的HTML文件，浏览器请求某个地址之后，web服务器会返回对应的HTML显示。

- **CGI：**如果要针对不同的用户显示不同的页面，显然不可能给成千上万的用户准备好成千上万的不同的HTML文件，所以，服务器就需要针对不同的用户，动态生成不同的HTML文件。一个最直接的想法就是利用C、C++这些编程语言，直接向浏览器输出拼接后的字符串。这种技术被称为CGI：Common Gateway Interface。

- **后端MVC：**很显然，复杂的HTML是不可能通过拼字符串得到的。于是，人们又发现，其实拼字符串的时候，大多数字符串都是HTML片段，是不变的，变化的只有少数和用户相关的数据，所以，又出现了新的创建动态HTML的方式：ASP、JSP和PHP——分别由微软、SUN和开源社区开发。这时候的互联网，兴起了数据嵌入模板，模板直接写样式的开发模式，例如 MVC 模式：

  - Model（模型层）：提供/保存数据。
  - Controller（控制层）：数据处理，实现业务逻辑。
  - View（视图层）：展示数据，提供用户界面。

  在此时，前端只是后端 MVC 中的 V，

- **JavaScript：**1995 年，网景推出了 JavaScript，形成了前端的雏形：HTML 为骨架，CSS 为外貌，JavaScript为交互。有了JavaScript后，浏览器就可以运行JavaScript，然后，对页面进行一些修改。JavaScript还可以通过修改HTML的DOM结构和CSS来实现一些动画效果，而这些功能没法通过服务器完成，必须在浏览器实现。

  - 第一阶段，直接用JavaScript操作DOM节点，使用浏览器提供的原生API：

  ```js
  var dom = document.getElementById('name');
  dom.innerHTML = 'Homer';
  dom.style.color = 'red';
  ```

- **Ajax：**而到了 1998 年前后，Ajax（Asynchronous Java And XML：异步的 Java 和 XML）得到了相对的应用，并且在之后逐渐被使用到各个页面上，

  - 2004 年：Gmail
  - 2005 年：Google 地图
  - 2006 年：Ajax 被 `W3C` 正式纳入标准

- **jQuery ：**在 2006 年的时候，用于操作 DOM 的 jQuery 出现了，它快速地风靡了全球。大量的基于 jQuery 的插件构成了一个庞大的生态系统，从而稳固了 jQuery 作为 JavaScript 库一哥的地位。

  - 第二阶段，由于原生API不好用，还要考虑浏览器兼容性，jQuery横空出世，以简洁的API迅速俘获了前端开发者的芳心：

  ```js
  $('#name').text('Homer').css('color', 'red');
  ```

- **前端MVC：**前端代码有了读写数据、处理数据、生成视图等功能，因此迫切需要辅助工具，方便开发者组织代码。这导致了前端 MVC 框架的诞生。

  2010年，第一个前端 MVC 框架 `Backbone.js` 诞生。它基本上是把 MVC 模式搬到了前端，但是只有 M （读写数据）和 V（展示数据），没有 C（处理数据）。因为，Backbone 认为前端 Controller 与后端不同，不需要、也不应该处理业务逻辑，只需要处理 UI 逻辑，响应用户的一举一动。所以，数据处理都放在后端，前端只用事件响应处理 UI 逻辑（用户操作）。

  越来越多的H5开发，那View 层所做的事，就不仅仅是简单的数据展示了，它不仅要管理复杂的数据状态，还要处理移动设备上各种操作行为等等。因此，前端也需要工程化，也需要一个类似于MVC 的框架来管理这些复杂的逻辑，使开发更加高效。 但这里的 MVC 又稍微发了点变化：

  > **View** UI布局，展示数据。
  >
  > **Model** 管理数据。
  >
  > **Controller** 响应用户操作，并将 Model 更新到 View 上。

  这种 MVC 架构模式对于简单的应用来看起是OK 的，也符合软件架构的分层思想。 但实际上，随着H5 的不断发展，人们更希望使用H5 开发的应用能和Native 媲美，或者接近于原生App 的体验效果，于是前端应用的复杂程度已不同往日，今非昔比。这时前端开发就暴露出了三个痛点问题：

  - 开发者在代码中大量调用相同的 DOM API, 处理繁琐 ，操作冗余，使得代码难以维护。
  - 大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。
  - 当 Model 频繁发生变化，开发者需要主动更新到View ；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到Model 中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

  其实，早期jQuery 的出现就是为了前端能更简洁的操作DOM 而设计的，但它只解决了第一个问题，另外两个问题始终伴随着前端一直存在。

- **MVVM：MVVM 的出现解决了上述的三个问题：**

  何为 MVVM 模式？

  - Model：提供/保存数据。
  - View：视图
  - View-Model：简化的 Controller，唯一的作用就是为 View 提供处理好的数据，不含其它逻辑。

  Model：提供/保存数据，View：展示数据，View-Model：数据处理View Model 是简化的 Controller，所有的数据逻辑都放在这个部分。它的唯一作用就是为 View 提供处理好的数据，不含其他逻辑。

  在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

  ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

  

  - 2008 年，谷歌 V8 引擎发布，终结微软 IE 时代。
  - 2009 年 AngularJS 诞生、Node诞生。
  - 2011 年 React 诞生。
  - 2014 年 Vue诞生。

- 简易mvvm原生实现

  ```html
  <!DOCTYPE html>
  <html>
  <script>
    window.onload = function () {
      //变量定义
      var msg = 'mvvm';
      //操作dom
      var dom = document.querySelector('#app');
      var domH = document.querySelector('h3');
      var domInput = document.querySelector('input');
      domH.innerHTML = msg;
      domInput.value = msg;
      domInput.addEventListener('input', () => {
        msg = domInput.value;
        domH.innerHTML = msg;
      })
    }
  </script>
  <body>
    <!-- view -->
    <div id="app">
      <h3></h3>
      <input type="text">
    </div>
  </body>
  </html>
  ```

- 引入vue

  ```html
  <!DOCTYPE html>
  <html>
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script>
    window.onload=function(){
      const vm = new Vue({
        //el：DOM选择器，querySelect(),匹配第一个选择的元素
        el:'#app',
        data:{
          msg:'mvvm'
        }
      })
    }
  </script>
  <body>
    <div id="app">
      <h3>{{msg}}</h3>
      <input type="text" v-model="msg">
    </div>
  </body>
  </html>
  ```


## 2，vue简介

- Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架
  - 渐进式框架：在使用和学习式方式简单，学习成本较低，随着深入学习根据需求进行功能扩
    展
  - Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合
  - Vue借鉴React和Angular的部分代码设计，并提高了易用性和轻量化



## 3，vue在页面使用

- vue并不适合直接使用 页面方式进行语法定义；
- 页面使用方式只是vue为了让开发者在学习语法时可以快速掌握；
- 获取vue的核心语法库
  - 通过地址 https://cdn.jsdelivr.net/npm/vue/dist/vue.js 下载vue核心语法包
  - 使用 npm 进行Vue语法库的下载 `npm install vue`

- 页面引入vue的核心库之后，会在全局对象window下添加一个Vue构造函数

  ```js
  //Vue
  //构造函数，需要options和new关键字
  ƒ Vue (options) {
      if (!(this instanceof Vue)
      ) {
        warn('Vue is a constructor and should be called with the `new` keyword');
      }
      this._init(options);
    }
  ```

  ![]()

## 4，vue全局配置

- 在vue项目运行启动前，对vue的运行环境进行相关功能设置
  - 开启关闭调试工具，关闭开启控制台日志和警告，关闭开启调试工具……
  - 所有的Vue全局环境设置依赖于Vue的全局配置对象 `Vue.config`

```js
// 取消 Vue 所有的日志与警告 , 取值类型：boolean 默认值：false
Vue.config.silent = true;
//配置是否允许 vue-devtools 检查代码 , 取值类型：boolean
//开发版本默认为 true，生产版本默认为 false。生产版本设为 true 可以启用检查。
Vue.config.devtools = true
// 设置为 false 以阻止 vue 在启动时生成生产提示 , 取值类型：boolean 默认值：true
Vue.config.productionTip = false;
```

## 5，基本交互

### 5.1 插值表达式

- 语法：`Mustache语法` `{{ }}` 
- 功能：只提供语法，不提供功能，具体功能需要框架提供
- 特性：vue中响应数据
  - 通过插值表达式所绑定的数据的标签，在数据变化时，会重新渲染加载
  - 差值表达式只能对vue的数据进行响应
- 对于vue框架来说：只能使用在HTML标签当中，不能使用在其他地方
- 对于vue框架来说：只能使用vue中**定义的变量**或简单的 **js表达式** 或 **js内置对象**

```html
<标签>{{ vue中的数据 | js表达式 | js内置对象 }}</标签>
```

> 注意：当vue中的数据仓库中定义的变量名称和js内置对象名称一样时，优先数据仓库中的变量

```vue
<script>
    new Vue({
        el:'#app',
        data:{
            msg:"测试数据",//"测试数据"
            num:100,//100
            flag:true,//true
            arr:[1,2,3,4],//[1,2,3,4]
            user:{
            name:"tom",
            age:23
            },
            arg1:null,//''
            arg2:undefined,//''
            imgDom:new Image(),//'[object HTMLImageElement]'
            day:new Date(),//Wed Sep 18 2019 00:01:02 GMT+0800 (中国标准时间)
            // 不要使用JS内置关键字
            // Math:"vue示例自定义的math"
            htmlStr:"<h3>h3标签</h3>",//<h3>h3标签</h3>
            str:"aaaa\nbbbbb\n\tccccc"//aaaa bbbb cccc
        }
    })
</script>
<!--
vue的插值表达式可以直接，以JS语法调用 匿名变量
-->
<p>number匿名变量：{{ 100 }}</p>
<p>string匿名变量：{{ "字符串" }}</p>
<p>boolean匿名变量：{{ true }}</p>
<p>array匿名变量：{{ [1,2,3,4,5] }}</p>
<p>object匿名变量：{{ {a:1,b:2} }}</p>
<p>Date匿名变量：{{ new Date() }}</p>
<p>对象：{{ user }}</p>
<p>对象中的属性：{{ user.name }}</p>
<p>数组元素：{{ arr[0] }}</p>
<!--
插值表达式可取值：JS表达式
+ 在插值表达式的定义范围内，可以直接进行简单的 js 运算
- 四则运算
- 逻辑运算
- 比较运算
- 赋值运算
- 三目运算
* 总结：插值表达式在vue环境下运算时保留原变量类型，当运算结束后向页面输出时转
换为字符串类型
-->
<p>四则：{{ 1+1 }}</p>
<p>四则：{{ num+1 }}</p>
<p>逻辑：{{ flag&&false }}</p>
<p>比较:{{ num<=99 }}</p>
<p>三目运算：{{ flag?"真":"假" }}</p>

<!-- 赋值语法会修改对应变量 -->
<p>赋值运算：{{ msg='新字符串' }}</p>

<!--
JS内置对象 (Math)
-->
<p>Math:{{ Math }}</p>
<p>Math:{{ Math.pow(2,2) }}</p>
<p>Math:{{ Math.random() }}</p>
<p>Math:{{ Math.PI }}</p>

```

- 对于不同类型的数据，为了保证输出结果的正确性，vue对变量调用了自定义的`toString`方法

```js
var _toString = Object.protoType.toString;
function isPlainObj(obj){
    return _toString.call(obj) === '[object Object]'
}
function toString(val){
    return val == null?
        ''://null或者undefined
        //数组或者纯对象
        Array.isArray(val) || (isPlainObj(val) && val.toString === _toString)?
        	JSON.stringfy(val,null,2)://将val序列化
   				String(val)//强制转换
}
```

- 值表达式 底层调用的 是 DOM 对象的 textContent 属性 进行值得写入操作
  - html格式字符串将不被解析
  - js 转义符将不被识别

```markdown
+ 插值表达式实际上是通过调用 textContent 方式向标签中定义数据变量
+ textContent 和 innerText 在标签格式字符串处理上效果一样
- innerText 当文本中出现 \n 会将 \n 转化为<br> : 文本解析属性
- textContent 当文本中出现 \n 直接保留特性向页面输出
```

### 5.2 基本指令

- 为开发者 提供 在页面中进行 特殊功能的属性描述方法

  - 语法：Vue指令以 `v-名称` 结构定义
  - 位置：**指令只能用在HTML容器的标签属性上**，`<标签 v-指令=""><标签/>`
  - 实现：指令实际上是对js方法的封装，页面上定义的指令，只是对方法的调用
  - 功能：通过指令可以实现HTML标签写入，循环，判断，属性和时间的绑定。。。

- 完整语法

  - `v－指令名［：参数］［．修饰符］［＝取值］`
  - `v－指令名［：参数］［．修饰符］［＝＂取值＂］`
    - 参数：对当前指令操作范围进行限制
    - 修饰符：限制指令功能的触发条件



  > Tips：
  >
  > 1、普通指令取值范围和插值表达式基本一致，可取Vue数据仓库中定义的变量，可取匿名变量，可取JS内置对象、可进行简单的四则运算；
  >
  > 2、对于特殊指令`v-on`只能绑定Vue方法仓库中的自定义方法，或绑定简单JS表达式


#### 1、v-text

- 取值：`string`
- 功能：更新元素的 `textContent`。如果要更新部分的 `textContent` ，需要使用 `{{ Mustache }}` 插值。
- 示例：`<span v-text="msg"></span>`

```html
<body>
    <div id="app">
        <!-- v-text 等效于 插值表达式 -->
        <p>msg:{{ msg }}</p>
        <p v-text=" 'msg:'+msg "></p>
        <!-- 
            HTML 规范中并不强制要求 标签属性取值一定要定义 引号
        -->
        <p v-text=msg ></p>
    </div>
</body>
<script>
    new Vue({
        el:"#app",
        data:{
            msg:"变量msg"
        }
    })
</script>
```

#### 2、v-html

- 取值：`string`
- 功能：更新元素的 `innerHTML` 
- 示例：`<div v-html="html"></div>`

```html
<body>
    <div id="app">
        <!-- v-html -->
        <p>{{ htmlStr }}</p>
        <p v-text="htmlStr"></p>
        <p v-html="htmlStr"></p>
    </div>
</body>
<script>
    new Vue({
        el:"#app",
        data:{
            htmlStr:"<h3>html格式字符串</h3>"
        }
    })
</script>
```

#### 3、v-pre

- 取值：**不需要表达式**，该指令为boolean类型属性
  - 写表示 true（启用功能） 不写表示 false（不启用功能）
- 功能：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- 示例：`<span v-pre>{{ 该语法会直接显示在页面 }}</span>`

```html
<body>
    <div id="app">
        <!-- 
            v-pre 指令不是html的pre标签功能
            v-pre指令用于限定被当前属性绑定的标签和标签内部的vue语法不被执行 
        -->
        <!-- <pre>adsdasd
            asdasdasd
        </pre> -->
        <p><span v-pre>{{ msg }}是vue插值表达式取值语法，msg值为：</span>{{ msg }}</p>
    </div>
</body>
<script>
    new Vue({
        el:"#app",
        data:{
            msg:"变量msg"
        }
    })
</script>
```

#### 4、v-once

- 取值：**不需要表达式**，该指令为boolean类型属性
  - 写表示 true（启用功能） 不写表示 false（不启用功能）
- 功能：对当前元素和内部元素vue功能执行**一次**，程序执行过程不在对该元素范围内的vue功能进行重新执行
- 示例：`<span v-once>该区域vue功能只在初始化时执行一次 {{msg}}</span>`

```html
<body>
    <div id="app">
        <p>{{ msg }}</p>
        <p v-pre>{{ msg }}</p>
        <!-- 
            v-once修饰的标签内部vue语法可以正常执行一次
            当第一次执行完成后，内部的vue所有语法彻底失效
        -->
        <p v-once>{{ msg }}</p>
    </div>
</body>
<script>
    new Vue({
        el:"#app",
        data:{
            msg:"变量msg"
        }
    })
</script>
```

#### 5、v-cloak

- 取值：**不需要表达式**，该指令为boolean类型属性 (==vue没有为该指令增加任何功能==)

- 官方解释：该指令可以在vue示例未被初始化前，隐藏vue相关构成模板

- 功能：实现在vue功能构建完成前，隐藏浏览上vue语法表达式，**该指令本身不具有特殊功能，需配合css样式实现效果**

- 示例：

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```html
  <div v-cloak>
    {{ message }}
  </div>
  ```

> Tips：在vue模板编译之前，隐藏vue表达式，未完成构建时，无法使用vue的语法，v-cloak指令功能主要利用了 **指令特性** + css 样式实现，因此所有的vue指令都可以实现该功能

#### 6、v-on
- 缩写：@

- 语法：

  ```html
  <button v-on[：参数][：修饰符]>点击</button>
  <button @[：参数][：修饰符]>点击</button>
  ```

- 取值：Function | Inline Statement（行内表达式） | Object

- 参数：event

  ```html
  <script>
  	var btn = document.getElementById('btn');
    //为dom增加事件监听
    // eventName事件名
    // 事件监听的回调函数
    // 事件的行为描述：{
    //		capture:false,捕获阶段执行，默认
    //		passive:false,触摸事件和滚动事件优化
    //		once:false 事件只执行一次
    //	}
    function show(){
      console.log('show')
    }
    function hide(){
      console.log('hide')
    }
    btn.addEventListener('click',function(){
      console.log('click1')
    })
     btn.addEventListener('click',function(){
      console.log('click2')
    })
     btn.addEventListener('click',function(){
      console.log('click3')
    })
  </script>
  <body>
    <!-- 为html标签的事件属性增加处理函数,只能设置一个 -->
  	<input type="button" value="事件绑定" onclick="show()"/>
    
    <!-- 为html标签增加事件监听 -->
  	<input id="btn" type="button" value="事件绑定"/>
    
     <!-- 行内表达式，事件绑定的行内表达式一定是一个赋值表达式 -->
      <p>msg：{{ msg }}</p>
      <input type="button" value="修改变量msg值" @click="setMsg()">
      <input type="button" value="修改变量msg值" @click=" msg='新值' ">
  </body>
  
  ```

  ```html
   <hr>
      <!-- 
          js的 形参 和 实参
              形参：就是js方法定义时吗，描述的该方法所要接收的参数的 参数名称
              实参：js方法执行时传入的固定参数
      -->
      <div id="app" >
          <!-- 
              vue事件绑定时的形参传递,执行方法是可以根据需求直接传入实参值
                  1、vue事件绑定传入的方法参数，可以是符合JS语法习惯的相关值和表达式
                  2、vue的事件绑定可以直接以 当前示例数据仓库变量作为参数
          -->
          <input type="button" value="输出info变量-btn1" @click="printInfo( 'btn1' )">
          <input type="button" value="输出info变量-btn2" @click="printInfo( 'btn2' )">
          <input type="button" value="输出info变量-btn3" @click="printInfo( 'btn3' )">
          <hr>
          <input type="button" value="输出Math对象" @click="printArgs( Math )">
          <input type="button" value="每次执行数据一个随机数据" @click="printArgs( Math.random() )">
          <hr>
          <input type="button" value="输出info变量" @click="printArgs( info )">
          <input type="button" value="输出msg变量" @click="printArgs( msg )">
          <hr>
          <!-- vue示例容器中的标签，绑定的事件如果传入this，此时的this恒定指向与 window 对象 -->
          <input type="button" value="传入形参this" @click="printThis( this )">
          <hr>
          <!-- 
              vue事件默认从vue示例的数据仓库和方法中取对应的变量
              vue将常用的事件源对象 重新定义为 $event 等同于 普通 js中 event事件源
          -->
          <input type="text" @input=" printValue( $event ) ">
          <input type="text" @input=" printValue( $event.target ) ">
          <input type="text" @input=" printValue( $event.target.value,'ssss' ) ">
          <hr>
          <!-- 
              vue的事件绑定 可以不用定义 事件名称后的 ()
              ==> 这种事件绑定方式，是vue提供给组件化数据传递使用的事件绑定方式
          -->
          <input type="button" value="事件绑定" @click="printMsg()">
          <input type="button" value="事件绑定" @click="printMsg">
      </div>
  <script>
      new Vue({
          el: "#app",
          data:{
              info:"info默认值",
              msg:"msg默认值"
          },
          methods:{
              printMsg(){
                  console.log("事件触发")
              },
              printInfo(arg){
                  console.log(arg,":",this.info)
              },
              printArgs(arg){
                  // console.log(Math);
                  // console.log(this.info);
                  console.log(arg);
              },
              printThis(arg){
                  console.log(arg);
              },
              printValue(arg,arg1){
                  console.log("用户输入值：",arg,arg1);
              }
          }
      })
  </script>
  ```



- **修饰符**： **事件传递机制处理功能**

- `.stop` - 调用 `event.stopPropagation()`。

- `.prevent` - 调用 `event.preventDefault()`。

- `.capture` - 添加事件侦听器时使用 capture 模式（事件捕获模式）

- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。

  **下述修饰符用于修饰事件出发的按键**

- `.{keyCode-按键编码 | keyAlias-按键描述}` - 只当事件是从特定键触发时才触发回调。

- `.left` - (2.2.0) 只当点击鼠标左键时触发 或者 键盘方向左键。

- `.right` - (2.2.0) 只当点击鼠标右键时触发 或者 键盘方向右键

- `.up `键盘方向上键

- `.down` 键盘方向下键

- `.middle` - (2.2.0) 只当点击鼠标中键时触发。

  **一次事件修饰符**

- `.once` - 只触发一次回调。

- ==`.native` - 监听组件根元素的原生事件。=> 应用于组件化技术的 ？？？？==

- `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器（启用默认事件功能）

  > Tips：addEventListener() 事件绑定中的 passive 属性和 preventDefault 功能的关系
  >
  >  元素事件每次被触发，浏览器都会去查询被执行行为是否有preventDefault阻止该次事件的默认动作。
  >
  >  加上**passive就是为了告诉浏览器，不用查询了，执行 方法中没用preventDefault阻止默认动作。**
  >
  >  这里一般用在滚动监听，@scoll，@touchmove 中。因为滚动监听过程中，移动每个像素都会产生一次事件，每次都使用都进行查询prevent会使滑动卡顿。通过passive将内核线程查询跳过，可以大大提升滑动的流畅度。
  >
  > **注：Vue时间绑定时，passive和prevent冲突，不能同时绑定在一个监听器上。**

#### 7、v-show

- 取值：`any`
- 功能：根据表达式的boolean结果，**切换元素的 display 属性，控制元素显示隐藏**
- 示例：`<p v-show=" flag "></p>`

```
<div id="app">
    <h1 v-show=" true ">h1标签1</h1>
    <h1 v-show=" false ">h2标签2</h1>
    <h1 v-show=" '' ">h2标签3</h1>
    <h1 v-show=" 'asdasda' ">h2标签4</h1>
    <h1 v-show=" 0 ">h2标签5</h1>
    <h1 v-show=" 1 ">h2标签6</h1>
    <h1 v-show=" [] ">h2标签7</h1>
    <h1 v-show=" {} ">h2标签8</h1>
    <hr>
    <h1 v-show=" flag ">请登录</h1>
    <p v-show=" !flag ">当前用户tom,账户余额300</p>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            flag:true,
            num:10
        }
    })
</script>
```



#### 8、v-if、v-else-if、v-else

- 取值：

  - v-if：`any`
  - v-else-if：`any`
  - v-else：**不需要表达式**，该指令为boolean类型属性

- 用法：根据表达式的boolean结果，**执行元素的创建（createElement）和删除操作（removeElement）**

- 示例：

  ```
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else>Not A/B/C</div>
  ```

  - `v-else` 指令的上一个元素 必须使用了 `v-if` 或者 `v-else-if`
  - `v-else-if` 指令的上一个元素 必须使用了 `v-if`

```
<div id="app">
    <h1 v-if=" flag ">请登录</h1>
    <p v-if=" !flag ">当前用户tom,账户余额300</p>
    <input type="button" value="显示隐藏" @click=" flag=!flag ">
    <hr>
    <p v-if="num<10">小于10</p>
    <p v-else-if="num==10">等于10</p>
    <p v-else>大于10</p>
    <hr>
    <p v-if="num<10">小于10</p>
    <p v-if="num==10">等于10</p>
    <p v-if="num>10">大于10</p>
    <hr>
    <p v-show="num<10">小于10</p>
    <p v-show="num==10">等于10</p>
    <p v-show="num>10">大于10</p>
    <input type="button" value="+" @click=" num = num+1 ">
    <input type="button" value="-" @click=" num = num-1 ">
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            flag:true,
            num:10
        }
    })
</script>
```



#### 9、v-for

- 取值：Array | Object  | Number | String
- 功能：循环渲染元素或者模板
  - 具有vue实例数据仓库的读取特性
  - 只能在当前循环标签的属性和内部进行使用
  - 在相同容器和示例范围内，循环临时变量优先级高于vue实例数据仓库的变量

```
  <!--
  	1、items 类型为 Array
  		-> item 为数组循环时当前循环到的数组元素  [1,2,3,4]
  	2、items 类型为 Object
  		-> item 为对象循环时当前循环到的键值对的 值
  	3、items 类型为 number
  		-> item 数值从1开始的累加值
  	4、items 类型为 string
  		-> item 从字符串下标0开始的每次循环的 字符
  -->
  <div v-for="item in items">
    {{ item.text }}
  </div>
  <!--
  	1、items 类型为 Array
  		-> item 为数组循环式当前循环到的数组元素
  		-> arg2 表示当前数组循环到的下标值（索引）
  		-> arg3 只在循环对象时有效
  	2、items 类型为 Object
  		-> item 为对象循环时当前循环到的键值对的 值
  		-> arg2 为对象循环时当前循环到的键值对的 键
  		-> arg3 vue为对象循环提供的计数器（从 0 ）
  	3、items 类型为 number
  		-> item 数值从1开始的累加值
  		-> arg2 循环次数的统计 （从 0 ）
  	4、items 类型为 string
  		-> item 从字符串下标0开始的每次循环的 字符
  		-> arg2 字符下标（索引）
  -->
  <div v-for="(item [,arg2] [,arg3]) in items">
    {{ item.text }}
  </div>
```

  - 取值表达式：也可以为数组索引指定别名 (或者用于对象的键)：

  ```
  <div v-for="(item, index) in items"></div>
  <div v-for="(val, key) in object"></div>
  <div v-for="(val, name, index) in object"></div>
  ```

- **辅助渲染**：`v-for` 指令为提高性能采用部分标签渲染操作（**只针对与需要添加和删除的标签进行渲染操作**）
  - `v-for` 默认不改变整体，而是**重复替换使用已有元素**，该方式会导致页面排序功能展示出现问题。

  - 为迫使其`v-for`重新排序元素，需要提供一个 `key` 的特殊属性，为每个元素提供唯一key值**不能使用下标**

```html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
```

​    

#### 10、 **v-bind**

缩写：`:`

语法：

```vue
<p v-bind:[参数][.修饰符]="取值">{{msg}}</p>
<p :[参数][.修饰符]="参数">{{msg}}</p>
```

- 参数
  - attr：HTML标签属性
  - prop：动态的绑定一个或者多个特性，或者组件的prop到表达式





#### 11、指令总结

- 功能指令：v-pre、v-clock、v-on、v-once。
- 构成指令：v-text、v-html、v-show、v-if、v-else-if、v-else、v-for、v-bind
- **构成指令和差值表达式具有响应式特性**



### 5.3，MVVM原理

- 数据劫持 Object.defineProperty(obj,prop,descriptor)

  - obj 需要操作的对象

  - prop 要定义或修改的属性名

  - descriptor 被定义或者被修改的属性的描述

  - descriptor 分为**数据描述**和**存取描述**，只能有一种描述，否则会报错

    | 共有描述                                                     | **数据描述**                                                 | **存取描述**      |
    | :----------------------------------------------------------- | :----------------------------------------------------------- | :---------------- |
    | **configurable**：默认false，为true时该属性的**描述**才会改变，同时该属性才会被删除 | **value**：默认为undefined。可以是任何有效的js值。           | **get：**取值函数 |
    | **emuerable**：默认false，为true时该属性可枚举               | **writable：**默认为false。为true时该属性可以被赋值运算符改变 | **set：**赋值函数 |

    ```js
    var o = {}
    o.a = 1;
    //等同于
    Object.defineProperty(o,'a',{
        value: 1,
        writable: true,
        configurable: true,
        emuerable: true
    })
    
    //存取描述
    Object.defineProperty(o,'a',{
        get(){
            //...
            return ...
        }
            set(nv){
                ....
            }
    })
    
    
    ```
	mvvm 简单原理

    ```html
    <body>
      <p></p>
      <input type="text" oninput="input(this.value)">
      <script>
        let a = '的风景'
        let data = {};
        Object.defineProperty(data, 'a', {
          get() {
            return a
          },
          set(nv) {
            a = nv;
            document.querySelector('p').innerText = nv;
          }
        })
        const input = nv => data.a = nv
      </script>
    </body>
    ```



### 5.4、双向数据绑定v-model

- js变量变化，页面重新渲染。页面元素变化，更新js变量

- 基于响应式原理，和事件监听。

  ```
  model ==》基于Object.defineProperty，响应式重新渲染页面  ==》view
  
  view ==》使用事件监听页面变化，更新js变量  ==》 model
  ```

- 仅限于页面可输入表单或可选择元素（或组件）：<input/> <select/> <textarea/>

- 语法：<input v-model='name'/> ，name时model里的数据。

- 修饰符：

  - `.lazy`：将`input`事件变为`change`事件
  - `.number`：输入字符串转为数字
  - `.trim`：去除首尾空格。

- 对于不同的元素使用不同的属性和不同的监听事件
  - `text和textarea`使用`value`属性和`input`事件
  - checkbox和radio使用checked属性，和change事件
  - select将value作为prop，和change事件。

#### text

```html
<input v-model='name'/>
<p>my name is:{{ name }}</p>
```

#### textarea

```vue
<textarea v-model='msg'></textarea>
<p>message:{{msg}}</p>
```

> `<textarea>{{ msg }}</textarea>并不会生效`



#### checkbox

- 单个复选框，绑定到布尔值

  ```html
  <input type="checkbox" true-value='选中' false-value='未选中' v-model='checked'>
  data:{
  	checked: true // 或者'选中'
  }
  <!-- 值的绑定 -->
  <!--true-value='选中' false-value='未选中'-->
  ```

- 多个复选框，绑定到数组

  ```html
  <input type="checkbox" value='jack' v-model='checked'>
  <input type="checkbox" value='tom' v-model='checked'>
  <input type="checkbox" value='marry' v-model='checked'>
  data:{
  	checked:[]//默认选中['jack','tom']
  }
  ```


#### radio

```html
<input type="radio" value='jack' v-model='picked'>
<input type="radio" value='tom' v-model='picked'>
<input type="radio" value='mary' v-model='picked'>
data:{
	picked:''//默认选中picked:'tom'
}
```



#### select

- 单选，绑定字符串

  ```html
  <select v-model='selected'>
    <option disabled value="">请选择</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="B">C</option>
  </select>
  data:{
  	selected:''//默认选中selected:'C'
  }
  ```

  > 如果 `v-model` 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

- 多选，绑定数组

  ```
  <select v-model='selected' multiple>
    <option disabled value="">请选择</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="B">C</option>
  </select>
  data:{
  	selected:[]//默认选中selected:['A','B']
  }
  ```



### 6、数据控制

- 自定义数据接口，完成相对复杂的数据处理和监控
- 两大特点：数据控制和数据包装

#### 6.1、计算属性（computed）

- **数据包装+数据监控**

  ```js
  new Vue({
      data:{},
      computed:{
          //计算属性
      },
      methods:{
         // 方法
      }
  })
  ```

- 语法：`computed: {key:value}`

  - key：计算属性名称。具有vue的data里的普通变量的功能，可以访问this

  - value：计算属性取值。

    - 取值为函数时：提供计算属性的取值功能。该属性为只读属性。

      ```js
      computed: {
        whichSelect(){
          return '选择的是'+this.selected
      }
      ```

    - 取值为Object(get:function,set:function)时。提供该计算属性的取值和修改

      ```js
      whichSelect:{
        get(){
          return this.cl
        },
        set(nv){
          this.cl = nv
        }
      }
      ```

- 特性：

  - 有缓存：只执行一次，依赖项未变化时，或者没有data数据依赖时，不进行计算。
  - 不能与data里定义的数据同名。



#### 6.2、过滤器（filters）

- **完成数据包装**

- 范围：插值表达式和v-bind

- 语法：使用`|`连接待处理变量和过滤方法

- 特性：不具有缓存，处理函数内部的this是Window对象。

  ```html
  <!-- 插值表达式 -->
  <p>{{ 待处理变量 | 处理方法 }}</p>
  <p>{{ 待处理变量 | 处理方法() }}</p>
  
  <!-- v-bind -->
  <p v-bind:' 待处理变量 | 处理方法 '></p>
  <p v-bind:' 待处理变量 | 处理方法() '></p>
  ```



1. 局部过滤器

   定义在vue实例里，仅限当前vue实例里使用。

   ```js
   new Vue({
       data:{},
       filters: {
           toUpperCase(t,a,b,c){
               //默认参数是待处理变量
               return t.toUpperCase()
           }
       }
   })
   ```

2. 全局过滤器

   通过Vue装载的过滤器方法，给所有的vue实例使用。

   > 在Vue实例化之前，同名过滤器优先级低于局部

   ```js
   Vue.filter('id',handler)
   ```


#### 6.3、监视器（watch）

- **数据监控**

- 功能：实现对vue实例中数据（data，computed）的变化的额外的监控方法

- 特性：监控方法只监听所监听变量**值**的变化，处理函数不能使用箭头函数，否则函数中this不是当前实例，而是Window。

- 组建内构建方法

  ```
  new Vue({
      watch: {
          key: value
      }
  })
  ```

  - key:(String)：被监控的数据变量名称或**对象路径表示法('user.name')**

  ```js
  methods: {
    a(){
      console.log('a');
    }
  //监听user变量，不会响应user.a的变化，可以监听user.a
  //或者对象路径
      'user.a'(){
          console.log('a')
      }
  ```



  - value:(String|Function|Object|Array)

    - 字符串：方法名

    ```js
    //method中的方法名
    a:'a'
    ```



    - 函数：监控方法
    
    ```js
    //处理函数接受2个参数，新值和旧值
    a: function(nv, ov){
        console.log(nv, ov)
    }
    //简写
    a(nv, ov){
        
    }
    ```
    
    - 对象：监控配置
    
    ```js
    a: {
        handler: 'a',
        deep: true,//默认false，是否深度监视
        immediate: true//默认false，是否立即监视
    }
    ```
    
    - 数组：一组上述执行方法
    
      ```js
      a: ['a','b',function(){}]
      ```





### 7、页面模板和render函数

1. **模板属性(template)**

   template所指定的页面结构，会替换到el所指定的容器。

   ```
   new Vue({
       el: 'app',
       template: StringDom | StringEl
   })
   //template: document.querySelector('#root')
   //template: '<div>{{msg}}</div>
   ```

   - StringDom：HTML的字符串定义方式
   - StringEl：HTML选择器

2. **渲染函数(render)**
    render函数构成的模板具有**最高优先级**，最终会替换el指向的容器，会使template属性失效。

    ```js
    render(h){
      return  h('ul',{class: 'ul'},[
        h('li',{class:'li'},'li '+this.msg),
        h('li',{class:'li'},'li '+this.msg)
      ])
    }
    ```


### 8、实例属性和方法

















