// 1, 字符串
// let yi: string = 1    Type '1' is not assignable to type 'string'.ts(2322)
let yi: string = '1';

// 2, number
// const er: number = '4'   Type '"4"' is not assignable to type 'number'.ts(2322)
const er: number = 2;
const liu: number = 0b110;
const qi: number = 0o10;



// 3, boolean
let san: boolean = true;
san = undefined;

// 4, null
let si: null = undefined
si = null;

// 5, undefined
let wu: undefined = null
wu = undefined;

// 6, 数组
const list1: number[] = [1, 2, 3];
const list2: Array<number> = [1, 2, 3];

const wangwu1: string[] = ['1', '2']
const zhaoliu1: boolean[] = [false]

const zhaoqi: (number | string)[] = [1, 2, 'sss']

// 7,元组Tuple
let tuple1: [(number | string), string]
tuple1 = [4,'9'];
tuple1 = ['false','s']

// 8, 空 void
function say (name: string): void {
  console.log('hi'+ name)
}
// 9, any

let foo: any;
foo = 0
foo.name
