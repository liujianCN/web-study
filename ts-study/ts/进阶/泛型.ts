/* ************************************************* */
/* any可以使函数的可复用性，但也丢失了一些信息，传入值和返回值。 */

const getArray1 = (v: any, t: number = 5): any[] => {
  return new Array(t).fill(v)
}
console.log(getArray1(9, 2).map(item => item.length ))
//[undefined, undefined]

/*
 * 可以只用泛型定义，进行约束。不丢失输入，输出的类型。
 */

const getArray2 = <T>(v: T, t: number): T[] => {
  return new Array(t).fill(v)
}
const g2result1 = getArray2(3, 2).map(item => item.toFixed(2))
const g2result2 = getArray2('adc', 2).map(item => item.length)
console.log(g2result1)
console.log(g2result2)

const getArray3 = <T,U>(p1: T, p2: U, t: number): [T, U][] => {
  return new Array(t).fill([p1, p2])
}

const g3result1 = getArray3(2,'3',3)
console.log(g3result1)

//定义类型，然后赋值
// let getArray4: <T>(v: T, t: number) => T[];
/* new Array() 的返回值类型为any[] */
let getArray4 = (v: number, n: number): string[] => new Array(n).fill(v)

console.log(getArray4(3,2)[0].length) // undefined

interface GetArray {
  <T>(v: T, t: number): T[]
}


/* ********************** 泛型约束 ******************** */
/*
 * 对传入的泛型变量进行约束 
 */

interface ParamsWithLength {
  length: number
}

const getArray5 = <T extends ParamsWithLength>(v: T, t: number): T[] => new Array(t).fill(v);
// const rs5 = getArray5(123,4) //123 number不具有length属性，不能传
const rs5 = getArray5('123',4) // 或者[], 具有length属性的值

/**
 * keyof 关键字, 
 */
const getProps = <T, K extends keyof T>(obj: T, propName: K) => {
  return obj[propName]
}
const obj = {
  a: 'a',
  b: 'b'
}

getProps(obj, 'a') // 在编译阶段可以知道传入的propName只能是a,或者b