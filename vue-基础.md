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

### 5.1 差值表达式

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

- **修饰符**：

  - `.stop` - 调用 `event.stopPropagation()`。
  - `.prevent` - 调用 `event.preventDefault()`。
  - `.capture` - 添加事件侦听器时使用 capture 模式。
  - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  - `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
  - `.native` - 监听组件根元素的原生事件。
  - `.once` - 只触发一次回调。
  - `.left` - (2.2.0) 只当点击鼠标左键时触发。
  - `.right` - (2.2.0) 只当点击鼠标右键时触发。
  - `.middle` - (2.2.0) 只当点击鼠标中键时触发。
  - `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

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

