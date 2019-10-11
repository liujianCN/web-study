# let&const

- 只在当前代码块内使用

  ```js
  {
    let a = 5
  }
  console.log(a)
  //a is not defined
  ```

- 不能重复声明

  ```js
  let a = 6;
  let a = 8;
  // Identifier 'a' has already been declared
  ```

- 全局作用域声明的变量属于顶级对象，而不再属于window

  ```js
  let a = 1;
  window.a
  //undefined
  ```

- 声明前使用会报错

  ```js
  let i = i
  //或者
  console.log(o);let o
  //ReferenceError: Cannot access 'o' before initialization
  ```

  

- 暂时性死区

  代码块内，在声明前变量不可用，这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

  ```js
  //普通
  {
    i = 1;
    let i;
  }
  //ReferenceError: Cannot access 'o' before initialization
  //函数默认参数
  function bar(x = y, y = 2) {
    return [x, y];
  }
  bar()
  //ReferenceError: Cannot access 'o' before initialization
  ```

- const

  声明一个只读的常量，const 必须声明的同时初始化，不能以后赋值。

  ```js
  const a = 5;
  a = 6;
  // Assignment to constant variable
  const a;
  // Missing initializer in const declaration
  ```

  本质：是保证变量指向的内存地址里所保存的数据不改动。

  对于简单类型数据，值就保存在变量指向的内存地址，所以为常量。

  对于引用类型，变量指向的内存地址保存的是实际数据的指针，只能保证指针是固定的

  ```js
  cosnt a = {};
  a.a = 5
  // a:{a:5}
  ```

  



- **提升**

  js变量的「创建create、初始化initialize 和赋值assign」

  - **var :**
    1. 创建执行环境
    2. 找到所有var 声明的变量，「创建create」
    3. 初始化这些变量，「初始化initialize」为**undefined**
    4. 开始执行代码
  - **function :**
    1. 创建执行环境
    2. 找到所有用 function 声明的变量，在环境中「创建」这些变量。
    3. 将这些变量「初始化」并「赋值」为 function(){ console.log(2) }。
    4. 执行代码
  - **let :**
    1. 创建执行环境
    2. 找到所有let声明的变量，「创建create」
    3. 执行代码，执行到 let才开始初始化，「初始化initialize」

  ```js
  let x = 1;
  //初始化x为1；
  let x
  //初始化x为undefined
  ```

  >var 的创建和初始化被提升了
  >
  >let 的创建被提升了

  

- **ES6的变量声明的6种方法**

  ES5的2种：var、function。

  ES6的4种：let、const、import、class


