"use strict";
var infer1 = [1, '3'];
infer1 = ['3', 1, 2, 3];
infer1 = ['3'];
var infer2;
/* infer2 = {
  name: 'lisa',
  age: 18
} */
// 直接赋值，值必须和接口的形状一样
var infer3 = {
    name: 'lisa',
    age: 18
};
var infer4 = {
    age: 18
};
infer2 = infer3;
// infer2 = infer4 //name is missing infer4的形状不符合infer2的形状。
// 可以将infer3赋值给infer2, 只要infer3有infer2的形状(递归检测)。
/* ******************************* 参数个数 ******************************* */
var func1 = function (x) { return x; };
var func2 = function (x, y) { return x + y; };
// func1 = func2 //fun2的参数个数大于fun1， 不能赋值给参数较少的函数。
func2 = func1;
console.log(func2(2, 3));
var arr1 = [1, 2, 3];
/* 例如数组的回调函数，接受个参数，只能接受少于3个参数的回调函数，不能多于3个 */
// arr1.forEach((item, index, arr1, d) => item)
/* ******************************* 参数类型 ******************************* */
var func3 = function (x) { return x; };
var func4 = function (x, y) { return x + y; };
// func4 = func3 //不能，参数的类型不兼容
var getSum = function (arr, cb) {
    return cb(arr);
};
var sumArr = [1, 2, 3];
var sum5 = getSum(sumArr, function (arr) { return arr.reduce(function (a, b) {
    console.log(a, b);
    return a + b;
}, 0); });
console.log(sum5);
/* ******************************* 函数参数的双向协变 ******************************* */
var funcA = function (x) { };
var funcB = function (x) { };
var funcC = function (x) { };
// funcA = funcB
funcB = funcA;
funcC = funcA;
/* ******************************* 返回值类型兼容 ******************************* */
var funcD = function (x) { return x; };
var funcE = function (x) { return x; };
// funcE = funcD
funcD = funcE;
/* ******************************* 枚举的兼容 ******************************* */
var Status;
(function (Status) {
    Status[Status["On"] = 0] = "On";
    Status[Status["Off"] = 1] = "Off";
})(Status || (Status = {}));
var Animal;
(function (Animal) {
    Animal[Animal["Dog"] = 0] = "Dog";
    Animal[Animal["Cat"] = 1] = "Cat";
})(Animal || (Animal = {}));
var sO = Status.On;
sO = 4;
var data1 = { data: '1' };
var data2 = { data: 1 };
/*
 * let data1: DataInfo<string>
 * let data2: DataInfo<number>
 *
 * 严格模式下，不能在赋值前使用 data2 = data1
 */
// data1 = data2 // DataInfo<number> 不兼容 DataInfo<string>
