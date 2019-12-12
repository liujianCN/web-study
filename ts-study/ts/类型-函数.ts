/********************************  函数声明  ****************************** */

function sum(x: number, y: number): number {
  return x + y
}
sum(1, 2)
// sum(3,4,5); sum(1) 参数多一个少一个都不行




/********************************   函数表达式  ****************************** */

let subtract1 = function (x: number, y: number): number {
  return x - y
}
subtract1(1, 3)
//或者
let minus2 = (x: number, y: number): number => x - y;
minus2(1, 3)

/**
 * 等号左边变量minus没有进行类型定义，是通过左侧的匿名函数的类型的定义进行的类型推论
 */

let subtract2: (x: number, y: number) => number = (x, y) => x + y;

subtract2(1, 2)





/********************************   可选参数 ？  ****************************** */

let sum1 = (x: number, y: number, z?: number): number => z ? x + y + z : x + y;
console.log(sum1(1, 3))
console.log(sum1(1, 3, 8))

/**
 * 可选参数必须跟在必需参数后面，可选参数后面不允许在有必需参数
 */
// let sum2 = (x: number, y: number, z?: number, q: number): number => z ? x + y + z : x + y ;





/********************************   参数默认值  ****************************** */

let sum2 = (x: number = 5, y: number, z: number, q: number = 10): number => x + y + z + q;

console.log(sum2(undefined, 2, 3))
console.log(sum2(1, 2, 3))
console.log(sum2(1, 2, 3, 5))

/**
 * ts会将默认参数的参数识别为可选参数， 但不受【可选参数必须在最后】的限制;
 */






/********************************   剩余参数 ...  ****************************** */

let sum3 = (x: number[], ...args: number[]): number[] => {
  x.push(...args)
  return x
}

console.log(sum3([], 1, 2, 3))




/********************************   重载  ****************************** */








/********************************   接口定义函数的形状  ****************************** */

interface multiple {

}








/********************************   this  ****************************** */

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    }
  },
  say() {
    console.log(this.suits)
  }
}

// let cardPicker = deck.createCardPicker;
// let pickedCard = cardPicker();
// let cccc = pickedCard()

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log(pickedCard)