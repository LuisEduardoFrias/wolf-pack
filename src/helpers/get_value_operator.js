var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**/
function getValueOperator(array, operator) {
    var operatorTrim = operator.replace(/\s/g, '');
    var isNum = /^-?\d+$/.test(operatorTrim);
    if (isNum) {
        var numOperator = parseInt(operatorTrim);
        if (numOperator >= 0) {
            return array.slice(0, numOperator);
        }
        else {
            return array.slice(array.length - Math.abs(numOperator), array.length);
        }
    }
    else {
        if (operatorTrim.includes('+')) {
            var _a = operatorTrim.split('+').map(Number), firstValue = _a[0], secondValue = _a[1];
            if (firstValue >= 0 && secondValue >= 0) {
                return __spreadArray(__spreadArray([], array.slice(0, firstValue), true), array.slice(array.length - secondValue), true);
            }
        }
        else if (operatorTrim.includes('-')) {
            var _b = (operatorTrim + "-0").split('-').map(Number), firstValue = _b[0], secondValue = _b[1];
            return array.slice(firstValue, array.length - secondValue);
        }
    }
    return [];
}
var arrays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var op1 = "12";
var op2 = "-6";
var op3 = "9+7";
var op4 = "7-5";
console.log(op1, " ---: ", getValueOperator(arrays, op1));
console.log(op2, " ---: ", getValueOperator(arrays, op2));
console.log(op3, " ---: ", getValueOperator(arrays, op3));
console.log(op4, " ---: ", getValueOperator(arrays, op4));
