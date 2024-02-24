# 19-网格 (grid)

> 理解网格 (grid) 布局的基本概念, 以及如何用 CSS grid 来实现它.

---

## 什么是网格布局?

网格通常会有列 (column), 行 (row), 以及每行每列间的间隙. 这些间隙通常被称为槽 (gutter).

![](../_assets/_images/grid.png ':size=800')

---

## 在 CSS 中创建网格

### 定义网格

通过设置 `display: grid;` 来定义网格布局. 和弹性盒子 (flexbox) 类似, `display: grid;` 会把容器的所有直接子元素变为 grid 项.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OJqeQmG" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/OJqeQmG">
  简单的 grid 布局</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

声明 `display: grid;` 默认会创建一个单列网格. 为了看到更像网格的效果, 我们通过声明 `grid-template-columns: 200px 200px 200px;` 来设置网格为 3 个 200px 的列.

### 使用单位 fr 定义灵活的网格

单位 `fr` 是 fraction 的缩写, 表示 grid 容器里**可用空间**的一份.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNmqMEN" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/WNmqMEN">
  简单的 grid 布局</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

现在轨道被等分为 3 列. 还可以指定不同的正值, 例如 `grid-template-columns: 2fr 1fr 1fr;`.

可以混用 `fr` 单位和其他固定长度单位. 在这种情况下, 固定长度的轨道的空间先被分配, 剩下的空间再按比例分配.

> ⚠️ 单位 `fr` 分配的是**可用空间**, 而不是全部空间. 因此, 如果轨道内有尺寸比较大的元素, 那么可供分享的可用空间就会减少.

### 轨道间隙

要创建轨道间的间隙, 可用以下属性:

- `column-gap`: 指定列间空隙.
- `row-gap`: 指定行间空隙.
- `gap`: 同时指定列间和行间空隙.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="QWoXQqb" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/QWoXQqb">
  简单的 grid 布局</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> ⚠️ 间隙属性的值可以是长度或百分比, 但不能用单位 `fr`.

### 重复轨道列表

可以用 `repeat()` 函数来重复部分或全部轨道 (track).

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="rNREJYy" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/rNREJYy">
  grid 重复轨道列表</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

这样会像之前那样得到 3 个 `1fr` 轨道. 传入 `repeat()` 函数的第一个值指定重复次数; 第二个值是一个**轨道列表**, 可以是一个或多个想重复的轨道.

### 显式网格和隐式网格

到目前为止, 我们只指定了列, 但行会自动创建以容纳内容.

- **显式网格 (explicit grid)** 通过属性 `grid-template-columns` 或 `grid-template-rows` 创建.
- **隐式网格 (implicit grid)** 会扩展已定义的显式网格, 当内容超出已有网格时.

默认情况下, 隐式网格的轨道的尺寸是 `auto`, 其大小会根据内容调整. 如果想指定隐式网格的轨道的尺寸, 可以用属性 `grid-auto-rows` 或 `grid-auto-columns`.

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="gOENvdN" data-editable="true" data-user="luckyzhz" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/gOENvdN">
  grid-auto-rows</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

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

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="poYXaqN" data-editable="true" data-user="luckyzhz" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/poYXaqN">
  grid 自动适应尽可能多的列</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

## 基于线的布局

网格总是有线的. 这些线**从 1 开始编号**, 且和文档的书写模式 (writing mode) 相关.

要用这些线来定位项目, 需要指定项目所在网格区域的起止线. 有四个相关属性:

- `grid-column-start`
- `grid-column-end`
- `grid-row-start`
- `grid-row-end`

这些属性接受线的编号作为其值.

作为替代, 也可以使用简写属性来同时指定起止线, 用斜杠 `/` 分隔:

- `grid-column` 对应 `grid-column-start` 和 `grid-column-end`.
- `grid-row` 对应 `grid-row-start` 和 `grid-row-end`.

<p class="codepen" data-height="450" data-default-tab="html,result" data-slug-hash="rNREJEY" data-editable="true" data-user="luckyzhz" style="height: 450px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/rNREJEY">
  grid 基于线的布局</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> ⚠️ 可以用 `-1` 定位最后一根线, `-2` 定位倒数第二根线, 依此类推. 注意, 线的计数从**显式网格**的边缘开始, 而不是隐式网格.

---

## 用 grid-template-areas 放置元素

另一种往网格里放置元素的方法是用属性 `grid-template-areas`, 同时要用属性 `grid-area` 给不同的元素赋予相应的名称.

<p class="codepen" data-height="510" data-default-tab="html,result" data-slug-hash="abMgYzj" data-editable="true" data-user="luckyzhz" style="height: 510px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/abMgYzj">
  grid-template-areas</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

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