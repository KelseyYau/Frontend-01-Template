# CSS - 2

## 选择器语法
### 简单选择器
* * 所有元素,主要是为了选择全部
* div svg|a(namespace下的标签) 标签选择器
* class 类选择器，空格分割多个
* id 选择器
* [attr=value] 属性选择器，如果以~ 则表示匹配的都选中
* :hover 伪类
* ::before 伪元素

### 复合选择器
* <简单选择器><简单选择器><简单选择器> 同时match这几个选择器，是and关系
* *或者div必须写在前面
### 复杂选择器
<复合选择器><sp><复合选择器> 子孙选择器，
<复合选择器>">"<复合选择器> 子选择器
<复合选择器>"~"<复合选择器> 邻居选择器
<复合选择器>"+"<复合选择器> 兄弟选择器
<复合选择器>"||"<复合选择器>  css level4 一般不用，用于table选择列

### 选择器优先级
#### 简单选择器计数

#id div.a#id { }

 1         2

[0, 2, 1, 1]   S = 0 * N^3 + 2 * N^2 + 1 * N^1 + 1

##### 优先级测试
* div#a.b .c[id=x] [0, 1, 3, 1]
* #a:not(#b) [0, 2, 0, 0]  伪类不参与运算
* *.a [0, 0, 1, 0]
* div.a [0, 0, 1, 1]

全局选择器：*
选择连接符：+,>,-, ,||
伪类反向选择器：:not()
以上，对权重的计算没影响，即不参与计算。

### 伪类
#### 链接
* :any-link
* :link :visited
* :hover
* :active
* :focus
* :target

#### 树结构
* :empty
* :nth-child()
* :nth-last-child()
* :first-child :last-child :only-child

#### 逻辑型
* :not伪类
* :where :has

### 伪元素
常见4种伪元素
* ::before
* ::after
* ::first-letter 有可用属性限制
* ::first-line  浏览器实际显示的第一行有关，有可用属性限制

思考:

first-letter多了float,vertical-align,盒模型系列



