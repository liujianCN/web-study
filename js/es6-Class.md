## Class基础

es6之前的模拟面向对象的操作是使用构造函数，es6提供了class关键字，更直观、更简化了模拟面向对象的过程。本质上是构造函数的语法糖。

```
class Father {};

Father.prototype.constructor === Father
//true

var a = new Father
a.__proto__ === Father.prototype
//true
```

- **不同**

  1. class 不允许重复定义
  2. 构造函数中prototype里的方法和属性是可枚举的，而**类的内部定义的方法**中是不可枚举的(non-enumerable)，类的prototype上的是可枚举的

  ```js
  class A {
  	name = 'lisi'
    sayN(){
      alert(this.name)
    }
  }
  A.prototype.sayH = function(){alert('hi')}
  
  var a = new A;
  
  for(let i in a) console.log(i)
  //name
  //sayH
  //不包含内部定义的sayN
  ```

  3. constructor方法

     类的默认方法，在new操作时，自动执行这个方法。类必须有constructor方法，没有显示定义，会默认添加constructor方法。

     ```
     class A {};
     等同于
     class A {
       constructor(){
       }
     }
     ```

  4. 必须使用`new`调用，否则会报错

  5. getter和setter ---------------

  6. 属性表达式

     ```
     let name = 'get';
     class A {
       [name](){
         //...
       }
     }
     ```

  7. class 表达式

     ```
     let A = class B {};
     B只能在class内部使用，在class外部只能使用A，内部可以使用A
     可以省略B
     let A = class {};
     ```

     



### 实例

new调用，非显式定义在this（实例）上，就是定义在prototype上

```js
//定义类
class Father {
  constructor(x,y){
    this.x = x;
  	this.y = y;
  }
  sun() {
    console.log(this.x + this.y)
  }
}
var a = new Father(1,3)
```

#### 公有实例字段

不止可以定义在constructor里，也可以定义在类里。

```js
//最好在类的最上方，清晰
class A {
  state = {
    a: 1
  }
  toSring(){
    
  }
}
var a = new A

```









### 公有静态方法

在类中定义的方法，会被实例继承。在方法前加上`static`关键字，它就不会被实例继承，通过类直接调用，这种方法称为静态方法。

```js
class A {
  static say(){
    alert(123)
  }
}
var a = new A;
a.say() // a.say is not a function
// 可以通过类调用
A.say()
```

#### 静态方法中的this

静态方法中的this,指向它的调用者

```js
class A {
  static clg(){
    console.log(this)
  }
}
A.clg()
// class A
```

可以被子类继承

```
class A {
  static clg(){
    console.log(this)
  }
}

class B extends A {
  
}
B.clg()
//class B
```

可以在`super`对象上调用



### 公有静态字段

```js
class A {};
A.count = 5;
//提案
class A {
  static count =5
}
```

可以被子类继承

### 私有字段和方法

只在Class的内部使用，暂略





## Class继承

ES6里使用`extends`关键字实现继承，比ES5的改变原型链更加的清晰，简洁。

```js
//父类
class Father {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  sayName(){
    console.log(this.name)
  }
}
//子类
class Son extends Father {
  constructor(name, age, score){
    super(name, age)
    this.score = score
  }
}
//实例
var lisi = new Son('lisi', 18, 60)
```

子类的constructor方法里**必须调用super方法，且super调用在最上方**。否则实例化时会报错。

ES5的继承是先创建实例对象this，然后在将父类的实例属性添加到this上，Father.call(this)。ES6的继承机制完全不同，。。。。

如果没有显示定义constructor，js引擎会自动添加，只有在super调用之后才可以使用this关键字，因为**子类实例的构建基于父类实例**

```js
class A extends B {}
//等同于
class A extends B {
  constructor(...args){
    super(...args)
  }
}
//报错
class A extends B {
  constructor(name){
    this.name = name
    super()
  }
}
```



### Object.getPrototypeOf() 

返回一个子类的父类，判断一个类是否继承另一个类

```
Object.getPrototypeOf(B) === A
//true
```



### super

1. 作为函数

   在子类的constructor的最前面调用，代表父类的构造函数，必须被调用一次。返回子类的实例。

2. 作为对象

   - 在普通方法中指向父类的原型对象
   - 在静态方法中指向父类







## 注意

this

new.target

es6 为new运算符添加target属性，该属性一般用在Class内部，如果Class是通过new调用或者Reflect.construct()调用，就会返回构造函数本身，否则返回undefined。

> 在子类继承父类时，new.target返回子类，可以利用这一点，设计父类单独使用，只能在继承时使用

```js
function A() {
  console.log(new.target)
}
A()
//undefined
var a = new A;
//返回构造函数A

class A {
  constructor(){
    console.log(new.target === A)
    if(new.target === A) throw new Error('请继承')
  }
}
class B extends A {
  
}
var b = new B
//返回子类，即使new.target定义在父类里
```





