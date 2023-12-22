# 02-HTML 头部

> HTML 头部 (head) 含有文档的元数据 (metadata).

---

## HTML 文档剖析

这是一个比较典型的 HTML 文档结构示例:

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网页标签标题</title>
    <link rel="icon" href="./favicon.svg">
</head>

<body>
    <!-- body 部分读者可见 -->
</body>

</html>
```

1. `<!DOCTYPE html>`: 这是文档类型声明. 他告诉浏览器, 文档是用 HTML5 (HTML 的最新版本) 编写的.
2. `<html lang="zh"></html>`: 根元素 `<html>` 包裹页面上的所有内容. `lang="zh"` 表示文档内容主要是中文.
3. `<head></head>`: 元素 `<head>` 包含文档的元信息.
4. `<body></body>`: 元素 `<body>` 包含网页的可见内容.

---

## 头部 (head) 里的元数据 (metadata)

### 字符集 (charset)

`<meta charset="UTF-8">`: 这个 `<meta>` 元素指定文档的字符编码为 `UTF-8`. 这是一种广泛使用的字符编码, 支持不同语言的多种字符.

> ⚠️: 请始终使用 `UTF-8` 字符编码, 以获得最佳兼容性.

### 视口 (viewport)

`<meta name="viewport" content="width=device-width, initial-scale=1.0">`: 这个 `<meta>` 元素通常用于响应式 (responsive) 网页设计. 它将视口宽度设置为设备的宽度, 并将初始比例设置为 `1.0`. 这有助于确保网页在不同设备和屏幕尺寸上正常显示.

### 网页标签标题 (title)

`<title>网页标签标题</title>`: 这个 `<title>` 元素将网页标题设置为 "网页标签标题". 该元素内的文本通常会出现在浏览器的标签页 (tab) 中.

### 图标 (icon)

`<link rel="icon" href="./favicon.svg">`: 元素 `<link>` 可用于指定网页的图标 (icon). 属性 `href` 指向一个相对链接 `./favicon.svg`. 图标 (icon)通常出现在浏览器的标签页中.

### 作者和描述

许多 `<meta>` 元素包含属性 `name` 和 `content`:

- `name`: 指定元数据的类型, 说明该元素包含了什么信息.
- `content`: 指定元数据的实际内容.

例如, 我们可以指定作者并添加一些网站说明:

```html
<meta name="author" content="John">
<meta name="description" content="这是我的网站开发学习笔记">
```

---

?> {docsify-updated}