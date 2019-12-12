interface Person {
  name: string,
  age: number
}

let tom: Person = {
  name: 'tom',
  age: 18
}

// -少变量会报错
tom = {
  name: 'lisi'
}

// -多变量会报错
tom = {
  name: 'tom',
  age: 18,
  sex:'m'
}
// -赋值的时候变量必须与接口形状保持一致

//可选属性

interface Student {
  name: string,
  age: number,
  sex?: boolean
}

let sunh: Student = {
  name: 'sunh',
  age: 15
}

//可选属性,可选,但不允许添加未定义属性

//任意属性

interface Man {
  name: string,
  age: number,
  [propName: string]: string
}