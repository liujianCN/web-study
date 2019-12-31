"use strict";
/*
 * 高级类型2： this类型， 索引类型， 映射类型， 条件类型
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* ********************************* this类型 ************************************* */
var Counter = /** @class */ (function () {
    function Counter(c) {
        if (c === void 0) { c = 2; }
        this.c = c;
    }
    Counter.prototype.add = function (v) {
        this.c += v;
        return this;
    };
    Counter.prototype.sub = function (v) {
        this.c -= v;
        return this;
    };
    return Counter;
}());
var Num = /** @class */ (function (_super) {
    __extends(Num, _super);
    function Num() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Num.prototype.pow = function (v) {
        this.c *= v;
        return this;
    };
    return Num;
}(Counter));
var c1 = new Num().pow(3).add(5).sub(1);
console.log(c1);
var KeyofProps = 'age';
var getValue = function (obj, names) {
    return names.map(function (v) { return obj[v]; });
};
var obj3 = {
    name: 'lisa',
    age: 18
};
var vv = getValue(obj3, ['age', 'name']);
function getValue1(obj, n) {
    return obj[n];
}
var vvv = getValue1(obj3, 'age');
var t = null;
;
