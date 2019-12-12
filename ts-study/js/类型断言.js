"use strict";
/*********************************  类型断言  **************************/
/**
 * 类型断言，可以手动指定一个值的类型
 *
 * 语法：
 * <类型>值
 *
 * 或
 *
 * 值 as 类型
 *
 * 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。
 */
/**
 * 可以使用类型断言解决只能使用联合类型的共有属性的问题
 *
 */
var assertion = function (x) {
    if (x.length) {
        return x.length;
    }
    else {
        return x;
    }
};
console.log(assertion('sb'));
console.log(assertion(5654));
// 或者 (<string>x).length
// let assertion1 = (x: string | number): number => {
//   if((x as boolean).length) 
// }
/**
 * 报错，不能断言联合类型以外的类型
 */
