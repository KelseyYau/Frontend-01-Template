# 第二周学习总结

## 编程语言通识

本周前端课程1，winter大神着重介绍了描述一门编程语言的语言，比如巴科思范式(BNF Backus-Naur Form)。一开始听到这个名词的时候，我是一脸懵的状态，但是跟着练习逐渐才开始有了眉目。

### BNF的基本法则

* ::=表示定义；
* “ ”双引号里的内容表示字符；
* <>尖括号里的内容表示必选内容；
* | 竖线两边的是可选内容，相当于or；

通过这四条法则，进行对编程语言的描述过程：

```js
// 一个字符
"a" "b"

// 表示一个程序
<Program> = "a"

// 表示数字

<Number> = "0" | "1" | "2" | ...... | "9"

<DecimalNumber> = "0" | (("1" | "2" |......| ""9) <Number> *)

// 最终结合递推推演出四则运算

<PrimaryExpression> = <DecimalNumber> | 
    "(" <LogicalExpression> ")"

<MultiplicativeExpression> = <DecimalNumber> | 
    <MultiplicativeExpression> "*" <DecimalNumber> | 
    <MultiplicativeExpression> "/" <DecimalNumber>

<AdditiveExpression> = <MultiplicativeExpression> | 
    <AdditiveExpression> "+" <MultiplicativeExpression> | 
    <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> | 
    <LogicalExpression> "||" <AdditiveExpression>
    <LogicalExpression> "&&" <AdditiveExpression>

```

### 形式语言
* 0型: 无限制文法，等号左边不止一个 <a><b> ::= "c"
* 1型: 上下文相关文法，"a"<b>"c"::="a""x""c"
* 2型: 上下文无关文法，
* 3型: 正则文法，

其中，C++ 连0型也算不上，JavaScript则是大部分是2型，以及3型，1型涉及很少

### 图灵完备性

说实在，我是第一次听到这个名词，然后去wiki了一下。嗯。。。。还是看不懂，太抽象了

* 图灵机，goto 和 if while
* lambda，递归和分治

那如何判断语言是是否是图灵完备，主要是有没递归和循环

### 类型系统

对于实际开发中来说，我们希望静态更好，更稳定。动态则意味着可能有更多的问题，类型不安全。

* 动态类型系统和静态类型系统
* 强类型和弱类型
* 复合类型，结构体，函数签名
* 子类型，

协变:能用Array<Parent>的地方，都能用Array<Child>
逆变:能用Function<Child>的地方，都能用Function<Parent>

  C++ TypeScript是静态弱类型（有隐式转换）, JavaScript则是动态弱类型

## JavaScript词法，类型

winter第二周第二课，又是开始蒙蔽的一课，哈哈

### Unicode
一开始介绍了unicode的字符集，包括常用的Ascii码的字符集，中日韩字符(cjk)等。

虽然在JavaScript中是可以使用中文来命名一个变量，但是编写代码则应该使用常用的字符集去命名变量。

### InputElement

#### whiteSpace的几种
* Tab制表符,\t
* VT纵向制表符
* FF: FormFeed
* sp: space
* npsp: no-break space 与sp还是有区别，在于不会断开，不会合并

#### LineTerminator换行符
* LR: Line Feed \n
* CR: Carriage Return \r

出现两种换行符，也是历史原因，老式打字机

#### Comment 注释 注释内嵌的问题

#### Token
* Punctuator，表示常用的符号 { } + 这些
* KeyWords，一些关键词，不能用来做变量，如 if while
* IdentifierName，标识符
* Literal 直接量
    * Number，主要是二进制(0b)，八进制(0o)，十六进制(0x)
    * String
    * Boolean
    * Null
    * Undefined

