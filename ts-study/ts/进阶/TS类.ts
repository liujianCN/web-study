/*
 * 基础，修饰符，参数属性，静态属性，可选类属性，存取器，抽象类，实例类型。
 */

/* ********************************* 基础 *********************************** */
class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

const p1 = new Point(1, 6)
console.log(p1)

class XP extends Point {
  constructor(x: number, y:number) {
    super(x, y)
  }
}

const xp = new XP(1, 2)
console.log(xp)








/* ********************************* 修饰符 *********************************** */
/* 
 * public 默认
 * private 私有的
 * protected 受保护的
*/

class Students {
  private sex: string
  constructor(sex: string) {
    this.sex = sex
  }

  say() {
    return this.sex
  }
}
const s1 = new Students('M')
var s2 = s1.say()
console.log(s2)
/*
 * 不允许在实例上访问，不允许继承
 */




class Parent {
  protected sex: string
  protected constructor(sex: string) {
    this.sex = sex
  }

  say() {
    return this.sex
  }
}

// var p4 = new Parent()
/*
 * 不允许在实例上访问，允许继承
 */



class UserInfo {
  readonly name: string
  constructor(name:string){
    this.name = name
  }
}
const merit = new UserInfo('merit')

// merit.name = '' // 不能赋值，因为name是只读属性



/* ********************************* 参数属性 *********************************** */

/**
 * 使用 public private protected re
 */

class AA {
  constructor( public name: string){

  }
}
console.log(new AA('aa'))

class BB{
  constructor(private name: string){}
}
console.log(new BB('bb'))
class CC{
  constructor(protected name: string){}
}
console.log(new CC('cc'))
class DD{
  constructor(readonly name: string){}
}
console.log(new DD('dd').name)




/* ********************************* 静态属性 *********************************** */
class StaticClass {
  static age = 18
  private static sex = 'M' //静态私有属性
  static getAge(){
    return this.age
  }
}

var s3 = StaticClass.getAge()
console.log(s3)






/* ********************************* 可选类属性 *********************************** */

class OptPara {
  name: string
  age?: number
  constructor(name: string, age?: number, public sex?: string){
    this.name = name;
    this.age = age;
  }
}
console.log(new OptPara('o1'))
console.log(new OptPara('o2', 18))
console.log(new OptPara('o3', 18, 'M'))




/* ********************************* 存取器 *********************************** */

class Setter {
  private _v: string | undefined;
  get infoV() {
    return this._v
  }
  set infoV(v) {
    this._v = v
  }
}
var setP = new Setter()
console.log(setP.infoV = 'sss', setP.infoV)





/* ********************************* 抽象类 *********************************** */
/* abstract */










/* ********************************* 实例类型 *********************************** */

/* implements 实施接口 */
interface Implement {
  type?: string
}

class User implements Implement {
  public type?: string
  // private type?: string
  public name?: string
}
/*
 * 实例是否implements 接口，public type 可以
 * private type 不行，实例没有实施 Implement
 */




/* ********************************* 泛型 *********************************** */