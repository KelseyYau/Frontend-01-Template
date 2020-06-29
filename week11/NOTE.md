# 异步编程
## 回调函数
在演示红绿灯的代码，异步编程最古老的方式是使用的setTimeout回调函数的方式去实现，实现起来也是最为简单，最好实现。但是使用回调函数的缺点，也是非常的明显。
使用回调函数有如下缺点:
* callback hell 回调地狱，各个部分高度耦合，代码结构会很混乱，流程追踪困难。
* 每一个任务只能指定一个回调函数，
* 不能使用try catch捕获错误，不能直接return

## 观察者（发布/订阅）模式
在此模式中，一个被称作被观察者的对象，维护一组被称为观察者的对象，这些对象依赖于被观察者，被观察者自动将自身的状态的任何变化通知给它们。
在js中，使用此模式的几个代表性的库有：
* jQuery.subscribe()、jQuery.publish()、jQuery.unsubscribe()
* rxjs库，rxjs中的observable可观察对象、observer观察者，subject主题
* vue事件总线

## Promise
Promise本意是承诺，在程序中的意思就是承诺我过一段时间后会给你一个结果。 什么时候会用到过一段时间？答案是异步操作，异步是指可能比较长时间才有结果的才做，例如网络请求、读取本地文件等。目前使用最常用的的异步编程方式。
### promise的三种状态
* Pending Promise对象实例创建时候的初始状态
* Fullfilled 成功的状态
* Rejected 失败的状态

承诺一旦从等待状态变成其他状态就永远不能改变状态。

```js
let p = new Promise((resolve, reject) => {
  axios.get('add/ddd', data).then(res => {
    resolve(res)
  }).catch(err => {
    reject(err)
  })
})

p.then(res => {

})
```

```js
在构造promsie对象的时候，构造函数内部的代码是立即执行的
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('end')
// new Promise => end
```

### promise的链式调用
在红绿灯的demo里，每次的调用wait函数，总会返回一个新的promise实例，所以可实现链式调用。链式调用有以下特点：
* 在then中返回一个结果，会把这个结果传递到下一次的then的成功回调
* 在then中出现异常，会走下一个then的失败回调
* 在then中使用return，return的值会被promise.resolve包装
* catch会捕获到没有捕获的异常

### promise的缺点
无法取消promise

## Generators/yield
语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
Generator 函数除了状态机，还是一个遍历器对象生成函数。
可暂停函数, yield可暂停，next方法可启动，每次返回的是yield后的表达式结果。
yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

```js
function *foo(x) {
  let y = 2 * (yield(x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}

let iterator = foo(5)
iterator.next()  // {value: 6, done: false}
iterator.next(12) // {value: 8, done: false}
iterator.next(13) // {value: 42, done: true}

// generator函数会返回一个迭代器
// 第一次执行next() 传参会被忽略，并暂停在yield(x + 1)之中，返回5 + 1 = 6
// 第二次next()，如果不穿参，yield会返回undefined。此时传参12，则 let y = 2 * 12,第二个yield等于 2 * 12 / 3 = 8,
// 第三次执行next()， 传入的13会当成上一次的返回值，z = 13，最终的结构为 24 + 13 + 5
```

## async/await
async/await是目前异步的最新解决方案。使用async/await使得原本使用promise.then的方式看起来更像是一个同步的代码，但是却与promise一样是非阻塞。

在一个函数前面加上async，该函数会返回一个promise对象
```js
async function async1() {
  return "1"
}
console.log(async1()) // -> Promise {<resolved>: "1"}

```

