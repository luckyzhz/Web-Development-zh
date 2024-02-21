# 20-浮动 (float)

> 学习如何在网页上创建与清除浮动 (float).

---

## 浮动元素

CSS 属性 `float` 将一个元素浮动到其**所在容器**的左侧或右侧.

- 浮动元素之前还是正常的文档流.
- 浮动元素会**脱离正常的文档流**, 后面的元素会递补上来.
- 浮动元素在 z 轴上高于其他普通元素.
- 后面递补上来的元素的 border 不会意识到有浮动元素存在.
- **行内元素**会尊重浮动元素的边界, 所以文本会围绕浮动元素.
- 通常得给浮动元素设置 `width`.
- 行内元素也可以浮动, 例如 `<img>`.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOGNzyN" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/jOGNzyN">
  08-浮动（float）_1</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

`float` 的取值有:

- `none`
- `left`
- `right`
- `inline-start`
- `inline-end`

---

## 多个浮动元素

一个元素浮动后, 会被移出正常文档流, 然后向左或者向右平移, 一直到所处容器的 content box, 或者碰到另一个浮动元素. 当多个浮动元素一行放不下时, 会换行继续放置.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwLbMEE" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/RwLbMEE">
  08-浮动（float）_2</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

## 清除浮动

如果希望某个元素不要被浮动元素重叠到, 可以设置其 `clear` 属性. 此时该元素会向下移动, 直至不被之前的浮动元素重叠到.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zYbQrEB" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/zYbQrEB">
  float</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

`clear` 的取值有:

- `none`
- `left`
- `right`
- `both`
- `inline-start`
- `inline-end`

---

## clear 技巧

如果一个容器里只有浮动元素, 那么该容器的高度会是 0, 因为没有正常文档流撑起高度. 如果想这个容器自适应包含其内部的所有浮动元素, 我们可以设置其 `::after` 伪元素的 `clear` 属性.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="oNGvdpO" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/oNGvdpO">
  利用 clear 撑起容器高度</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> ⚠️ `::after` 创建的伪元素是所选元素的**最后一个子元素**.



---

?> {docsify-updated}