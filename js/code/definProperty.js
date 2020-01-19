var a = {
  name: 'zs'
}
a.sex = '男'

Object.defineProperty(a, 'age', {
  value: 18
})

// console.log(Object.getOwnPropertyDescriptors(a));

// enumerable: true
// Object.keys, values, entries //自身可遍历属性
// for in //自身和继承的可遍历属性（不含symbol）
// 
// Object.getOwnPropertyNames() //自身的所有属性名（不含symbol）
// obj.hasOwnProperty // 遍历自身所有的属性（不含symbol）
// console.log(Object.getOwnPropertyNames(a));
