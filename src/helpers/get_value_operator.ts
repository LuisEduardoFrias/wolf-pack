/**/
export function getValueOperator<T>(array: T[], operator: string): T[] {
  const operatorTrim = operator.replace(/\s/g, '');
  const isNum = /^-?\d+$/.test(operatorTrim);
  if (isNum) {
    const numOperator = parseInt(operatorTrim);
    if (numOperator >= 0) {
      return array.slice(0, numOperator);
    } else {
      return array.slice(array.length - Math.abs(numOperator), array.length);
    }
  } else {
    if (operatorTrim.includes('+')) {
      const [firstValue, secondValue] = operatorTrim.split('+').map(Number);
      if (firstValue >= 0 && secondValue >= 0) {
        return [...array.slice(0, firstValue),
        ...array.slice(array.length - secondValue)];
      }
    } else if (operatorTrim.includes('-')) {
      const [firstValue, secondValue] = (operatorTrim + "-0").split('-').map(Number);
      return array.slice(firstValue, array.length - secondValue);
    }
  }
  return [];
}


const arrays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const op1 = "12";
const op2 = "-12";
const op3 = "9+7";
const op4 = "7-5";

console.log(op1, " ---: ", getValueOperator(arrays, op1));
console.log(op2, " ---: ", getValueOperator(arrays, op2));
console.log(op3, " ---: ", getValueOperator(arrays, op3));
console.log(op4, " ---: ", getValueOperator(arrays, op4));
