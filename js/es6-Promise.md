## 1、Promise含义

Promise是一个对象，代表一个异步操作最终是否完成，或者失败。

- 三种状态：**pending**(进行中)、**fulfilled**(已成功)、**rejected**(已失败)，只有异步操作的结果可以改变状态，从pendling  ---->    fulfilled，或者从pending    ---->    rejected

## 2、基本用法

Promise是一个对象，用来生成promise实例，接收一个有两个参数的函数作为参数：

- resolve：将Promise对象的状态由pending变为fulfilled；在异步结果成功时调用，并将结果作为参数传递出去。
- rejected：将Promise对象的状态由pending变为rejected；在异步结果调用失败时调用，并将错误信息作为参数传递出去。

```js
const promiseA = new Promise(function(resolve, reject){
  if(/*成功*/){
     resolve(data);
     }else{
    //失败
    reject(error)
  }
})
```

使用then来指定fulfilled和rejected的回调函数。then方法接收