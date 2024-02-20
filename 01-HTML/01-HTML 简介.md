# 01-HTML 简介

> 介绍 HTML 的一些重要概念.

---

## 语义化

**HTML** 是 *HyperText Markup Language* 的缩写. HTML 决定了网页的结构 (structure). HTML 使用一系列语义化 (semantic) 的元素 (element) 来描述网页的结构.

为了增强 HTML 的可读性与更好的 SEO (搜索引擎优化), 现在推崇标签的语义化. 例如 `<header>`, `<footer>`, `<article>` 等. 这些标签, 一看就知道用来标记网页的 "头部", "尾部" 以及主体文章部分.

---

## HTML 元素剖析

这是一个段落 (paragraph) 元素:

```html
<p class="editor-note">My cat is very grumpy</p>
```

其主要部分有:

- **开始标签 (opening tag)**: `<p>` 表示 paragraph, 是一个开始标签, 标志元素的开始.
- **属性 (attribute)**: 有许多可选属性来为元素添加额外信息. `class` 属性经常用于定位一系列有共同特征的元素.
- **内容 (content)**: 内容放在开始标签和结束标签之间.
- **结束标签 (closing tag)**: `</p>` 是一个结束标签, 标志元素的结束.

---

## 空元素

不是所有元素都拥有开始标签, 内容和结束标签. 一些元素只有一个标签, 通常用来插入/嵌入一些东西。这些元素被称为空元素 (void element).

例如, `<img>` 元素用于插入一张图片:

 ```html
<img
    src="https://raw.githubusercontent.com/mdn/beginner-html-site/gh-pages/images/firefox-icon.png"
    alt="Firefox icon">
 ```

---

## 布尔属性

一些属性没有值, 被称为布尔属性 (boolean attribute). 布尔属性的出现暗示着对应的属性值为 `true`.

例如, `disabled` 就是一个布尔属性:

```html
<input type="text" disabled>
```

这样, 这个表单输入元素就被禁用了. 于是用户无法输入.

---

## 实体引用：在 HTML 中包含特殊字符

在 HTML 中, 字符 `<`, `>`, `"`, `'`, 和 `&` 是特殊的. 他们是 HTML 语法的一部分. 如果我们想在文本中使用这些特殊字符, 而不被浏览器视为代码, 我们需要使用字符实体引用 (character entity reference).

字符引用以 `&` 开始, 以 `;` 结束:

| Literal character | Character reference |  Meaning   |
| :---------------: | :-----------------: | :--------: |
|         <         |       `&lt;`        | less than  |
|         >         |       `&gt;`        | great than |
|         "         |      `&quot;`       |   quote    |
|         '         |      `&apos;`       | apostrophe |
|         &         |       `&amp;`       | ampersand  |

> ⚠️ 除了以上 5 个字符, 你不需要使用任何其他字符实体引用. 只要把 HTML 的字符编码设为 `UTF-8`, 现代浏览器就能很好地处理其他特殊字符.

---

?> {docsify-updated}