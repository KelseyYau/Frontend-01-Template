# 浏览器工作原理

## 总论与HTTP协议

### 当在地址栏输入URL发生的事情

1. DNS 域名解析
2. 使用HTTP或者HTTPS协议，请求页面
3. 请求回来的HTML代码，解析DOM Tree
4. 计算DOM Tree上的CSS属性
5. 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图
6. 可选步骤是是对位图进行合成，这会极大地增加后续绘制的速度
7. 合成之后，再绘制到界面中

### 7层网络模型
* 物理层
* 数据链路
* 网络层
* 传输层
* 会话
* 表示
* 应用

### 简化
* HTTP 上三层            在node中，require("http")
* TCP                   在node中，require("net")
* Internet
* 4G\5G\WIFI

### TCP 与 IP
#### TCP
* TCP是流式传输
* 标识TCP用端口
* node 使用 require("net")

#### IP
* IP，包
* 标识用IP地址
* C++ 库 libnet/libpcap

### HTTP

一问一答

* Request 请求模型
* Response 响应模型