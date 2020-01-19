// 部署了[Symbol.iterator]属性即可认为是可遍历的，可以供for of 消费。

let obj = {
  data: ['hello', 'world'],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        console.log('call');
        if (index < this.data.length) {
          return {
            value: this.data[index++],
            done: false
          };
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }
    };
  }
};

let str = 'abcde'
String.prototype[Symbol.iterator] = function () {
  let index = 0;
  return {
    next: () => {
      console.log('call');
      if (index < this.length) {
        return {
          value: this[index++],
          done: false
        };
      } else {
        return {
          value: undefined,
          done: true
        };
      }
    }
  };
}

// for (const i of obj) {
//   console.log(i);
// }

// 原生具有iterator接口的数据结构有
// - Array
// - Set
// - Map
// - String
// - arguments对象
// - NodeList

// 部署Iterator最快捷的方式是使用Generator 函数

let foo = {
  * [Symbol.iterator](){
    yield 1
    yield 2
    yield 3
  }
}

// 调用Iterator接口的情况

// - for of

// - 解构赋值
let [hello, world] = obj
console.log(hello, world);
console.log('============================================');
// - 扩展运算符...

// let hw = [...obj]
// console.log(hw);

let strArr = [...str]

console.log(strArr);
console.log('============================================');

// foreach 不会跳出循环
// for of可以

for (const i of foo) {
  console.log(i);
}