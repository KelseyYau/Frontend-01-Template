# 浏览器原理-排版
## flex布局


## 盒模型
box-sizing:

* content-box
* border-box

## 正常流
* 收集盒进行
* 计算盒在行中的排布
* 计算行的排布

## IFC

## BFC

## 正常流的行模型

···html
<div style="font-size:50px;line-height:100px;background-color:pink;">
    <div style="vertical-align:text-bottom;overflow:visible;display:inline-block;width:1px;height:1px;">
        <div style="width:1000px;;height:1px;background:red;"></div>
    </div>
    <div style="vertical-align:text-top;overflow:visible;display:inline-block;width:1px;height:1px;">
        <div style="width:1000px;;height:1px;background:red;"></div>
    </div>
    <span>Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello </span>
    <div style="vertical-align:text-bottom;line-height:70px;width:100px;height:150px;background-color:aqua;display:inline-block">1</div>
    <div style="vertical-align:top;line-height:70px;width:100px;height:50px;background-color:aqua;display:inline-block">1</div>
    <div style="vertical-align:base-line;line-height:70px;width:100px;height:550px;background-color:plum;display:inline-block">1</div>
</div>
···

block-level 表示可以被放入bfc
block-container 表示可以容纳bfc
block-box = block-level + block-container
block-box 如果 overflow 是 visible， 那么就跟父bfc合并