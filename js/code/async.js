(function() {
  function time(ms) {
    return new Promise(r => setTimeout(r, ms * 1000, ms));
  }
  async function a() {
    console.log('a 开始');
    let a = await time(0);
    console.log(a);
    console.log('a 结束');
  }
  async function b() {
    console.log('b 开始');
    await a();
    let b = await time(2);
    console.log(b);
    console.log('b 结束');
  }
  console.log('script 开始');
  b();
  new Promise(r => {
    console.log('promise1');
    r();
  }).then(console.log('promise2'));

  console.log('script 结束');
});
(function() {
  async function timeout(ms) {
    await new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
  }

  asyncPrint('hello world', 50);
});

// 被 async 操作符修饰的函数必然返回一个 Promise
// 当 async 函数返回一个值时，Promise 的 resolve 方法负责传递这个值
// 当 async 函数抛出异常时，Promise 的 reject 方法会传递这个异常值

(function() {
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }

  async function async2() {
    console.log('async2');
  }

  async1();

  new Promise(resolve => {
    console.log(1);
    resolve();
  })
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(4);
    });
});
// 在老的async awiat规范里，等同于下面

(function() {
  function async1() {
    console.log('async1 start');
    return new Promise(resolve => resolve(async2())).then(() => {
      console.log('async1 end');
    });
  }

  function async2() {
    console.log('async2');
    return Promise.resolve();
  }

  async1();

  new Promise(resolve => {
    console.log(1);
    resolve();
  })
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(4);
    });
});

// 如果resolve是一个thenable对象会转换为先Promise
(function() {
  function async1() {
    console.log('async1 start');
    let p = async2();
    return new Promise(resolve => {
      Promise.resolve().then(() => {
        p.then(resolve);
      });
    }).then(() => console.log('async1 end'));
  }

  function async2() {
    console.log('async2');
    return Promise.resolve();
  }

  async1();

  new Promise(resolve => {
    console.log(1);
    resolve();
  })
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(4);
    });
});

// 新的 async awit规范中 await v 将等于Promise.resolve(v)
(function() {
  function async1() {
    console.log('async1 start');
    let p = async2();
    return Promise.resolve(p).then(() => console.log('async1 end'));
  }

  function async2() {
    console.log('async2');
    return Promise.resolve();
  }

  async1();

  new Promise(resolve => {
    console.log(1);
    resolve();
  })
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(4);
    });
});
(function() {
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }

  async function async2() {
    console.log('async2');
  }

  async1();

  new Promise(resolve => {
    console.log(1);
    resolve();
  })
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(3);
    });
});

(() => {
  function async1() {
    return Promise.resolve()
      .then(function() {
        console.log('async1 start');
        return async2();
      })
      .then(function() {
        console.log('async1 end');
      });
  }

  function async2() {
    return Promise.resolve().then(function() {
      console.log('async2');
    });
  }

  async1();
  new Promise(function(resolve) {
    console.log(1);
    resolve();
  })
    .then(function() {
      console.log(2);
    })
    .then(function() {
      console.log(3);
    });
})();
