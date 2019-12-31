"use strict";
/* ********************************* 交叉类型 & *********************************** */
/**
 * A & B & C    拥有A, B, C的所有成员的类型
 */
var mergeObj = function (obj1, obj2) {
    return Object.assign(obj1, obj2);
};
/*
 * assign 默认 返回 T & B
 */
var obj1 = { a: 1 };
var obj2 = { b: 1, c: 3 };
var objInfo = mergeObj(obj1, obj2);
console.log(objInfo);
// console.log(mergeObj())
/* ********************************* 联合类型 | *********************************** */
/**
 * A | B | C    类型为A或者B或者C
 */
function unite(v) {
    if (typeof v === 'string') {
        return v.length;
    }
    else {
        return v;
    }
}
unite(3);
unite('abcd');
