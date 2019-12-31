/*
 * 高级类型2： this类型， 索引类型， 映射类型， 条件类型
 */

/* ********************************* this类型 ************************************* */

class Counter {
  constructor(public c: number = 2){

  }
  add(v: number){
    this.c += v
    return this
  }
  sub(v: number){
    this.c -= v
    return this
  }
}

class Num extends Counter {
  pow(v: number){
    this.c *= v
    return this
  }
}

const c1 = new Num().pow(3).add(5).sub(1)
console.log(c1)


/* ********************************* 索引类型 ************************************* */
/* 
 * 索引类型查询操作符 keyof ，返回所查询类型的所有属性名组成的联合类型
 */
interface Props {
  name: string
  age: number
}

let KeyofProps : keyof Props = 'age'

const getValue = <T, K extends keyof T>(obj: T, names: K[] ): T[K][] => {
  return names.map( v => obj[v])
}

var obj3: Props = {
  name: 'lisa',
  age: 18
}
var vv: (string| number)[] = getValue(obj3, ['age', 'name'])

/* [] 操作符 */

type Ip = Props['name'] // type Ip = string

function getValue1<T, K extends keyof T>(obj: T, n: K): T[K] {
  return obj[n]
}
const vvv = getValue1(obj3, 'age')


interface Type {
  a: never
  b: never
  c: number
  d: string
  e: null
  f: undefined
  g: boolean
  h: object
}
type T = Type[keyof Type]

const t: T = null


/* ********************************* 映射类型 ************************************* */

type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P]
  // [P in keyof T]?: T[P] // 或者变为可选属性
}

type ReadonlyTypeT = ReadonlyType<Type>

type sss = Pick<Type, 'g' | 'h'>





/* ********************************* 条件类型 ************************************* */
/* T extends U ? X : Y */

type IFType<T> = T extends string | number ? string : object

type IF1 = IFType<false>
type IF2 = IFType<12>


type petsGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name:string,
    age:number,
}

type IPets = Record<petsGroup, IPetInfo>;


interface UserI {
  id: number;
  age: number;
  name: string;
};

type OmitUser = Omit<UserI, "id">
type PickUser = Pick<UserI, "id">
type ExUser = Exclude<"a"|"b"|"c"|"d", "b"|"c">