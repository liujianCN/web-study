// // const p1 = new Promise(function (resolve, reject) {
// //   setTimeout(resolve, 2000, 'haha')
// // });

// // const p2 = new Promise(function (resolve, reject) {
// //   setTimeout(() => resolve(p1), 1000)
// // })

// function getPromise(ms, name) {
//   // console.log(name);
//   return new Promise(r => {
//     setTimeout(r, ms, name)
//   })
// }
// getPromise(6000, 'green').then(r => {
//   console.log(r+ 'res');
//   return getPromise(1000, 'red')
// }).then(r => {
//   console.log(r+ 'res');
//   return getPromise(2000, 'yellow')
// }).then(r => console.log(r)).catch(err => console.log(err))

// var p1 = getPromise(1000, 1)
// // var p2 = getPromise(2000, 2)
// // var p3 = getPromise(4000, 3)

// // Promise.all([p1,p2,p3]).then(r => console.log(r))
// p1.then(r => {
//   console.log(r+ 'rej');//1
//   return getPromise(2000, 2)
// } ).then(r => {
//   console.log(r+ 'rej');//2
//   return getPromise(4000, 3)
// } ).then(r => console.log(r))



/**********************不同的执行顺序 */
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
    
async function async2() {
    console.log('async2')
}
    
async1();
    
new Promise((resolve) => {
    console.log(1)
    resolve()
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(4)
})