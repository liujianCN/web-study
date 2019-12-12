"use strict";
/*******************************   boolean 布尔类型   *******************************/
var isDone = false;
isDone = true;
/**
 *  isDone = 1 type 1 不能转给loolean
 *  注意，使用构造函数 Boolean 创造的对象不是布尔值：
*/
/**
 * let newBoolean: boolean = new Boolean()
 * type Boolean是对象类型，而type boolean是原始类型，
 *
 */
var newBoolean = new Boolean(1);
/*******************************   number 数值类型   *******************************/
var nb = 5;
nb = 4;
nb = 10; //二进制 它们会被编译为十进制数字。
nb = 520; //八进制
/*******************************   string 字符串   *******************************/
var str = 'ddd';
str = "aaa " + nb;
/*******************************   void 空值   *******************************/
function helloWorld() {
    console.log('hello world');
}
var voidValue;
voidValue = undefined;
/**
 * voidValue = null; // 严格模式下不能把null付给void类型；
 */
/*******************************   undefined null  *******************************/
var nul = null;
var uf = undefined;
/**
 * 严格模式下，null类型只能赋值null，undefined 只能赋值undefined
 * 下面会报错
 * uf = null;
 * nul = undefined;
 */
