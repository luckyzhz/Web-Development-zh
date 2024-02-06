# 18-弹性盒子 (flexbox)

> 学习如何使用弹性盒子 (flexbox) 布局系统来创建网页布局.

---

## 一个简单的例子

这是用来说明 flexbox 的 HTML 代码:

```html
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .container {
        border: 1px red solid;
    }

    .item {
        border: 1px blue solid;
    }
</style>

<section class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3.1<br>3.2</div>
</section>
```

---

## 指定作为 flex 容器的元素

本例中, 我们想要布局 `<div>` 元素, 所以我们设置其**父元素**的 `display` 属性:

```css
.container {
    display: flex;
}
```

这会使得 `<section>` 元素成为一个 flex 容器 (container), 而其子元素成为 flex 项 (item).

如果元素被设置了 `display: flex;`, 那么他对外表现为块级元素. 如果想 flex 容器对外表现为行内元素, 可以设置为 `display: inline-flex;`.

---

## flex 模型

当元素作为 flex 项布局时, 他们沿着两个轴 (main axis, cross axis) 分布:

![](../_assets/_images/flex_terms.png ':size=500')

---

## 列还是行?

弹性盒子有个属性叫 `flex-direction`, 可以用来指定主轴 (main axis) 的方向.

```css
.container {
    display: flex;
    flex-direction: row;
}
```

属性 `flex-direction` 的取值有:

- `row`
- `row-reverse`
- `column`
- `column-reverse`

---

## 换行

当指定 flex 项的尺寸时, 如果 flex 项太多, 就有可能溢出 flex 容器. 可以设置 `flex-wrap` 属性来解决这个问题.

```css
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
```

属性 `flex-wrap` 设置 flex 项是强制在一行, 还是可以分布到多行. 属性 `flex-wrap` 应该在 flex 容器设置, 取值有:

- `nowrap`
- `wrap`
- `wrap-reverse`

> ⚠️ `flex-flow` 是简写属性, 对应属性 `flex-direction` 和 `flex-wrap`. 例如, `flex-flow: row wrap;`.

---

## flex 项的弹性尺寸

我们可以控制 flex 项相对于其他项占据的空间的比例:

```css
.item {
    flex: 1;
}

.item:nth-child(3) {
    flex: 2;
}
```

flex 容器的空间被四等分 (因为 1 + 1 + 2 = 4). 第一和第二个 flex 项各占一份, 第三个 flex 项占两份.

`flex` 的无单位比例值后面可以跟随一个基础尺寸 (如 `200px`):

```css
.item {
    flex: 1 200px;
}

.item:nth-child(3) {
    flex: 2 200px;
}
```

上面的 CSS 表示, 每个 flex 项会首先被给予 200px 的空间, **剩下的可用空间**按照比例值分配.

> ⚠️ `flex` 是简写属性, 对应属性 `flex-grow`, `flex-shrink` 和 `flex-basis`.

---

## 水平和垂直对齐

可以沿着主轴或交叉轴对齐 flex 项:

```css
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
```

属性 `justify-content` 控制 flex 项在主轴 (main axis) 上的对齐方式, 取值有:

- `flex-start`
- `flex-end`
- `center`
- `space-evenly`
- `space-around`
- `space-between`

属性 `align-items` 控制 flex 项在交叉轴 (cross axis) 上的对齐方式, 取值有:

- `stretch`
- `center`
- `flex-start`
- `flex-end`

可以为个别 flex 项设置 `align-self` 属性来覆写 flex 容器的 `align-items` 行为:

```css
.item:nth-child(1) {
    align-self: flex-end;
}
```

---

## flex 项排序

弹性盒子还可以改变 flex 项的布局顺序, 而不影响源码里的顺序.

```css
.item:nth-child(1) {
    order: 1;
}
```

你会看到, 第一个 `<div>` 元素已被移动到主轴的末端. 下面是更详细的解释:

- 默认情况下, 所有 flex 项的 `order` 属性的值是 `0`.
- `order` 属性值越大的 flex 项出现在布局的越后面.
- `order` 属性值相同的情况下, 按照源码的顺序布局.
- 可以为 `order` 设置负值以使个别 flex 项出现在其他项前面.

---

## 嵌套弹性盒子

将 flex 项设为 flex 容器是完全可以的. 这样 flex 项的子元素也会按照弹性盒子布局.



---

?> {docsify-updated}