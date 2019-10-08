![icon](C:\Users\Administrator\Desktop\web-study\image\数组和字符串方法总结.png)

# String对象的方法

## 字符串操作

### **截取**

- **slice(start,end)**:截取字符串的某些部分，返回被截取的部分

  start ：必选，下标从0开始

  end：可选，无则截取到最后

  > 负数则为从后向前，最后一个为-1，依次为-2，-3。第一个参数的下标大于第二个参数值的下标则为空字符串。

  ```js
  var a = 'hello world';
  var b = a.slice(3,7);
  var c = a.slice(-3);
  var d = a.slice(6,5)
  // b: "lo w"
  //c: "rld"
  //d: ""
  //a: "hello world"
  ```

- **substring(start,end):**类似slice

  start ：必选，下标从0开始

  end：可选，无则截取到最后

  > 负数被当作0，开始，大于length会被当做length，第一个参数大于第二个和颠倒过来的效果一样。

  ```js
  var a = 'hello world';
  var b = a.slice(3,7);
  
  // b: "lo w"
  
  ```



## 字符串位置

- **indexOf**，**lastIndexOf**

  searchValue：需要查找的字符串

  fromIndex：起始位置

  > str中有则返回第一次出现的下标，无则返回-1,lastIndexOf从最后开始查找

  ```js
  var a = 'hello world';
  var b = a.indexOf('l');
  //2
  var c = a.indexOf('l',4);
  //9
  var d = a.indexOf('lx');
  //-1
  var e = a.lastIndexOf('l');
  //9
  ```

- **inclues(searchValue)**

  searchValue：需要查找的字符串，区分大小写

  fromIndex：起始位置

  > 返回值为bool值

  ```js
  var a = 'hello world';
  var b = a.includes('e');
  //true
  var c = a.includes('ex');
  //false
  var d = a.includes('e',2);
  //false
  ```

- **startsWith**

  searchValue：需要查找的字符串，区分大小写

  fromIndex：起始位置

  > 是否以searchValue开头或者结尾，返回bool值

  ```js
  var a = 'hello world';
  a.startsWith('he')//hel,hello
  //true
  var c = a.startsWith('e');
  //false
  var d = a.startsWith('e',1);
  //true
  
  ```

- **endWith**

  searchValue：需要查找的字符串，区分大小写

  length：作为字符串的长度

  ```js
  a.endsWith('ld')//d,ord
  //true
  var c = a.startsWith('l');
  //false
  var d = a.startsWith('e',9);
  //false
  ```



## 转换数组

- **split**

  separator：分离器，以它字分割字符串为数组，可以是字符串或是正则。

  limit：限定返回的数组片段数量

  > 如果separator是“”空字符串，则以每个字符分割。
  >
  > 不存在separator返回一个只包含源str的数组
  >
  > 使用正则捕获()，会将separator也加到数组之中

```js
var a = "Oh brave new world "
var b = a.split(' ')
// ["Oh", "brave", "new", "world", ""]

var a = 'hell1dellerth';
var b =a.split('e');
//["h", "ll1d", "ll", "rth"]

var c = a.split(/(e)/)
//["h", "e", "ll1d", "e", "ll", "e", "rth"]
```





## 重复(es6)

- **repeat(n)**

  重复一个字符串n遍，n>=0

  > n为整数，小于0报错，2.8自动转换为2，‘6’转换为6

  ```
  var a = 'el';
  var b = a.repeat(3);
  //b:'elel'
  ```
  



## 填充(es6)

- **padStart**

  targetLength：目标长度，小于源字符串长度，则不进行pad直接返回源

  padString：填充字符串，填充后的长度大于targetLength，只保留最左侧

  ```js
  'abc'.padStart(10);         // "       abc"
  'abc'.padStart(10, "foo");  // "foofoofabc"
  'abc'.padStart(6,"123465"); // "123abc"
  'abc'.padStart(8, "0");     // "00000abc"
  'abc'.padStart(1);          // "abc"
  ```

- **padEnd**

  targetLength：目标长度，小于源字符串长度，则不进行pad直接返回源

  padString：填充字符串，填充后的长度大于targetLength，只保留最左侧

  ```js
  'abc'.padEnd(10);          // "abc       "
  'abc'.padEnd(10, "foo");   // "abcfoofoof"
  'abc'.padEnd(6, "123456"); // "abc123"
  'abc'.padEnd(1);           // "abc"
  ```



## 字符串匹配模式

- **match(regexp)**

  regexp：一个正则表达式。如果参数不是正则，会隐式转换为正则，没有参数会返回一个[""]

- 如果使用g标志，则将返回与完整正则表达式匹配的所有结果（`Array`），但不会返回捕获组，或者未匹配 `null`。**参见正则的方法**

- 如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（`Array`）。 在这种情况下，返回的项目将具有如下所述的其他属性，或者未匹配 `null`。

  ```js
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var regexp = /[A-E]/gi;
  var matches_array = str.match(regexp);
  
  console.log(matches_array);
  // ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
  ```

  