# 13-Web 字体

> 学习如何将 web 字体应用到网页.

---

## Web 字体

CSS 允许指定字体文件. 当网站被访问时, 相应的字体文件也会被一起下载. 这样, 网页使用的字体就不用局限于 web 安全字体.

```css
/* 用 @font-face 自定义字体 */
@font-face {
    font-family: "myFont";
    src: url("myFont.woff2");
}

html {
    font-family: "myFont", sans-serif;
}
```

---

## 在线字体服务

在线字体服务提供了许多字体, 且不用自己写 `@font-face` 代码, 只需插入其提供的代码.

最著名的免费在线字体服务有 [Google Fonts](https://fonts.google.com/).

---

## @font-face

```css
/* 定义字体 */
@font-face {
    font-family: "emphasize";
    src:
        url("emphasize.woff2") format("woff2"),
        url("emphasize.woff") format("woff"),
        url("emphasize.otf") format("opentype"),
        url("emphasize.ttf") format("truetype");
    font-weight: bold;
    font-style: italic;
}

/* 使用自定义字体 */
em {
    font-family: "emphasize", sans-serif;
    font-weight: bold;
    font-style: italic;
}
```

- `font-family`: 指定字体名称.
- `src`: 指定字体文件路径 (`url` 部分), 以及字体文件的格式 (`format` 部分).
- `font-weight`: 指定字体的粗细.
- `font-style`: 指定字体是否斜体.

> 更多字体文件格式可参考 <https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src#font_formats>



---

?> {docsify-updated}