# 19-网格 (grid)

> 理解网格 (grid) 布局的基本概念, 以及如何用 CSS grid 来实现它.

---

## 什么是网格布局?

网格通常会有列 (column), 行 (row), 以及每行每列间的间隙. 这些间隙通常被称为槽 (gutter).

![](../_assets/_images/grid.png ':size=800')

以下是用来演示网格布局的 html 代码:

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
        border-radius: 4px;
        background-color: aqua;
        line-height: 2;
    }
</style>

<section class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
    <div class="item">8</div>
</section>
```

---

## 在 CSS 中创建网格

### 定义网格

通过设置 `display: grid;` 来定义网格布局. 和弹性盒子 (flexbox) 类似, `display: grid;` 会把容器的所有直接子元素变为 grid 项.

```css
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px;
}
```

声明 `display: grid;` 会创建一个单列网格. 为了看到更像网格的效果, 我们通过声明 `grid-template-columns: 200px 200px 200px;` 来设置网格为 3 个 200px 的列.

### 使用单位 fr 定义灵活的网格

单位 `fr` 是 fraction 的缩写, 表示 grid 容器里**可用空间**的一份.

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
```

现在轨道被等分为 3 列. 还可以指定不同的正值, 例如 `grid-template-columns: 2fr 1fr 1fr;`.

可以混用 `fr` 单位和其他固定长度单位. 在这种情况下, 固定长度的轨道的空间先被分配, 剩下的空间再按比例分配.

> ⚠️ 单位 `fr` 分配的是**可用空间**, 而不是全部空间. 因此, 如果轨道内有尺寸比较大的元素, 那么可供分享的可用空间就会减少.

### 轨道间隙

要创建轨道间的间隙, 可用以下属性:

- `column-gap`: 指定列间空隙.
- `row-gap`: 指定行间空隙.
- `gap`: 同时指定列间和行间空隙.

```css
.container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 10px;
}
```

间隙属性的值可以是长度或百分比, 但不能用单位 `fr`.

### 重复轨道列表

可以用 `repeat()` 函数来重复部分或全部轨道 (track).

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
```

这样会像之前那样得到 3 个 `1fr` 轨道. 传入 `repeat()` 函数的第一个值指定重复次数; 第二个值是一个**轨道列表**, 可以是一个或多个想重复的轨道.

### 显式网格和隐式网格

到目前为止, 我们只指定了列, 但行会自动创建以容纳内容.

- **显式网格 (explicit grid)** 通过属性 `grid-template-columns` 或 `grid-template-rows` 创建.
- **隐式网格 (implicit grid)** 会扩展已定义的显式网格, 当内容超出已有网格时.

默认情况下, 隐式网格的轨道的尺寸是 `auto`, 其大小会根据内容调整. 如果想指定隐式网格的轨道的尺寸, 可以用属性 `grid-auto-rows` 和 `grid-auto-columns`.

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
    gap: 10px;
}
```

### minmax() 函数

有时我们可能想让轨道至少有 100 像素高, 但当有更多内容加入时, 轨道高度可以自动扩展.

函数 `minmax()` 让我们可以设置轨道的最小值和最大值. 例如, `minmax(100px, auto)`.

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 10px;
}
```

### 自动适应尽可能多的列

有时我们可能想在 grid 容器里创建尽可能多的列. 这可以通过设置 `grid-template-columns: repeat(auto-fit, 轨道列表);` 实现.  `auto-fit` 表示尽可能重复更多的轨道列表.

```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    gap: 10px;
}
```

---

## 基于线的布局

网格总是有线的. 这些线从 1 开始编号, 且和文档的书写模式 (writing mode) 相关.

要用这些线来定位项目, 需要指定项目所在网格区域的起止线. 有四个相关属性:

- `grid-column-start`
- `grid-column-end`
- `grid-row-start`
- `grid-row-end`

这些属性接受线的编号作为其值.

作为替代, 也可以使用简写属性来同时指定起止线, 用斜杠 `/` 分隔:

- `grid-column` 对应 `grid-column-start` 和 `grid-column-end`.
- `grid-row` 对应 `grid-row-start` 和 `grid-row-end`.

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(50px, auto);
    gap: 10px;
}

.item:nth-child(1) {
    /* 用 `-1` 表示最后一条线 */
    grid-column: 1 / -1;
    /* 如果只给一个值, 就表示跨度为 1. 这里就相当于 `grid-row: 1 / 2;` */
    grid-row: 1;
}

.item:nth-child(2) {
    grid-column: 2 / 4;
    grid-row: 2 / 4;
}

.item:nth-child(5) {
    grid-column: 1;
    grid-row: 2 / 4;
}

.item:nth-child(7) {
    grid-column: 1 / -1;
    /* 相当于 `grid-row: 6 / 7;` */
    grid-row: 6;
}
```

> ⚠️ 可以用 `-1` 定位最后一根线, `-2` 定位倒数第二根线, 依此类推. 注意, 线的计数从**显式网格**的边缘开始, 而不是隐式网格.

---

## 用 grid-template-areas 放置元素

另一种往网格里放置元素的方法是用属性 `grid-template-areas`, 同时要用属性 `grid-area` 给不同的元素赋予相应的名称.

```css
.container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-auto-rows: minmax(50px, auto);
    gap: 10px;

    grid-template-areas:
        "header header"
        "navigation navigation"
        "sidebar content1"
        "sidebar content2"
        "sidebar content3"
        "sidebar content4"
        "footer footer";
}

.item:nth-child(1) {
    grid-area: header;
}

.item:nth-child(2) {
    grid-area: navigation;
}

.item:nth-child(3) {
    grid-area: sidebar;
}

.item:nth-child(n+4):nth-child(-n+7) {
    background-color: darksalmon;
    opacity: 0.5;
}

.item:nth-child(4) {
    grid-area: content1;
}

.item:nth-child(5) {
    grid-area: content2;
}

.item:nth-child(6) {
    grid-area: content3;
}

.item:nth-child(7) {
    grid-area: content4;
}

.item:nth-child(8) {
    grid-area: footer;
}
```

属性 `grid-template-areas` 的使用规则如下:

- 网格的每个格子都需要填充.
- 要跨越多格, 就重复放置 `grid-area` 定义的名称.
- 要留空某个单元格, 就用英文句号 `.` 填充.
- 一个名称占据的区域必须是矩形, 而不能是其他形状, 例如 L 形.
- 一个名称占据的区域必须连续, 不能分散到不同位置.

---

## 嵌套网格

将 grid 项设置为 grid 容器是完全可以的, 其子元素也会应用网格布局.



---

?> {docsify-updated}