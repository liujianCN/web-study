# `vue`  基础

##  MVVM

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

  ```
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

  

## vue

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