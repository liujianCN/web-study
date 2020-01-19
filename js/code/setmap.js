var set = new Set(['red', 'yellow', 'green'])

// Set的默认遍历器生成函数就是它的values方法。
// Set.prototype[Symbol.iterator] === Set.prototype.values
//遍历器接口 Symbol(Symbol.iterator): ƒ entries()
// 可以直接
for (const item of set) {
  console.log(item);
}

//由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

//属性
set.size
//方法
set.add('blue')
set.delete('green')
set.has('yellow')
// set.clear()

set.keys()
set.values()
set.entries()


// map 提供了值-值的对应
var map = new Map()
var o = {a: 12}

map.set(o, 13)
map.set('haha', o)
map.has(o)
map.get(o)
// map.delete(o)
// map.clear(o)
map.size

//默认遍历器接口 Symbol(Symbol.iterator): ƒ entries()

//map.keys(), map.values(), map.entries() //都返回一个遍历器对象，可以使用 for of 遍历

for (const [key, value] of map.entries()) {
  console.log(key, value);
}

//等同于 

for (const [key, value] of map) {
  console.log(key, value);
}

[...map] // 会转换为二维数组[[{a: 12}, 13],['haha', {a}]]












//Map 的遍历顺序就是插入顺序。