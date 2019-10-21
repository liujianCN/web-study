1. 转换方法—toLocaleString()方法、toString()方法、valueOf()方法
2. 栈方法——push()方法、pop()方法
3. 队列方法——shift()方法、unshift()方法
4. 排序方法——reverse()方法、sort()方法
5. 操作方法——concat()方法、slice()方法、splice()方法
6. 位置方法——indexOf()方法、lastIndexOf()方法
7. 迭代方法——every()方法、filter()方法、forEach()方法、map()方法、some()方法
8. 归并方法——reduce()方法、reduceRight()方法

## 一、栈方法

### 1、push

将任意数量参数，逐个添加到数组末尾，返回修改后数组的长度。

```js
let arr = [1,2,3,4,5]
console.log(arr.push(5))   // 6
console.log(arr) // [1,2,3,4,5,5]
```



### 2、pop

移除数组的最后一项，返回该项

```js
let arr = [1,2,3,4,5]
console.log(arr.pop())     // 5
console.log(arr)  //[1,2,3,4]
```

## 二、队列方法

### 1、unshift

将任意数量的参数，添加到数组的前面，返回修改后的数组的长度。

```js
let arr = [1,2,3,4,5]
console.log(arr.unshift(2))    // 6
console.log(arr)  //[2,1,2,3,4,5]
```



### 2、shift

移除数组的第一项，返回该项

```js
let arr = [1,2,3,4,5]
console.log(arr.shift())  // 1
console.log(arr)   // [2,3,4,5]
```



## 三、排序方法

### 1、reverse

反转该数组返回该数组的引用。

```js
let arr = [1,2,3,4,5]
console.log(arr.shift())  // [5, 4, 3, 2, 1]
console.log(arr)   // [5, 4, 3, 2, 1]
```

### 2、sort

接收一个可选的排序函数，没有排序函数，元素按照转换为的字符串的各个字符的Unicode位点进行排序。

```js
//数字数组简单排序
let arr = [2,10,6,1,4,22,3]
console.log(arr.sort())   // [1, 10, 2, 22, 3, 4, 6]
let arr1 = arr.sort((a, b) =>a - b)  
console.log(arr1)   // [1, 2, 3, 4, 6, 10, 22]
let arr2 = arr.sort((a, b) =>b-a)  
console.log(arr2)  // [22, 10, 6, 4, 3, 2, 1]
//对象数组
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic',value: 67 },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  return (a.value - b.value)
});
```



## 四、操作方法

### 1、concat

合并两个或者多个数组，不会改变现有数组，返回新数组

> 所合并数组的浅拷贝

```
var alpha = ['a', 'b', 'c'];

var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric); 
// results in ['a', 'b', 'c', 1, 2, 3]
```

### 2、slice

返回一个`begin`和`end`所决定的原数组的**浅拷贝**的新数组。**包含begin，不包含end[begin,end)**

- begin | 可选

  从索引0开始，如省略，则从0开始。负数从倒数开始。大于原数组长度，返回空数组。

- end | 可选

  从索引0开始，如省略，提取到数组末尾，大于数组长度，提取末尾。

```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);
//["Orange", "Lemon"]
```

### 3、splice

删除、替换现有元素、增加元素，以数组形式返回被修改的内容，会改变原数组。

- start

  指定修改位置，

- deleteCount | 可选

  如果省略或者deleteCount 大于start之后的长度，则连