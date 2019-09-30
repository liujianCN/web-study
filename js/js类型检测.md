# 类型检测

## js类型值

有两种数据类型，分别是 **基本数据类型** 和 **引用数据类型** 。

基本数据类型： Number， String， Undefined， Null， Boolean， Symbol（ES6新增，表示独一无二的值）

引用数据类型： 统称为 Object 对象，主要包括对象，数组，函数。

### 基本数据类型

#### 1 值是不可变的

```js
var name = 'javascript' 
name.toUpperCase(); // 输出 'JAVASCRIPT' 
console.log(name); // 输出 'javascript'
```

由此可得，基本数据类型的值是不可改变的。

#### 2 存放在栈区

原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小，大小固定，属于被频繁使用数据，所以放入栈中存储。

#### 3 值的比较

```js
var a = 1; 
var b = true; 
console.log(a == b); // true 
console.log(a === b); // false
```

== : 只进行值的比较,会进行数据类型的隐式转换。

===：不仅进行值的比较，还要进行数据类型的比较。



=======================================================================================

### 引用数据类型

#### 1 值是可变的

```js
var a = { age: 20}； 
a.age= 21 
console.log(a.age) //21
```

上面代码说明引用类型可以拥有属性和方法，并且是可以动态改变的。

#### 2 同时保存在栈内存和堆内存

引用数据类型存储在堆 (heap) 中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。



![img](https://upload-images.jianshu.io/upload_images/3785215-835d91cf38faa60a.png?imageMogr2/auto-orient/strip|imageView2/2/w/563/format/webp)



#### 3 比较是引用的比较

当从一个变量向另一个变量赋引用类型的值时，同样也会将存储在变量中的对象的值赋值一份放在新变量分配的空间中。

```jsx
var a = { age: 20}; 
var b = a; 
b.age = 21; 
console.log(a.age==b.age) //true
```

上面我们讲到基本类型和引用类型存储于内存的位置不同，引用类型存储在堆中的对象，与此同时，在栈中存储了指针，而这个指针指向正是堆中实体的起始位置。变量 a 初始化时，a 指针指向对象{age:20} 的 地址，a 赋值给 b 后,b 又指向该对象 {age:20} 的地址，这两个变量指向了同一个对象。因此，改变其中任何一个变量，都会相互影响。

![img](C:\Users\Administrator\Desktop\web-study\image\3785215-4ed55f841c845a07.webp)

此时，如果取消某一个变量对于原对象的引用，不会影响到另一个变量。

```csharp
var a = { age: 20 }; 
var b = a; 
a = 1;
b // {age:20}
```

上面代码中，a 和 b 指向同一个对象，然后 a 的值变为 1，这时不会对 b 产生影响，b 还是指向原来的那个对象。

## js检查数据类型

### 1 typeof

typeof 返回一个表示数据类型的字符串，返回结果包括： number， boolean，string， symbol，object， undefined， function 7种数据类型 ，但是不能判断 null 和 array（也属于object）等

typeof 其实是一元操作符，和 `+ - * /` 一样，不是一个函数，进行比较的时候，typeof 后面可以跟`（）`, 也可以不跟。

**undefined：**

> typeof undefined; // undefined

很多库因为考虑到 undefined 可能会被意外重写，用 `void 0` 来判断是否是 undefined。

```javascript
var isUndefined = function (obj) {
	return obj === void 0;
}
```

MDN 上对 void 词条的说明是：

> The void operator evaluates the given expression and then returns undefined.

意思是说 void 运算符能对给定的表达式进行求值，然后返回 undefined。也就是说，void 后面你随便跟上一个表达式，返回的都是 undefined，都能完美代替 undefined。

**string, number, boolean, symbol, function, object ：**

```js
typeof Symbol(); // symbol 有效 
typeof ''; // string 有效 
typeof 1; // number 有效 
typeof true; //boolean 有效 
typeof undefined; //undefined 有效 
typeof new Function(); // function 有效
// ===========>>
typeof null; //object 无效 
typeof [] ; //object 无效 
typeof new Date(); //object 无效 
typeof new RegExp(); //object 无效
```

js 中，不同的对象在底层都表示为二进制，在Javascript中二进制前三位都为 0 的话会被检测为 Object 类型，null 的二进制表示全为0，自然前三位也是 0，所以执行 typeof 时会返回 “object”。

数组和对象返回的都是 object，这时就需要使用 instanceof 来判断

### 2 instanceof

instanceof用于检测A是否是B的实例，表达式为 A instanceof B，是返回true，不是返回false。

instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

```jsx
[] instanceof Array // true 
[] instanceof Object // true

{} instanceof Object // true 
new Date() instanceof Date // true
new RegExp() instanceof RegExp // true 
Array.isArray([]); // true
```

数组的判断还可以用 ES6 新增的 Array.isArray(obj)

由于 instanceof 是对 对象实例是否 某对象的原型或者说原型链上的 方法，所以会有一些弊端

instanceof 三大弊端

1，对于基本数据类型来说，字面量方式创建出来的结果和实例方式创建出来的是有区别的

```jsx
console.log( 1 instanceof Number) //false 
console.log( new Number(1) instanceof Number) //true
```

其实就是字面量创建的 基本数据类型 用 typeof 可以检测到对应的类型，用 instanceof 需要创建对象才能用。

2，从严格意义上来讲，只有实例创建出来的结果才是标准的对象数据类型值，也是标准的 Number 这个类的一个实例；对于字面量方式创建出来的结果是基本的数据类型值，不是严谨的实例，但是由于 JS 的松散特点，导致了可以使用 Number.prototype 上提供的方法。

只要在当前实例的原型链上，我们用其检测出来的结果都是 true。在类的原型继承中，我们最后检测出来的结果未必准确。

```jsx
var arr = [1, 2, 3]; 
console.log(arr instanceof Array) // true 
console.log(arr instanceof Object); // true 
function fn() {} 
console.log(fn instanceof Function) // true 
console.log(fn instanceof Object) // true
```

3，对于特殊的数据类型 null 和 undefined，他们的所属类是 Null 和 Undefined，但是浏览器把这两个类保护起来了，不允许我们在外面访问使用。

![img](C:\Users\Administrator\Desktop\web-study\image\3785215-a534dec70b372455.webp)

图片.png

### 3 严格运算符 ===

**只能用于判断 null 和 undefined，因为这两种类型的值都是唯一的。**

```jsx
var a = null 
typeof a // "object" 
a === null // true 
// undefined 还可以用 typeof 来判断 
var b = undefined; 
typeof b === "undefined" // true 
b === undefined // true
```

### 4 constructor（构造函数的构造器）

constructor 作用和 instanceof 非常相似。但 constructor 检测 Object 与 instanceof 不一样，还可以处理基本数据类型的检测。

```jsx
var aa=[ 1, 2]; 
console.log(aa.constructor=== Array); //true 
console.log(aa.constructor=== RegExp); //false console.log((1).constructor=== Number); //true 
var reg= /^$/; 
console.log(reg.constructor=== RegExp); //true console.log(reg.constructor=== Object); //false
```

constructor 两大弊端：

1. null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。
2. 函数的 constructor 不稳定，主要是类的原型进行重写，在重写的过程中有可能把之前的constructor给覆盖了，这样检测出来的结果就是不准确的

```jsx
function Fn() {} 
Fn.prototype = new Array() 
var f = new Fn() 
console.log(f.constructor) // Array
```

### 5 Object.prototype.toString.call()

Object.prototype.toString.call() 是检测类型最准确的常用方法。

ECMAScript 的 Boolean 值、数字和字符串的原始值的有趣之处在于它们是伪对象，这意味着它们实际上具有属性和方法。

ECMAScript 定义所有对象都有 toString() 方法，无论它是伪对象，还是真对象。因为 String 类型属于伪对象，所以它一定有 toString() 方法。

使用 `Object.prototype.toString` 方法, 可以获取到变量的准确的数据类型.

```javascript
Object.prototype.toString.call(1);  // '[object Number]'
Object.prototype.toString.call('1');  // '[object String]'
Object.prototype.toString.call(NaN);  // '[object Number]'
Object.prototype.toString.call(foo);  // '[object Function]'
Object.prototype.toString.call(Symbol());  // "[object Symbol]"
Object.prototype.toString.call([1,2,3]);  // '[object Array]'
Object.prototype.toString.call(undefined);  // '[object Undefined]'
Object.prototype.toString.call(null);  // '[object Null]'
Object.prototype.toString.call(true);  // '[object Boolean]'
Object.prototype.toString.call(/^s/g);  // '[object RegExp]'
Object.prototype.toString.call(Math);  // "[object Math]"
Object.prototype.toString.call(new Error());  // "[object Error]"
Object.prototype.toString.call(new Date());  // "[object Date]"
```

toString 就能解决基本包装类型的检测错误和 `instanceof` 的检测不安全。

基于 toString 我们可以构造很多工具函数用来检测数据类型，这一块实现的方案很多，本文就按下不表。

首先获取到 Object 原型上的 toString()方法，让方法执行， 让 toString 方法中的 this 指向第一个参数的值

注意：关于toString的补充说明

- 本意是转换为字符串，但是某些 toString 不仅仅是转换成字符串
- 对于 Number，String，Boolean，Array，RegExp，Date，Function 原型上的 toString 方法都是把当前的数据类型转换为字符串的类型（它们的作用仅仅是用来转换为字符串的）
- Object 上的 toString 并不是用来转换成字符串的

Obect 上的 toString()方法，它的作用是返回当前方法执行的主体（方法中的 this ）所属类的详细信息即 “[object Object]”， 其中第一个 object 代表当前实例是对象数据类型的（这个是固定死的，不会改变），第二个 Object 代表的是 this 所属的类是 Object。































在`JavaScript`里有四种类型检测的方法：

- `typeof`  用于检测数据类型的运算符
- instanceof 检测一个类是否属于一个类的实例