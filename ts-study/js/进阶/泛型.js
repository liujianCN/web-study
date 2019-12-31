"use strict";
/* ************************************************* */
/* any可以使函数的可复用性，但也丢失了一些信息，传入值和返回值。 */
var getArray1 = function (v, t) {
    if (t === void 0) { t = 5; }
    return new Array(t).fill(v);
};
console.log(getArray1(9, 2).map(function (item) { return item.length; }));
//[undefined, undefined]
/*
 * 可以只用泛型定义，进行约束。不丢失输入，输出的类型。
 */
var getArray2 = function (v, t) {
    return new Array(t).fill(v);
};
var g2result1 = getArray2(3, 2).map(function (item) { return item.toFixed(2); });
var g2result2 = getArray2('adc', 2).map(function (item) { return item.length; });
console.log(g2result1);
console.log(g2result2);
var getArray3 = function (p1, p2, t) {
    return new Array(t).fill([p1, p2]);
};
var g3result1 = getArray3(2, '3', 3);
console.log(g3result1);
//定义类型，然后赋值
// let getArray4: <T>(v: T, t: number) => T[];
/* new Array() 的返回值类型为any[] */
var getArray4 = function (v, n) { return new Array(n).fill(v); };
console.log(getArray4(3, 2)[0].length); // undefined
var getArray5 = function (v, t) { return new Array(t).fill(v); };
// const rs5 = getArray5(123,4) //123 number不具有length属性，不能传
var rs5 = getArray5('123', 4); // 或者[], 具有length属性的值
/**
 * keyof 关键字,
 */
var getProps = function (obj, propName) {
    return obj[propName];
};
var obj = {
    a: 'a',
    b: 'b'
};
getProps(obj, 'a'); // 在编译阶段可以知道传入的propName只能是a,或者b
