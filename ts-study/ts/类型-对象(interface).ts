interface Person {
  name: string,
  age: number
}

let tom: Person = {
  name: 'tom',
  age: 18
}

// -少变量会报错
// tom = {
//   name: 'tom'
// }

// -多变量会报错
tom = {
  name: 'tom',
  age: 18,
  // sex:'m'
}
// -赋值的时候变量必须与接口形状保持一致

/******************************   可选属性    **********************************/

interface Student {
  name: string,
  age: number,
  sex?: boolean
}

let sun: Student = {
  name: 'sun',
  age: 15
}

/*
* 可选属性, 可选 , 但不允许添加未定义属性
*/





/******************************   任意属性    ********************************/

interface Man {
  name: string,
  age: number,
  [propName: string]: string | number, // 或者 [propName: string]: any
  // [propName: string]: string 会报错
}

/**
 * 如果设置了任意属性，那么所有的确认属性和可选属性的类型都将是任意属性类型的子集；
 * 
 */

let moira: Man = {
  name: 'moira',
  age: 18,
  gender: 'string'
}



/******************************   只读属性    ********************************/

interface Animals {
  readonly id: number,
}
let dog: Animals ={
  id: 123456
}

//  dog.id = '' //不能在对象赋值后再给，readonly属性的值在重新赋值
