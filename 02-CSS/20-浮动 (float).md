# 20-浮动 (float)

> 学习如何在网页上创建与清除浮动 (float).

---

## 浮动元素

CSS 属性 `float` 将一个元素放置在其容器的左侧或右侧, 允许文本或内联元素环绕他.

```css
.box {
    float: left;
    margin-right: 15px;
    width: 150px;
    height: 100px;
    border-radius: 5px;
    background-color: rgb(207, 232, 220);
}
```

`float` 属性的取值有:

- `none`
- `left`
- `right`
- `inline-start`
- `inline-end`

我们可以给浮动元素添加 margin 来推开周围的文字, 但我们不能通过给文字添加 margin 来使其远离浮动元素. 这是因为, 浮动元素脱离了正常的文档流, 其之后的元素实际在其后方. 如下图所示:

![](../_assets/_images/float.png ':size=600')

## 清除浮动

属性 `clear` 设置一个元素是否要被移动到他之前的浮动元素之下. `clear` 属性适用于浮动和非浮动元素.

```css
.cleared {
    clear: left;
}
```

如下图所示:

![](../_assets/_images/clear%20float.png ':size=600')

`clear` 属性的取值有:

- `none`
- `left`
- `right`
- `both`
- `inline-start`
- `inline-end`



---

?> {docsify-updated}