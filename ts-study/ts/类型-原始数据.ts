/*******************************   boolean 布尔类型   *******************************/

let isDone: boolean = false;

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
let newBoolean: Boolean = new Boolean(1);




/*******************************   number 数值类型   *******************************/

let nb: number = 5;
nb = 4;
nb = 0b1010//二进制 它们会被编译为十进制数字。
nb = 0o1010//八进制





/*******************************   string 字符串   *******************************/

let str: string = 'ddd'

str = `aaa ${nb}`





/*******************************   void 空值   *******************************/

function helloWorld(): void{
  console.log('hello world')
}

let voidValue: void ;

voidValue = undefined;
/**
 * voidValue = null; // 严格模式下不能把null付给void类型；
 */





/*******************************   undefined null  *******************************/

let nul: null = null;

let uf: undefined = undefined;
/**
 * 严格模式下，null类型只能赋值null，undefined 只能赋值undefined
 * 下面会报错
 * uf = null; 
 * nul = undefined;
 */
