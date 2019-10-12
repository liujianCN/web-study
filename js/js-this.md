- [this原理--阮一峰](<http://www.ruanyifeng.com/blog/2018/06/javascript-this.html>)

> Whenever a function is called, we must look at the immediate left side of the brackets / parentheses “()”. If on the left side of the parentheses we can see a reference, then the value of “this” passed to the function call is exactly of which that object belongs to, otherwise it is the global object.



代码在执行前会大致经过3个阶段：

1. 分词/词法分析（Tokenizing/Lexing）
2. 解析/语法分析（Parsing）
3. 代码生成

js使用的是词法作用域，大部分情况下，作用域在代码书写时函数声明的位置来决定的。



this能够更优雅的方式来隐式传递一个对象的引用。

## **this指向什么**

this是在运行进行绑定的，并不是在编写时，this的绑定只取决于函数的调用方式。

> 当函数调用时，会创建一个临时对象(Active Object)(也成为执行上下文)，这个对象记录着函数的调用栈，调用方法，传入参数和**this**

## **调用位置**

分析调用栈，找出调用位置

```
function c() {
  function d(){
    function e(){
      console.log(this)
    }
    e()
  }
  d()
}
c()
```



![1570778283271](C:\Users\Administrator\Desktop\web-study\js\image\1570778283271.png)



## **判断应用规则**

判断需要应用下面四个规则中某一个。



### **默认绑定**

在函数没有任何修饰的独立调用时，进行默认绑定到全局对象`window`，与调用位置无关。

```js
function a(){
  console.log(this)
}
a()
```

> 严格模式下，无法使用默认绑定，this is undefined



### **隐式绑定**

调用位置是否有上下文对象，对象的属性链最后一层会影响调用位置

```js
//同上函数a
var obj = {
  a,
}
//或者，原理一样
var obj = {
  a: function() {
    console.log(this)
  }
}

//调用
obj.a()
//this指向obj对象
/*****************/
var obj2 = {
  obj
}
obj2.obj.a()
//this指向为obj对象，而非obj2对象
```



**隐式丢失**

隐式绑定的函数会丢失绑定对象，从而使用默认绑定，绑定this为全局变量，或window，给对象的函数，赋值给一个变量，或者作为回调函数传入。

```js
var bar = obj.a;
bar()
//this指向window

/**  回调函数  **/
doSomething(callback){
  callback()
}
doSomething(obj.a)
//this指向window

/**  内置函数  **/
setTimeout(obj.a, 1000)
//this指向window
```

> 参数传递实际上是一种**隐式赋值**，传递的函数也会被隐式赋值，结果与赋值给一个变量相同。



### 显式绑定

在我们不想在对象内部引用某个函数，也想在这个对象上强制使用某个函数。js的`Function`的prototype里有三个方法`call、apply、bind`方法。可以直接绑定函数的this为某个对象。

```js
function bar() {
  console.log(this)
}
var o = {
  a: 1
}
bar.call(o)
//this指向 o
```

call与apply会立即执行某个函数，在不需要立即执行的时候，无法使用需要包装一下。

```js
function bar(n) {
  console.log(this)
  console.log(this.a + n)
}
var obj = {
  a: 1
}
var foo = function() {
  return bar.apply(obj, arguments)
}
setTimeout(foo, 1000, 4)
//简单的绑定函数
function bind(fn,obj) {
  return function() {
    return fn.apply(obj,arguments)
  }
}
var foo = bind(bar, obj)
setTimeout(foo, 1000, 4)
```

> 由于`硬绑定`很常见，所以ES5原生提供了bind函数，使用方法同上 `var foo = bind(bar, obj)`



### **new绑定**

使用`new`运算符进行，函数的`构造调用`

```js
function F(a) {
  this.a = a;
  console.log(this)
}
var b = new F(3);
//构造函数中的this，指向构造函数的实例
```



## 箭头函数中的this

四种应用规则适用与普通function函数，ES6的箭头函数，不适用。

```js
function bar() {
  return () => console.log(this.a)
}
var obj1 = {
  a:'obj1'
}
var obj2 = {
  a:'obj2'
}
var a = bar.call(obj1);
a.call(obj2)
//obj1
```

箭头函数的this，在创建时，会捕获上层非箭头函数作用域的this，或全局对象，或者undefined，作为箭头函数的this，与箭头函数之前的self机制一样，Babel转换的代码也是如此。

```js
function a(){
	() => {
    console.log(this);
      () => {console.log(this)}
    }
}
//Babel转换
function a() {
  var _this = this;

  (function () {
    console.log(_this);

    (function () {
      console.log(_this);
    });
  });
}
```

### 常见用途

- 回调函数

  ```js
  
  ```

- 事件处理

  ```js
  
  ```

- 定时器



## 注意

有些情况需要bind，比如科里化 时，需要传入null，如果想“更安全”地忽略 this 绑 定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null)，以保护全局对象。



如果你经常编写 this 风格的代码，但是绝大部分时候都会使用 self = this 或者箭头函数 来否定 this 机制，那你或许应当：

1. 只使用词法作用域并完全抛弃错误 this 风格的代码；
2. 完全采用 this 风格，在必要时使用 bind(..)，尽量避免使用 self = this 和箭头函数。

当然，包含这两种代码风格的程序可以正常运行，但是在同一个函数或者同一个程序中混 合使用这两种风格通常会使代码更难维护，并且可能也会更难编写。