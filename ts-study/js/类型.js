"use strict";
// 1, 字符串
// let yi: string = 1    Type '1' is not assignable to type 'string'.ts(2322)
var yi = '1';
// 2, number
// const er: number = '4'   Type '"4"' is not assignable to type 'number'.ts(2322)
var er = 2;
var liu = 6;
var qi = 8;
// 3, boolean
var san = true;
san = undefined;
// 4, null
var si = undefined;
si = null;
// 5, undefined
var wu = null;
wu = undefined;
// 6, 数组
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var wangwu1 = ['1', '2'];
var zhaoliu1 = [false];
var zhaoqi = [1, 2, 'sss'];
// 7,元组Tuple
var tuple1;
tuple1 = [4, '9'];
tuple1 = ['false', 's'];
// 8, 空 void
function say(name) {
    console.log('hi' + name);
}
// 9, any
var foo;
foo = 0;
foo.name;
