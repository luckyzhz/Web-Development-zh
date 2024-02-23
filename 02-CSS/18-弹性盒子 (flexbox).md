# 18-弹性盒子 (flexbox)

> 学习如何使用弹性盒子 (flexbox) 布局系统来创建网页布局.

---

## flex 容器与 flex 项

把容器元素设为 `display: flex;` 或 `display: inline-flex;`, 则该容器会变为 flex 容器 (flex container), 其直接子元素 (即儿子) 会变为 flex 项 (flex item).

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KKXqNoq" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/KKXqNoq">
  最简单的 flexbox</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

## flex 模型

当元素作为 flex 项 (flex item) 布局时, 他们沿着主轴 (main axis) 和交叉轴 (cross axis) 分布:

![](../_assets/_images/flex_terms.png ':size=500')

设置主轴后, 则垂直方向自然成为交叉轴. 主轴由**容器**属性 `flex-direction` 定义, 取值有:

- `row` (默认值): 以行为主轴.
- `row-reverse`: 以行为主轴, 但从后往前放置 flex 项.
- `column`: 以列为主轴.
- `column-reverse`: 以列为主轴, 但从后往前放置 flex 项.

<p class="codepen" data-height="360" data-default-tab="html,result" data-slug-hash="OJqeLVq" data-editable="true" data-user="luckyzhz" style="height: 360px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/OJqeLVq">
  flexbox 主轴</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

## 自动换行

当指定 flex 项的尺寸时, 如果 flex 项太多, 就有可能溢出 flex 容器. 可以设置容器的 `flex-wrap` 属性来实现自动换行.

`flex-wrap` 设置 flex 项是强制在一行, 还是可以分布到多行, 取值有:

- `nowrap`
- `wrap`
- `wrap-reverse`

<p class="codepen" data-height="320" data-default-tab="html,result" data-slug-hash="ZEPdzjy" data-editable="true" data-user="luckyzhz" style="height: 320px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/ZEPdzjy">
  flex-wrap</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> ⚠️ 要把每一行看作一个新的 flex 容器. 空间分布 (收缩与伸展) 只考虑本行的 flex 项, 而不涉及其他行.

> ⚠️ `flex-flow` 是简写属性, 对应属性 `flex-direction` 和 `flex-wrap`. 例如, `flex-flow: row wrap;`.

---

## 水平和垂直对齐

### 水平对齐

属性 `justify-content` 控制 flex 项在主轴 (main axis) 上的对齐方式, 取值有:

- `flex-start`
- `flex-end`
- `center`
- `space-evenly`
- `space-around`
- `space-between`

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="gOENOrP" data-editable="true" data-user="luckyzhz" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/gOENOrP">
  Untitled</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> ⚠️ 当 flexbox 有多行时, 用属性 `align-content` 设置行的对齐方式, 取值有 `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly`, `stretch` 等.

### 垂直对齐

属性 `align-items` 控制 flex 项在交叉轴 (cross axis) 上的对齐方式, 取值有:

- `flex-start`
- `flex-end`
- `center`
- `stretch`

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="vYPqYZO" data-editable="true" data-user="luckyzhz" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/vYPqYZO">
  flexbox 交叉轴对齐</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> ⚠️ 可以为 flex 项设置 `align-self` 属性来覆写 flex 容器的 `align-items` 行为.

### 完美居中

利用 flexbox 的 `justify-content`, `align-items` 属性可以很容易实现完美居中.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyVzVXK" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/dyVzVXK">
  flexbox 完美居中</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

## flex 项的弹性尺寸

### flex-grow

flex 项的 `flex-grow` 属性控制 flexbox 剩余可用空间的分配, 默认值为 0.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRebReW" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/GRebReW">
  flex-grow</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### flex-basis

flex 项的 `flex-basis` 属性控制其在主轴方向上的基础 (初始) 尺寸 (如 `200px`)

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="rNREaNg" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/rNREaNg">
  flex-basis</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> ⚠️ flexbox 先分配完确定的空间 (如 `flex-basis` 指定的基础尺寸), 剩下的可用空间才按照 `flex-grow` 指定的比例分配给各 flex 项.

### flex-shrink

flex 项的 `flex-shrink` 属性控制其在主轴方向上的收缩比例. flex 项仅在默认宽度之和大于容器宽度时才会发生收缩.

- `flex-shrink` 初始值为 1, 取值可以是 0 或正小数, 不可以是负数.
- flex 项的 `flex-shrink` 值越大, 则在需要收缩时, 收缩的比例越大.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxBobgZ" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/xxBobgZ">
  flex-shrink</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### flex

`flex` 是简写属性, 对应属性 `flex-grow`, `flex-shrink`, `flex-basis`.

```css
/* 设置 flex-grow */
flex: 2;

/* 设置 flex-grow | flex-basis */
flex: 1 200px;

/* 设置 flex-grow | flex-shrink */
flex: 2 2;

/* 设置 flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```

> ⚠️ 可以用属性 `gap` 设置 flex 项的间隔.

---

## flex 项排序

可以设置 flex 项的 `order` 属性来改变其显示顺序.

- flex 项的 `order` 属性的默认值为 `0`.
- `order` 值越大的 flex 项出现在布局的越后面.
- `order` 值相同的情况下, 按照源码的顺序布局.
- 可以为 flex 项设置负值 `order` 以使其显示在其他项前面.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOJjOpz" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/jOJjOpz">
  flex 项的 order 属性</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

> ⚠️ 属性 `order` 仅影响元素的视觉顺序 (visual order), 不影响元素的逻辑或 tab 顺序.

---

## 嵌套 flexbox

将 flex 项设为 flex 容器是完全可以的. 这样 flex 项的子元素也会按照弹性盒子布局.



---

?> {docsify-updated}