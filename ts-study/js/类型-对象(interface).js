"use strict";
var tom = {
    name: 'tom',
    age: 18
};
// -少变量会报错
// tom = {
//   name: 'tom'
// }
// -多变量会报错
tom = {
    name: 'tom',
    age: 18,
};
var sun = {
    name: 'sun',
    age: 15
};
/**
 * 如果设置了任意属性，那么所有的确认属性和可选属性的类型都将是任意属性类型的子集；
 *
 */
var moira = {
    name: 'moira',
    age: 18,
    gender: 'string'
};
var dog = {
    id: 123456
};
//  dog.id = '' //不能在对象赋值后再给，readonly属性的值在重新赋值
