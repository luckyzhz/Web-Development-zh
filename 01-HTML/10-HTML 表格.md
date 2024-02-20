# 10-HTML 表格

> 介绍 HTML 表格的常用特性. 表格是可以嵌套的.

---

## 最基本的表格

<p class="codepen" data-height="420" data-default-tab="html,result" data-slug-hash="rNGaWVK" data-editable="true" data-user="luckyzhz" style="height: 420px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/rNGaWVK">
  最基本的表格</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

- 用 `<table>` 标签包裹整个表格.
- 每一行 (row) 用 `<tr>` 标签定义.
- 没有列 (column) 标签, 列是隐含的. 例如我们在一行里放了三个数据, 那就隐含了有三列.
- 放数据的单元格有两种, `<th>` 和 `<td>`.
  - `<th>` 表示 table header, 即表头. 浏览器一般会渲染为加粗字体.
  - `<td>` 表示 table data, 即表格的一格数据.
- 还可以通过 CSS 为表格添加边框.

表头不一定要放在一行, 也可以放在一列里. 把每一行的第一个数据设为 `<th>`, 这样第一列就是表头了.

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="abLzpbz" data-editable="true" data-user="luckyzhz" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/abLzpbz">
  首列是表头的表格</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

## 数据跨越多格

通过 `<td>`, `<th>` 的属性 `colspan`, `rowspan` 来设置数据跨越多行或多列, 就像 excel 中的合并单元格.

为了突出数据跨越多格的效果, 下例设置了基本的 CSS 样式:

<!-- tabs:start -->

#### **跨越多列**

<p class="codepen" data-height="330" data-default-tab="html,result" data-slug-hash="OJxPWbv" data-editable="true" data-user="luckyzhz" style="height: 330px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/OJxPWbv">
  跨越多列的表格</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

#### **跨越多行**

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="xxXbgdV" data-editable="true" data-user="luckyzhz" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/xxXbgdV">
  跨越多行的表格</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

#### **跨越多列多行**

<p class="codepen" data-height="420" data-default-tab="html,result" data-slug-hash="MWEYJEN" data-editable="true" data-user="luckyzhz" style="height: 420px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/MWEYJEN">
  跨越多列和多行的表格</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<!-- tabs:end -->

---

## 为表格添加标题

用元素 `<caption>` 为表格指定标题, 紧接在 `<table>` 标签之下.

<p class="codepen" data-height="440" data-default-tab="html,result" data-slug-hash="LYzExpZ" data-editable="true" data-user="luckyzhz" style="height: 440px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/LYzExpZ">
  05-表格（table）_3</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

## 结构化表格

用元素 `<thead>`, `<tfoot>`, 和 `<tbody>` 标记表格的 header, footer, 和 body. 这些元素往往作为钩子, 以应用 CSS 到表格.

例如, 如果是一个长表格, 可以让表头和表脚在每个打印页面上重复显示, 也可以让表格主体在单页上显示, 并通过上下滚动来查看内容.

> ⚠️ 元素 `<tbody>` 总是包含在每个表格中. 如果你没有指定, 那他就是隐含的. 要检查这一点, 可以打开一个没有 `<tbody>` 的表格, 然后在浏览器开发者工具中查看其 HTML 代码. 你会看到, 浏览器自动为表格加上了 `<tbody>` 标签.

---

## 用 `<col>` 为表格列添加样式

元素 `<col>` 在容器 `<colgroup>` 里指定, 紧接在 `<table>` 标签之下.

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="poYBRmm" data-editable="true" data-user="luckyzhz" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/poYBRmm">
  用 &lt;col&gt; 为表格列添加样式</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



---

?> {docsify-updated}