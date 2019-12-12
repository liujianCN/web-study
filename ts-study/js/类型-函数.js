"use strict";
/********************************  函数声明  ****************************** */
function sum(x, y) {
    return x + y;
}
sum(1, 2);
// sum(3,4,5); sum(1) 参数多一个少一个都不行
/********************************   函数表达式  ****************************** */
var subtract1 = function (x, y) {
    return x - y;
};
subtract1(1, 3);
//或者
var minus2 = function (x, y) { return x - y; };
minus2(1, 3);
/**
 * 等号左边变量minus没有进行类型定义，是通过左侧的匿名函数的类型的定义进行的类型推论
 */
var subtract2 = function (x, y) { return x + y; };
subtract2(1, 2);
/********************************   可选参数 ？  ****************************** */
var sum1 = function (x, y, z) { return z ? x + y + z : x + y; };
console.log(sum1(1, 3));
console.log(sum1(1, 3, 8));
/**
 * 可选参数必须跟在必需参数后面，可选参数后面不允许在有必需参数
 */
// let sum2 = (x: number, y: number, z?: number, q: number): number => z ? x + y + z : x + y ;
/********************************   参数默认值  ****************************** */
var sum2 = function (x, y, z, q) {
    if (x === void 0) { x = 5; }
    if (q === void 0) { q = 10; }
    return x + y + z + q;
};
console.log(sum2(undefined, 2, 3));
console.log(sum2(1, 2, 3));
console.log(sum2(1, 2, 3, 5));
/**
 * ts会将默认参数的参数识别为可选参数， 但不受【可选参数必须在最后】的限制;
 */
/********************************   剩余参数 ...  ****************************** */
var sum3 = function (x) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    x.push.apply(x, args);
    return x;
};
console.log(sum3([], 1, 2, 3));
/********************************   this  ****************************** */
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    },
    say: function () {
        console.log(this.suits);
    }
};
// let cardPicker = deck.createCardPicker;
// let pickedCard = cardPicker();
// let cccc = pickedCard()
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
console.log(pickedCard);
