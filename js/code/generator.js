// 可以将Generator理解成状态机， 封装了多个内部状态

function* say() {
  // console.log('执行了 start')
  yield "hello";
  // console.log('执行了 hello')
  yield "world";
  // console.log('执行了 world')
  return "bye";
}

/***************************gnenerator的执行顺序 */

// 调用gennerator函数会返回一个遍历器对象。

let s = say();
// 在执行gennerator时函数并未执行

// var a = s.next()
// 在第一次执行Iterator对象的next方法时，函数才会执行，
// 执行第一个yeild ，返回{ value: 'hello', done: false }， 并暂停
// console.log(a);
// var b = s.next()
// console.log(b)
// var c = s.next()
// console.log(c)
// var d = s.next()
// console.log(d)

// generrator函数执行后返回的遍历器对象的遍历器接口函数执行后返回自身

/***************************gnenerator函数的状态 */

// s[Symbol.iterator]() === s

// for (const i of s) {
//   console.log(1 + i);
// }

// for (const o of s) {
//   console.log(2 + o);
// }
// console.log([...s]);

// 遍历过一次的遍历器对象不会在被遍历， 即其状态已经由suspended变为close

/***************************注意事项 */
//- yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
//- yield表达式如果在函数的参数或者赋值表达式的右边，可以不加括号

/***************************next方法的参数 */

// yield 表达式本身没有返回值，或者说返回undefined，但是next方法可以传一个参数，当作上一个yield表达式的返回值

function* foo(x) {
  var y = 2 * (yield x + 1);
  var z = yield y + 3;
  return x + y + z;
}

var x = foo(5);
var a = x.next();
// 第一次执行力yield，函数暂停在(yield x + 1)
var b = x.next(6);
// x.next(6)，参数会作为(yield x + 1), y = 15,执行并返回yield(y + 3)
var c = x.next(13)
//执行最后并返回最后的return语句，并将13当作yield(y+3)的返回值
console.log(a,b,c);


/******************************自动next */
// for of 、...拓展运算符、[x, y]解构赋值、Array.from方法都会自动调用next，不传参。
// 在遇到done: true时，会中断执行
var y = foo(5)

var a = [...y]
console.log(a)


/******************************状态机 */

function* clock() {
  while (true) {
    yield ('tick')
    yield ('tock')
  }
}
var x = clock()
console.log(x.next())
console.log(x.next())
console.log(x.next())
console.log(x.next())


/******************************Generator与异步 */
function* load() {
  var a = yield new Promise(r => setTimeout(r, 2000, 2));
  console.log(a);
  var b = yield new Promise(r => setTimeout(r, 3000, 9));
  console.log(b);
  return a + b + 4;
}

function* loadAll() {
  var a = yield Promise.all([
    new Promise(r => setTimeout(r, 2000, 2)),
    new Promise(r => setTimeout(r, 3000, 9))
  ]);
  console.log(a);
  // return a + b ;
}

function co(gen) {
  gen = gen();
  return new Promise(r => {
    next((res = undefined));
    function next(res) {
      let ret = gen.next(res);
      if (ret.done) return r(ret.value);
      ret.value.then(res => next(res));
    }
  });
}

co(load)
co(loadAll)
