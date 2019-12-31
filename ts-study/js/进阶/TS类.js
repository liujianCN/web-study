"use strict";
/*
 * 基础，修饰符，参数属性，静态属性，可选类属性，存取器，抽象类，实例类型。
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
/* ********************************* 基础 *********************************** */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var p1 = new Point(1, 6);
console.log(p1);
var XP = /** @class */ (function (_super) {
    __extends(XP, _super);
    function XP(x, y) {
        return _super.call(this, x, y) || this;
    }
    return XP;
}(Point));
var xp = new XP(1, 2);
console.log(xp);
/* ********************************* 修饰符 *********************************** */
/*
 * public 默认
 * private 私有的
 * protected 受保护的
*/
var Students = /** @class */ (function () {
    function Students(sex) {
        this.sex = sex;
    }
    Students.prototype.say = function () {
        return this.sex;
    };
    return Students;
}());
var s1 = new Students('M');
var s2 = s1.say();
console.log(s2);
/*
 * 不允许在实例上访问，不允许继承
 */
var Parent = /** @class */ (function () {
    function Parent(sex) {
        this.sex = sex;
    }
    Parent.prototype.say = function () {
        return this.sex;
    };
    return Parent;
}());
// var p4 = new Parent()
/*
 * 不允许在实例上访问，允许继承
 */
var UserInfo = /** @class */ (function () {
    function UserInfo(name) {
        this.name = name;
    }
    return UserInfo;
}());
var merit = new UserInfo('merit');
// merit.name = '' // 不能赋值，因为name是只读属性
/* ********************************* 参数属性 *********************************** */
/**
 * 使用 public private protected re
 */
var AA = /** @class */ (function () {
    function AA(name) {
        this.name = name;
    }
    return AA;
}());
console.log(new AA('aa'));
var BB = /** @class */ (function () {
    function BB(name) {
        this.name = name;
    }
    return BB;
}());
console.log(new BB('bb'));
var CC = /** @class */ (function () {
    function CC(name) {
        this.name = name;
    }
    return CC;
}());
console.log(new CC('cc'));
var DD = /** @class */ (function () {
    function DD(name) {
        this.name = name;
    }
    return DD;
}());
console.log(new DD('dd').name);
/* ********************************* 静态属性 *********************************** */
var StaticClass = /** @class */ (function () {
    function StaticClass() {
    }
    StaticClass.getAge = function () {
        return this.age;
    };
    StaticClass.age = 18;
    StaticClass.sex = 'M'; //静态私有属性
    return StaticClass;
}());
var s3 = StaticClass.getAge();
console.log(s3);
/* ********************************* 可选类属性 *********************************** */
var OptPara = /** @class */ (function () {
    function OptPara(name, age, sex) {
        this.sex = sex;
        this.name = name;
        this.age = age;
    }
    return OptPara;
}());
console.log(new OptPara('o1'));
console.log(new OptPara('o2', 18));
console.log(new OptPara('o3', 18, 'M'));
/* ********************************* 存取器 *********************************** */
var Setter = /** @class */ (function () {
    function Setter() {
    }
    Object.defineProperty(Setter.prototype, "infoV", {
        get: function () {
            return this._v;
        },
        set: function (v) {
            this._v = v;
        },
        enumerable: true,
        configurable: true
    });
    return Setter;
}());
var setP = new Setter();
console.log(setP.infoV = 'sss', setP.infoV);
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
/*
 * 实例是否implements 接口，public type 可以
 * private type 不行，实例没有实施 Implement
 */
/* ********************************* 泛型 *********************************** */ 
