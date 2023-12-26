# 01-CSS 简介

> CSS (Cascading Style Sheets) 用于调整网页样式和布局.

---

## CSS 语法

```css
h1 {
    color: red;
    font-size: 5em;
}
```

- CSS 规则以 **选择器 (selector)** 开始. 选择器用于选中想要添加样式的元素. 本例中, 我们选中了一级标题 (`h1`).
- 然后有一对大括号 (`{ }`) 包裹一系列样式声明.
- 在大括号里有一个或多个 **声明 (declaration)**. 声明由 **属性 (property)** 和 **值 (value)** 组成, 以分号 (`;`) 分隔.
- CSS 属性和值是大小写敏感的. 属性和值之间以冒号 (`:`) 分隔.

> ⚠️ CSS (以及其他 Web 标准) 使用**美式**英语作为标准写法. 例如, `colour` 应该写成 `color`.

---

## 应用 CSS 到 HTML

有 3 种方法可以应用 CSS 到 HTML 文档:

- 外部 (external) 样式表
- 内部 (internal) 样式表
- 行内 (inline) 样式

### 外部样式表

外部样式表在独立文件中包含 CSS, 文件扩展名为 `.css`. 这是将 CSS 引入 HTML 文档最常见, 最有用的方法. 你可以链接单个 CSS 文件到多个网页中, 为他们应用相同的 CSS 样式.

例如要应用 `styles.css` 到 `index.html`, 可以在 HTML 文档的头部 `<head>` 中添加:

```html
<link rel="stylesheet" href="styles.css">
```

### 内部样式表

内部样式表在 HTML 文档内部. 要创建内部样式表, 只需在 HTML 文档头部 `<head>` 里放置 `<style>` 元素, 然后在 `<style>` 里写 CSS 规则.

```html
<head>
    <style>
        h1 {
            color: blue;
            background-color: yellow;
            border: 1px solid black;
        }

        p {
            color: red;
        }
    </style>
</head>
```

### 行内样式

行内样式作用于单个 HTML 元素, 在元素的 `style` 属性里声明样式. 其语法和在大括号里写 CSS 是一致的.

```html
<h1 style="color: blue; background-color: yellow; border: 1px solid black;">
    Hello World!
</h1>
<p style="color: red;">这是我的第一个 CSS 样例</p>
```

---

## @rules

CSS [@rules](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule) 指导要应用什么 CSS 以及如何表现. 一些 @rules 很简单, 只有关键字和值. 例如, `@import` 导入一个样式表到另一个样式表中:

```css
@import "styles2.css";
```

一个常见的 @rule 是 `@media`, 作用是创建 [媒体查询 (media queries)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries). 媒体查询使用条件逻辑来应用 CSS 样式.

下例中, 样式表为 `<body>` 元素定义了默认的粉红色背景. 然而, 随后的媒体查询定义了当浏览器视口大于 `30em` 时的蓝色背景.

```css
body {
    background-color: pink;
}

@media (min-width: 30em) {
    body {
        background-color: blue;
    }
}
```



---

?> {docsify-updated}