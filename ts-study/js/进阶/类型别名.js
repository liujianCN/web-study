"use strict";
var add1 = function (a) {
    if (typeof a === 'string') {
        return a;
    }
    else {
        return a();
    }
};
var add = function (x) { return x ? x + x : ''; };
