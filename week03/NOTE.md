#

## Atom
### Grammar
* 树结构

### Expressions

#### Member（成员访问）同级运算
* a.b
* a[b]
* foo`string` 
* super.b
* super['b]
* new Foo() 与 new Foo，带括号的优先级更高

##### Refercne
member返回的是一个reference

var o  = {x: 1}

由Object 和 key组成

加法将reference去掉了

#### New
new Foo

#### Call 
* foo()
* super()
* foo()['b'] 优先级变低
* foo().b

#### Left Handside & Right Handside


#### 简单语句
* ExpressionStatement
a = 1 + 2;

* Empty Statement
* DebuggerStatement
* ThrowStatement
* ContinueStatement
* BreakStatement
* ReturnStatement

#### 组合语句
* BlockStatement 
{
  [[type]]: normal
  [[value]]: 
  [[target]]: 
}



#### 声明


### 运行
#### Completion Record
[[type]] normal, break, continue, return, or throw
[[value]] Types 
[[target]] label
#### Lexical Enviorment
