# 重学HTML

## HTML定义: XML 与 SGML

## HTML标签--语义

## HMTL语法
### 合法元素
* ELement: <tagname>...</tagname>
* Text: text
* Comment: <!-- comments -->
* DocumentType: <!Doctype html>
* ProcessingInstruction: <? a 1?>
* CDATA:<![CDATA[]]>

### 字符引用
* &#161;
* &amp;
* &gt;
* &lt;
* &quot;

# 重学DOM

## 导航类操作
* parentNode
* childNodes 
修改操作会动态变化childnodes
* firstChild
* lastChild
* nextSibling
* previousSibling

## 修改类操作
* appendChild 把元素追加到一个地方，如果是已有元素，实际上是将该元素移动过去了要追加的元素里
* insertBefore
* removeChild
* replaceChild

appendChild 与 insertBefore 刚好形成一个完备性

## 高级操作
* compareDocumentPosition 是一个用于比较两个节点的中关系的函数
* contains 检查一个节点是否包含另外一个节点
* isEqualNode 检查两个节点是否完全相同
* isSameNode 检查两个节点是否是同一个节点，js 可以用"==="
* cloneNode 复制一个节点，true可深拷贝

## Range API
```js
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
var range = document.getSelection().getRangeAt(0)
```

## CSSOM
批量操作style,操作伪元素

### Rules
* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p{color:pink}", 0)
* document.styleSheets[0].removeRule(0)

#### Rule
* CSSStyleRule
  * selectorText
  * style 键值对形式
* CSS

#### getComputedStyle
window.getComputedStyle(elt, pseudoElt)
* elt 想要取的元素
* pseudoElt 伪元素

