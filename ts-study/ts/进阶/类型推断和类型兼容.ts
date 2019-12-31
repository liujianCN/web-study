let infer1 = [1, '3'];
infer1 = ['3', 1, 2, 3]
infer1 = ['3']
/**
 * 未定义类型时，推断为(string | number)[]
 */


/* ****************************** 上下文推断 **************************** */

// window.onmousedown = (event: MouseEvent) => {
//   console.log(event.detail)
// }



/* ********************************************************************** */

interface inferInfo {
  name: string
}

interface inferInfo2 {
  name: string,
  age: number
}

let infer2: inferInfo;

/* infer2 = {
  name: 'lisa',
  age: 18
} */
// 直接赋值，值必须和接口的形状一样

let infer3: inferInfo2 = {
  name: 'lisa',
  age: 18
}

let infer4 = {
  age: 18
}

infer2 = infer3
// infer2 = infer4 //name is missing infer4的形状不符合infer2的形状。

// 可以将infer3赋值给infer2, 只要infer3有infer2的形状(递归检测)。



/* ******************************* 参数个数 ******************************* */
let func1 = (x: number) => x
let func2 = (x: number, y: number) => x + y
// func1 = func2 //fun2的参数个数大于fun1， 不能赋值给参数较少的函数。
func2 = func1
console.log(func2(2, 3))

let arr1 = [1, 2, 3]

/* 例如数组的回调函数，接受个参数，只能接受少于3个参数的回调函数，不能多于3个 */
// arr1.forEach((item, index, arr1, d) => item)



/* ******************************* 参数类型 ******************************* */

let func3 = (x: number) => x
let func4 = (x: string, y: number) => x + y

// func4 = func3 //不能，参数的类型不兼容

let getSum = (arr: number[], cb: (arg: number[]) => number) => {
  return cb(arr)
}

const sumArr = [1, 2, 3]
const sum5 = getSum(sumArr, (arr) => arr.reduce((a, b) => {
  console.log(a, b)
  return a + b
}, 0))

console.log(sum5)



/* ******************************* 函数参数的双向协变 ******************************* */

let funcA = (x: string | number) => { }
let funcB = (x: string) => { }
let funcC = (x: number) => { }

// funcA = funcB
funcB = funcA
funcC = funcA



/* ******************************* 返回值类型兼容 ******************************* */

let funcD = (x: string): string | number => x;
let funcE = (x: string): string => x;
// funcE = funcD
funcD = funcE



/* ******************************* 枚举的兼容 ******************************* */

enum Status {
  On,
  Off
}
enum Animal {
  Dog,
  Cat,
}

let sO = Status.On
sO = 4
// s = '3'
// sO = Animal.Dog
/*
 * 兼容number类型, 不兼容Animal枚举
 */





/* ******************************* 类的兼容 ******************************* */










/* ******************************* 泛型的兼容 ******************************* */
/* interface DataInfo<T> {
  
}
let data1: DataInfo<string> = {}
let data2: DataInfo<number> = {}

data2 = data1 */
/* 
 * 空的泛型可以兼容
 */

interface DataInfo<T> {
  data: T
}
let data1: DataInfo<string> = { data: '1' }
let data2: DataInfo<number> = { data: 1 }
/*
 * let data1: DataInfo<string>
 * let data2: DataInfo<number>
 *
 * 严格模式下，不能在赋值前使用 data2 = data1
 */

// data1 = data2 // DataInfo<number> 不兼容 DataInfo<string>
