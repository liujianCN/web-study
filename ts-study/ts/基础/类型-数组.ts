/*********************************  类型 + [] *********************************/

let numArray: number[];
numArray = [1, 2, 2, 2]
// numArray=[1,'3'] //数组中不允许出现除number外的其他类型的值
// numArray.push('k') // 也会报错，只能push number类型的值





/*********************************  数组泛型  *********************************/

let genericArray: Array<number>;

genericArray = [1, 2, 3, 4]
// genericArray = ['']



/*********************************  接口表示  *********************************/

interface NumArray {
  [index: number]: number
}
/**
 * NumArray 表示索引是数字，值也是数字 的数组
 * 不过通常不这么做，因为麻烦
 * 在类数组中我们这么定义接口
 */
let ifArray: NumArray = [1, 2, 3]


/*********************************  常用表示  *********************************/

let anyArray: any[] = [1, '3', { a: 1 }];


/*********************************  测试  *********************************/

type objArray = {label: string, code: number}[]

let objArr: objArray = [{label: 'woshi', code: 9}, {label: 'woshi', code: 9}]

objArr.map(item => item.label)