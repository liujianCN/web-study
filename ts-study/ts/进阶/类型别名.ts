/* ******************************* */
/**
 * 给一个类型起别名；常用于联合类型；
 */
type Name = string;
type NameResolve = (x?: string) => string;
type NameOrResolve = Name | NameResolve;

let add1 = function(a: NameOrResolve): Name{
  if( typeof a === 'string' ) {
    return a
  }else{
    return a()
  }
}

let add: NameResolve = x => x ? x + x : ''