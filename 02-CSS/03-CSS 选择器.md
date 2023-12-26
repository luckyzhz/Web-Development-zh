# 03-CSS 选择器

> 详细学习 CSS 选择器 (selector) 的工作方式.

---

## 选择器列表

如果有多个选择器需要应用相同的 CSS, 那么这些选择器可以合为一个 "选择器列表". 这样, 这些 CSS 就会被应用到每个选择器了.

在选择器列表中, 使用逗号 (`,`) 分隔每一个选择器:

```css
h1,
.special {
    color: blue;
}
```

> ❗ 如果选择器列表中的任何一个选择器在语法上无效, 那么整个规则都会被忽略.

---

## Type, class, 和 ID 选择器

### Type 选择器

type 选择器有时也叫标签 (tag) 选择器或元素 (element) 选择器. 例如:

```css
span {
    background-color: yellow;
}

strong {
    color: rebeccapurple;
}

em {
    color: rebeccapurple;
}
```

### Class 选择器

class 选择器以英文句号 (`.`) 开头. 他会选择文档中应用了该 class 的所有元素.

```css
.highlight {
    background-color: yellow;
}
```

#### 选择有特定 class 的特定元素

通过直接在 type 选择器后附加 class 选择器, 可以选择有特定 class 的特定元素 (两个选择器直接相连, 相当于取**交集**).

```css
span.highlight {
    background-color: yellow;
}

h1.highlight {
    background-color: pink;
}
```

#### 选择具有多个特定 class 的元素

通过直接串联多个 class 选择器, 可以选择具有多个特定 class 的元素.

```css
/* 选中同时具有 notebox 和 warning 这两个 class 的元素 */
.notebox.warning {
    border-color: orange;
    font-weight: bold;
}

/* 选中同时具有 notebox 和 danger 这两个 class 的元素 */
.notebox.danger {
    border-color: red;
    font-weight: bold;
}
```

### ID 选择器

ID 选择器以井号 (`#`) 开头. 注意, 每个元素最多只有 1 个 ID, 且各个 ID 互不相同 (作为对比, class 可以是相同的).

```css
#one {
    background-color: yellow;
}

h1#heading {
    color: rebeccapurple;
}
```

---

## 属性选择器

### 存在和值选择器

这些选择器可以根据属性的存在 (例如 `href`) 或根据与属性值的各种不同匹配来选择元素.

| 选择器           | 例子                            | 描述                                                                                                       |
| :--------------- | :------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| `[attr]`         | `a[title]`                      | 匹配带有 *attr* 属性 (其名称是方括号中的值) 的元素.                                                        |
| `[attr=value]`   | `a[href="https://example.com"]` | 匹配具有 *attr* 属性的元素, 且该属性的值正好是 *value* (引号内的字符串).                                   |
| `[attr~=value]`  | `p[class~="special"]`           | 匹配具有 *attr* 属性的元素, 且该属性的值正好是 *value*, 或者 *value* 在该属性值列表 (以空格分隔) 里.       |
| `[attr\|=value]` | `div[lang\|="zh"]`              | 匹配具有 *attr* 属性的元素, 且该属性的值正好是 *value*, 或者该属性值以 *value* 开始, 其后紧跟连字符 (`-`). |

### 子串 (substring) 匹配选择器

这些选择器允许对属性值的子串进行更高级的匹配.

| 选择器          | 例子                | 描述                                                   |
| :-------------- | :------------------ | :----------------------------------------------------- |
| `[attr^=value]` | `li[class^="box-"]` | 匹配具有 *attr* 属性的元素, 且该属性值以 *value* 开始. |
| `[attr$=value]` | `li[class$="-box"]` | 匹配具有 *attr* 属性的元素, 且该属性值以 *value* 结束. |
| `[attr*=value]` | `li[class*="box"]`  | 匹配具有 *attr* 属性的元素, 且该属性值含有 *value*.    |

> ⚠️ 如果想以大小写**不**敏感的方式匹配属性值, 可以使用 `i` (表示 ignore) 标志. 例如 `li[class^="a" i]`.

---

## 伪类 (pseudo-class) 和伪元素 (pseudo-element)

### 什么是伪类?

伪类用于选择处于 "特定状态" 的元素. 例如, 是第一个子元素, 或者正被鼠标悬停. 伪类可以减少多余的 class 标记, 使代码更灵活和易于维护.

伪类以冒号开头 (`:`). 下面是一些常用的伪类:

- `:first-child`
- `:last-child`
- `:only-child`
- `:invalid`
- `:hover`
- `:focus`
- `:link`
- `:visited`

> ⚠️ 更多伪类可参考 <https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes>.

### 什么是伪元素?

伪元素的作用是让你好像在 HTML 文档中添加了一个全新的元素, 而不是在现有元素上应用一个类.

伪元素以双冒号 (`::`) 开头. 下面是一些常用的伪元素:

- `::first-line`
- `::before `
- `::after`

> ⚠️ 更多伪元素可参考 <https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements>.

---

## 选择器连接符 (combinator)

### 后代连接符

用空格 (` `) 连接两个选择器, 就形成了后代 (descendant) 选择器. 第二个选择器匹配的元素会被选中, 如果他有和第一个选择器匹配的祖先 (父亲, 父亲的父亲, 等等).

下例中, 会选中 `.box` 内部的 `<p>` 元素:

```css
.box p {
    color: red;
}
```

### 子连接符

用大于号 (`>`) 连接两个选择器, 就形成了子 (child) 选择器. 第二个选择器匹配的元素会被选中, 如果他有和第一个选择器匹配的父亲.

```css
article>p {
    color: red;
}
```

### 紧邻兄弟连接符

用加号 (`+`) 连接两个选择器, 就形成了紧邻兄弟 (next sibling) 选择器. 第二个选择器匹配的元素会被选中, 如果他紧邻的正前面一个兄弟匹配第一个选择器.

```css
h1+p {
    background-color: #333;
    color: #fff;
}
```

### 后续兄弟连接符

用波浪号 (`~`) 连接两个选择器, 就形成了后续兄弟 (subsequent sibling) 选择器. 第二个选择器匹配的元素会被选中, 如果他前面的兄弟 (不要求紧邻) 中有一个匹配第一个选择器.

```css
h1~p {
    background-color: #333;
    color: #fff;
}
```

### 选择器的组合

可以用上述的连接符来组合任意选择器. 例如:

```css
ul>li[class="a"] {
    color: red;
}
```

---

## 嵌套选择器

可以用嵌套形成复杂的选择器.

```css
/* 嵌套写法 */
p {
    ~img {}
}

/* 上面的嵌套写法会被浏览器解析为: */
p~img {}
```

```css
/* 嵌套写法 */
parent {
    /* 这里写父元素的样式 */
    & child {
        /* 这里写子元素的样式 */
    }
}

/* 上例会被浏览器解析为: */
parent {
    /* 父元素的样式 */
}

parent child {
    /* 子元素的样式 */
}
```

> ❗ 选择器的嵌套是一个较新的 CSS 特性, 目前还没有被广泛支持.

---

## 通配选择器

通配 (universal) 选择器用星号 (`*`) 表示, 会选择文档的所有内容.

```css
* {
    margin: 0;
}
```

通用选择器的一个用途是使选择器更容易阅读.

例如, 如果我们想选择 `<article>` 元素的后代元素, 且这些后代元素是其父元素的第一个孩子, 我们可以使用 `:first-child` 伪类 (pseudo-class).

```css
/* 不使用通配选择器的写法 */
article :first-child {
    font-weight: bold;
}
```

然而, 这种写法在视觉上可能会和这个选择器 `article:first-child` 混淆. 这个选择器选择的是`<article>` 元素, 且是其父元素的第一个孩子.

为了避免这种混淆, 我们可以添加通配选择器到 `:first-child` 伪类:

```css
/* 使用通配选择器的写法 */
article *:first-child {
    font-weight: bold;
}
```



---

?> {docsify-updated}