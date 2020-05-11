
## 事件循环(Event Loop)
在浏览器中，js的执行都是基于**事件循环**，事件循环简单来说，就是一个在js引擎中，等待任务，执行任务和进入休眠状态等待更多任务这些个状态之间的无限循环

具体的流程如下：
* 选择最先进入任务队列的宏任务，一般是script的整体代码，如果有就执行
* 检查是否存在微任务，如果存在微任务，就先执行微任务，微任务中先执行同步任务，后执行异步任务，直到清空了微任务队列中的任务
* 更新渲染
* 重复上述步骤，继续循环

## 宏任务和微任务

### 宏任务
由宿主环境分配的任务，为宏任务。

常见的宿主环境有浏览器、node

浏览器环境能够触发宏任务操作:

* I/O操作
* setTimeout
* setInterval
* 浏览器事件
* ...

node环境能够触发宏任务的操作:
* I/O操作
* setTimeout
* setInterval
* setImmediate
* ...

宏任务队列

多个宏任务结合在一起，可以认为是一个宏任务队列，同时队列中的任务执行“**先进先出**”原则

### 微任务
由js引擎发起的任务称之为**微任务**。微任务仅来自于我们的代码。它们通常是由 promise 创建：对 .then/catch/finally 处理程序的执行会成为微任务。微任务也被用于 await 的“幕后”，因为它是 promise 处理的另一种形式。

还有一个特殊的函数 queueMicrotask(func)，它对 func 进行排队，以在微任务队列中执行

#### 微任务队列的特点
1. 每个宏任务中有且只有一个微任务队列
2. 微任务队列也是执行“先进先出”的原则

## 函数调用

```js
import { foo } from "foo.js"
var i = 0
console.log(i)
foo()
console.log(i)
i++


import { foo2 } from "foo.js"
var x = 1
function foo() {
  console.log(x)
  foo2()
  console.log(x)
}

export foo


var y = 2
function foo2() {
  console.log(y)
}
export foo2
```

形成一个执行上下文栈。
当函数调用进入一个函数时，入栈
函数返回的时候，则会出栈

* code evaluation state {async/awwait}
* function
* script or module
* generator
* Realm
* LexicalEnvironment 词法环境，
* VariableEnviironment 变量环境

## Realm
在js当中，函数表达式和对象直接量： {}, [], cllass也会创建对象，但是无法使用instanceOf。

使用隐式转换的时候也会创建对象，如 1 .toString()

这些对象也是具有原型，没有Realm就无法知道他们的原型