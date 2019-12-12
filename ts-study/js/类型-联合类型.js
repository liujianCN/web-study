"use strict";
var union; // 意味着，union 为string 或者 number 类型
union = 'sad';
union = 2323;
//union = true //报错
/**
 * 当不能确定一个联合类型的方法时，只能访问联合类型的共有属性和方法
 */
function getSome(something) {
    // return something.length  number没有length属性会报错
    return something.toString(); //可以使用共有方法toString
}
